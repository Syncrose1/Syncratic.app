"use client";

/// <reference types="@react-three/fiber" />

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useState, useMemo } from "react";
import { EffectComposer, GodRays } from "@react-three/postprocessing";
import { BlendFunction, KernelSize } from "postprocessing";
import * as THREE from "three";

// ── 1. Fog + background ───────────────────────────────────────────────────────

function SceneSetup() {
  const { scene } = useThree();
  useMemo(() => {
    scene.background = new THREE.Color(0x050508);
    scene.fog = new THREE.FogExp2(0x050508, 0.08);
  }, [scene]);
  return null;
}

// ── 2. Fog volume ─────────────────────────────────────────────────────────────
// 600 particles scattered at depth –2 → –26.  Near ones are clearly visible;
// far ones fade into the void via FogExp2.  This is the "visible medium" the
// god rays stream through.

function FogVolume() {
  const geo = useMemo(() => {
    const count = 600;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 34;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 2] = -(Math.random() * 24 + 2);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);

  return (
    <points geometry={geo}>
      <pointsMaterial
        color="#5c4499"
        size={0.065}
        sizeAttenuation
        transparent
        opacity={0.8}
      />
    </points>
  );
}

// ── 3. Floating crystal ───────────────────────────────────────────────────────
// Positioned right-of-centre so it floats away from the left-aligned page text.
// MeshPhongMaterial with flatShading makes each icosahedron face a distinct
// reflective facet — works well with point lights alone (no envMap needed).

function FloatingCrystal() {
  const ref = useRef<THREE.Mesh>(null);
  const elapsed = useRef(0);

  useFrame((_, delta) => {
    if (!ref.current) return;
    elapsed.current += delta;
    ref.current.rotation.y += delta * 0.12;
    ref.current.rotation.x += delta * 0.04;
    ref.current.position.y = -0.5 + Math.sin(elapsed.current * 0.35) * 0.22;
  });

  return (
    // x=2.5 pushes the crystal into the right half of the viewport,
    // z=–5 gives comfortable depth (~11 units from camera → ~70px apparent size)
    <mesh ref={ref} position={[2.5, -0.5, -5]}>
      <icosahedronGeometry args={[0.65, 1]} />
      {/*
       * flatShading=true gives each of the 80 faces its own surface normal,
       * making the facets clearly distinct under the point lights above.
       */}
      <meshPhongMaterial
        color="#818cf8"
        specular="#ffffff"
        shininess={120}
        emissive="#312e81"
        emissiveIntensity={0.55}
        flatShading
      />
    </mesh>
  );
}

// ── 4. Sun mesh ───────────────────────────────────────────────────────────────
// Fully opaque + fog=false → maximum luminance for the GodRays luminance pass.
// radius 0.15 at distance ~25 ≈ a 12px dot — clearly a light source, not a sphere.

interface SunMeshProps {
  onMount: (mesh: THREE.Mesh) => void;
}

function SunMesh({ onMount }: SunMeshProps) {
  return (
    <mesh ref={(m) => { if (m) onMount(m); }} position={[13, 9.5, -15]}>
      <sphereGeometry args={[0.15, 8, 8]} />
      <meshBasicMaterial color="#ffffff" fog={false} />
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

      {/* Key light from top-right — creates the specular highlights on crystal faces */}
      <pointLight position={[8, 6, -5]} intensity={4} color="#7c6fff" distance={30} decay={2} />

      {/* Cool cyan rim from bottom-left for silhouette separation */}
      <pointLight position={[-5, -3, 3]} intensity={0.6} color="#06b6d4" distance={15} decay={2} />

      <FogVolume />
      <SunMesh onMount={setSun} />
      <FloatingCrystal />

      {sun && (
        <EffectComposer>
          <GodRays
            sun={sun}
            blendFunction={BlendFunction.SCREEN}
            // 80 samples gives smooth shafts without banding
            samples={80}
            // density controls the step size per sample radially from the sun
            density={0.97}
            // decay 0.97 (was 0.93) — rays stay bright much further from source
            decay={0.97}
            // weight 0.7 (was 0.38) — primary driver of ray visibility
            weight={0.7}
            exposure={0.7}
            clampMax={1}
            // LARGE kernel = wider blur per sample = rays physically extend
            // across a much larger portion of the screen
            kernelSize={KernelSize.LARGE}
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
