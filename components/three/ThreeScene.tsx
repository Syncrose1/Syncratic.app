"use client";

/// <reference types="@react-three/fiber" />

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useState, useMemo } from "react";
import { EffectComposer, GodRays } from "@react-three/postprocessing";
import { BlendFunction, KernelSize } from "postprocessing";
import * as THREE from "three";

/**
 * ThreeScene
 *
 * Renders the full-screen atmospheric 3D background:
 *  • Exponential fog (density 0.08) fills the void colour, creating a thick haze
 *  • 400 tiny particles distributed at depth act as the visible fog medium —
 *    near particles are bright, far ones fade into the darkness
 *  • A small indigo-white sun in the top-right emits volumetric god-ray shafts
 *    that stream diagonally across the scene and are absorbed by the fog
 *  • A faceted icosahedron crystal floats in centre, slowly rotating,
 *    its metallic surface catching and deflecting the incoming light
 */

// ── 1. Fog + background ───────────────────────────────────────────────────────
// useMemo runs synchronously during React render, before the first WebGL frame,
// so fog and background are guaranteed to be set on frame 0 (no useEffect lag).

function SceneSetup() {
  const { scene } = useThree();
  useMemo(() => {
    scene.background = new THREE.Color(0x050508);
    scene.fog = new THREE.FogExp2(0x050508, 0.08);
  }, [scene]);
  return null;
}

// ── 2. Fog volume (makes the atmosphere visible) ──────────────────────────────
// Without particles there is nothing to fog. These 400 small points, distributed
// at varying depths, become progressively more fog-obscured as they recede,
// creating the "haze being absorbed by darkness" gradient the eye can follow.

function FogVolume() {
  const geo = useMemo(() => {
    const count = 400;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 32; // x  spread
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20; // y  spread
      pos[i * 3 + 2] = -(Math.random() * 24 + 2);  // z  –2 → –26 (behind camera)
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);

  return (
    <points geometry={geo}>
      <pointsMaterial
        color="#3d2a7a"
        size={0.055}
        sizeAttenuation
        transparent
        opacity={0.75}
        // fog:true (default) — particles fade with depth
      />
    </points>
  );
}

// ── 3. Floating crystal ───────────────────────────────────────────────────────

function FloatingCrystal() {
  const ref = useRef<THREE.Mesh>(null);
  const elapsed = useRef(0);

  useFrame((_, delta) => {
    if (!ref.current) return;
    elapsed.current += delta;
    ref.current.rotation.y += delta * 0.12;
    ref.current.rotation.x += delta * 0.04;
    ref.current.position.y = Math.sin(elapsed.current * 0.35) * 0.22;
  });

  return (
    <mesh ref={ref} position={[0, 0, -1]}>
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

// ── 4. Sun mesh (god-ray anchor) ──────────────────────────────────────────────
// radius 0.15 → appears as roughly a 12px soft dot at this depth.
// fog={false} keeps it unaffected by scene fog so GodRays always has a
// luminance source.  opacity={0.55} makes it look like a distant star rather
// than a distracting sphere.

interface SunMeshProps {
  onMount: (mesh: THREE.Mesh) => void;
}

function SunMesh({ onMount }: SunMeshProps) {
  return (
    <mesh
      ref={(m) => { if (m) onMount(m); }}
      position={[13, 9.5, -15]}
    >
      <sphereGeometry args={[0.15, 8, 8]} />
      <meshBasicMaterial
        color="#c4b5fd"
        fog={false}
        transparent
        opacity={0.55}
      />
    </mesh>
  );
}

// ── 5. Scene composition ──────────────────────────────────────────────────────

function Scene() {
  const [sun, setSun] = useState<THREE.Mesh | null>(null);

  return (
    <>
      <SceneSetup />

      <ambientLight intensity={0.04} color="#0d0a20" />

      {/* Key light mirrors the god-ray source — gives the crystal indigo specular highlights */}
      <pointLight position={[8, 6, -5]} intensity={4} color="#7c6fff" distance={30} decay={2} />

      {/* Cool cyan fill from bottom-left adds depth separation */}
      <pointLight position={[-5, -3, 3]} intensity={0.6} color="#06b6d4" distance={15} decay={2} />

      <FogVolume />
      <SunMesh onMount={setSun} />
      <FloatingCrystal />

      {sun && (
        <EffectComposer>
          <GodRays
            sun={sun}
            blendFunction={BlendFunction.SCREEN}
            samples={60}
            density={0.97}
            decay={0.93}
            // weight + exposure bumped slightly to compensate for the
            // semi-transparent sun mesh
            weight={0.38}
            exposure={0.75}
            clampMax={1}
            kernelSize={KernelSize.SMALL}
            blur
          />
        </EffectComposer>
      )}
    </>
  );
}

// ── 6. Canvas ─────────────────────────────────────────────────────────────────

export default function ThreeScene() {
  return (
    <Canvas
      style={{ width: "100%", height: "100%" }}
      camera={{ position: [0, 0, 6], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
    >
      <Scene />
    </Canvas>
  );
}
