"use client";

/// <reference types="@react-three/fiber" />

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

// ─────────────────────────────────────────────────────────────────────────────
// Floating ring — a dark, reflective torus that sits in front of the Spline
// scene, close enough to the camera to appear "between" the background and the
// page text.  The point lights below are matched to the Spline scene's upper-
// right key light so the ring catches the same illumination.
// ─────────────────────────────────────────────────────────────────────────────

function FloatingRing() {
  const ref  = useRef<THREE.Mesh>(null);
  const time = useRef(0);

  useFrame((_, delta) => {
    if (!ref.current) return;
    time.current += delta;
    // Very slow primary roll
    ref.current.rotation.z += delta * 0.025;
    // Subtle breathing sway
    ref.current.rotation.y = Math.sin(time.current * 0.12) * 0.04;
  });

  // Position: slightly right-of-centre and closer to camera than the Spline arc
  return (
    <mesh ref={ref} position={[1.5, -0.2, -3]} rotation={[-0.85, 0.1, 0.15]}>
      <torusGeometry args={[2.0, 0.15, 128, 256]} />
      <meshPhongMaterial
        color="#060610"
        specular="#a5b4fc"
        shininess={380}
        emissive="#05050f"
        emissiveIntensity={0.15}
      />
    </mesh>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Scene — transparent background so the Spline iframe shows through
// ─────────────────────────────────────────────────────────────────────────────

function Scene() {
  const { scene } = useThree();
  useMemo(() => {
    // null background = transparent canvas; Spline iframe is visible beneath
    scene.background = null;
  }, [scene]);

  return (
    <>
      <ambientLight intensity={0.05} color="#080618" />

      {/*
       * Key light matches the Spline scene's upper-right source so our ring's
       * specular highlight is consistent with the background lighting.
       */}
      <pointLight
        position={[10, 9, -3]}
        intensity={14}
        color="#b0b6ff"
        distance={60}
        decay={1.5}
      />

      {/* Cool fill from bottom-left separates the ring from total darkness */}
      <pointLight
        position={[-5, -4, 2]}
        intensity={0.4}
        color="#06b6d4"
        distance={20}
        decay={2}
      />

      <FloatingRing />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Canvas — alpha: true so the Spline background is visible through the canvas
// ─────────────────────────────────────────────────────────────────────────────

export default function ThreeScene() {
  return (
    <Canvas
      style={{ width: "100%", height: "100%" }}
      camera={{ position: [0, 0, 6], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <Scene />
    </Canvas>
  );
}
