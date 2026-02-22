"use client";

/// <reference types="@react-three/fiber" />

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import { EffectComposer, GodRays } from "@react-three/postprocessing";
import { BlendFunction, KernelSize } from "postprocessing";
import * as THREE from "three";

/**
 * ThreeScene
 *
 * Renders the full-screen atmospheric 3D background:
 *  • Exponential fog in the site's void colour absorbs everything at depth
 *  • A soft indigo "sun" in the top-right emits volumetric god-ray shafts
 *  • The rays are progressively swallowed by the fog as they travel left
 *  • A faceted icosahedron crystal floats in the centre, slowly rotating,
 *    its metallic surface catching and deflecting the incoming light
 */

// ── 1. Fog + background ───────────────────────────────────────────────────────

function SceneSetup() {
  const { scene } = useThree();

  useEffect(() => {
    scene.background = new THREE.Color(0x050508);
    scene.fog = new THREE.FogExp2(0x050508, 0.055);
    return () => {
      scene.fog = null;
    };
  }, [scene]);

  return null;
}

// ── 2. Floating crystal ───────────────────────────────────────────────────────

function FloatingCrystal() {
  const ref = useRef<THREE.Mesh>(null);
  const elapsed = useRef(0);

  useFrame((_, delta) => {
    if (!ref.current) return;
    elapsed.current += delta;

    // Slow rotation — Y is primary, X adds slight wobble
    ref.current.rotation.y += delta * 0.12;
    ref.current.rotation.x += delta * 0.04;

    // Gentle vertical drift (stays "in place" but alive)
    ref.current.position.y = Math.sin(elapsed.current * 0.35) * 0.22;
  });

  return (
    <mesh ref={ref} position={[0, 0, -1]}>
      {/* detail=1 → 80 faces; gives nice faceted crystal look */}
      <icosahedronGeometry args={[1.3, 1]} />
      <meshPhysicalMaterial
        color="#818cf8"
        metalness={0.85}
        roughness={0.08}
        emissive="#3730a3"
        emissiveIntensity={0.35}
      />
    </mesh>
  );
}

// ── 3. Sun mesh (god-ray source) ──────────────────────────────────────────────

interface SunMeshProps {
  onMount: (mesh: THREE.Mesh) => void;
}

function SunMesh({ onMount }: SunMeshProps) {
  return (
    <mesh
      // Callback ref — fires once with the real mesh instance
      ref={(m) => {
        if (m) onMount(m);
      }}
      // Top-right quadrant, pushed deep so it appears small & distant
      position={[14, 9, -15]}
    >
      <sphereGeometry args={[0.5, 8, 8]} />
      {/*
       * Must be meshBasicMaterial (unlit) and visible so the GodRays
       * effect has a rendered pixel cluster to expand from.
       */}
      <meshBasicMaterial color="#a5b4fc" />
    </mesh>
  );
}

// ── 4. Scene composition ──────────────────────────────────────────────────────

function Scene() {
  const [sun, setSun] = useState<THREE.Mesh | null>(null);

  return (
    <>
      <SceneSetup />

      {/* Very dim blue-black ambient — prevents total blackout in shadows */}
      <ambientLight intensity={0.04} color="#0d0a20" />

      {/*
       * Key light: positioned at the same world-side as the sun mesh.
       * This is what actually illuminates the crystal with indigo specular
       * highlights, reinforcing the "light coming from top-right" story.
       */}
      <pointLight
        position={[8, 6, -5]}
        intensity={4}
        color="#7c6fff"
        distance={30}
        decay={2}
      />

      {/* Cool cyan fill from bottom-left for depth and separation */}
      <pointLight
        position={[-5, -3, 3]}
        intensity={0.6}
        color="#06b6d4"
        distance={15}
        decay={2}
      />

      <SunMesh onMount={setSun} />
      <FloatingCrystal />

      {/*
       * EffectComposer only mounts after the sun mesh is ready so that
       * GodRays receives a live, positioned Mesh reference.
       */}
      {sun && (
        <EffectComposer>
          <GodRays
            sun={sun}
            blendFunction={BlendFunction.SCREEN}
            // More samples → smoother shafts, higher cost
            samples={60}
            // density + decay together control how far light travels
            // before the fog absorbs it
            density={0.97}
            decay={0.93}
            weight={0.28}
            exposure={0.55}
            clampMax={1}
            kernelSize={KernelSize.SMALL}
            blur
          />
        </EffectComposer>
      )}
    </>
  );
}

// ── 5. Canvas ─────────────────────────────────────────────────────────────────

export default function ThreeScene() {
  return (
    <Canvas
      style={{ width: "100%", height: "100%" }}
      // Pulled back enough to frame the crystal with space around it
      camera={{ position: [0, 0, 6], fov: 55 }}
      // Cap pixel ratio for performance on high-DPI screens
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      }}
    >
      <Scene />
    </Canvas>
  );
}
