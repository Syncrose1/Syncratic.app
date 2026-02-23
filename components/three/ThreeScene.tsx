"use client";

/// <reference types="@react-three/fiber" />

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

// ─────────────────────────────────────────────────────────────────────────────
// Shared vertex shader — standard UV pass-through, uses camera matrices so
// each mesh sits correctly in 3-D space (unlike the old full-screen plane).
// ─────────────────────────────────────────────────────────────────────────────

const basicVert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// God-ray bar fragment shader
// Each bar is a tall PlaneGeometry.  The shader fades horizontally from the
// centre outward (soft gaussian edge) and fades at both tips so the bar
// dissolves into the scene rather than ending sharply.
// ─────────────────────────────────────────────────────────────────────────────

const rayFrag = /* glsl */ `
  varying vec2 vUv;
  uniform float uOpacity;
  uniform vec3  uColor;

  void main() {
    // Horizontal: distance from centre line (vUv.x = 0 … 1, centre = 0.5)
    float xDist = abs(vUv.x - 0.5) * 2.0;          // 0 at centre, 1 at edge
    float xFade = pow(max(1.0 - xDist, 0.0), 1.8);  // soft gaussian profile

    // Vertical: fade in at base, fade out at tip
    float yFade = smoothstep(0.0, 0.08, vUv.y) * smoothstep(1.0, 0.92, vUv.y);

    gl_FragColor = vec4(uColor, xFade * yFade * uOpacity);
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Ambient glow fragment shader
// Covers a large plane centred on the top-right "sun".  Produces a soft
// radial bloom that the individual ray bars emanate from.
// ─────────────────────────────────────────────────────────────────────────────

const glowFrag = /* glsl */ `
  varying vec2 vUv;
  uniform float uOpacity;

  void main() {
    float dist = length(vUv - vec2(0.5));
    // Tighter falloff (3.2) keeps the glow concentrated; exp makes it smooth
    float g = exp(-dist * 3.2) * uOpacity;
    gl_FragColor = vec4(0.48, 0.52, 1.0, g);
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Ray configurations
// [x, y, z,  rotZ_rad,  barWidth,  baseOpacity,  pulseSpeed,  pulsePhase]
//
// All rays originate near the top-right light source and angle downward-left,
// spread across slightly different depths for parallax variety.
// ─────────────────────────────────────────────────────────────────────────────

const RAYS = [
  [  4.2,  3.8, -5.0, -0.75, 0.22, 0.22, 0.10, 0.0 ],
  [  5.8,  5.2, -4.5, -0.72, 0.12, 0.18, 0.09, 1.3 ],
  [  3.1,  5.8, -6.5, -0.79, 0.16, 0.13, 0.07, 2.7 ],
  [  6.6,  4.2, -4.0, -0.73, 0.09, 0.16, 0.11, 0.8 ],
  [  4.9,  6.8, -5.5, -0.77, 0.28, 0.09, 0.06, 2.2 ],
  [  3.5,  4.2, -7.0, -0.70, 0.11, 0.14, 0.08, 3.6 ],
  [  7.2,  5.8, -3.5, -0.74, 0.07, 0.17, 0.12, 1.7 ],
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// Ambient glow — large soft bloom centred on the top-right light source
// ─────────────────────────────────────────────────────────────────────────────

function AmbientGlow() {
  const uniforms = useRef<Record<string, THREE.IUniform>>({
    uOpacity: { value: 0.55 },
  });

  return (
    <mesh position={[5.5, 5.5, -8]} renderOrder={-2}>
      <planeGeometry args={[14, 14]} />
      <shaderMaterial
        vertexShader={basicVert}
        fragmentShader={glowFrag}
        uniforms={uniforms.current}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// God-ray bars — seven angled planes that pulse gently in opacity
// ─────────────────────────────────────────────────────────────────────────────

function GodRayBars() {
  const time = useRef(0);

  // One uniforms object per ray, created once and mutated in useFrame
  const uniformsArray = useMemo(
    () =>
      RAYS.map(([, , , , , baseOpacity, ,]) => ({
        uOpacity: { value: baseOpacity },
        uColor:   { value: new THREE.Color(0.55, 0.60, 1.0) },
      })),
    []
  );

  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((_, delta) => {
    time.current += delta;
    RAYS.forEach(([, , , , , baseOpacity, speed, phase], i) => {
      // Gentle sinusoidal pulse: ±30 % of base opacity
      const pulse = Math.sin(time.current * speed + phase) * 0.30 + 1.0;
      uniformsArray[i].uOpacity.value = baseOpacity * pulse;
    });
  });

  return (
    <>
      {RAYS.map(([x, y, z, rotZ, width], i) => (
        <mesh
          key={i}
          ref={(el) => { meshRefs.current[i] = el; }}
          position={[x, y, z]}
          rotation={[0, 0, rotZ]}
          renderOrder={-1}
        >
          {/* width × 34 units tall — long enough to reach off-screen */}
          <planeGeometry args={[width, 34]} />
          <shaderMaterial
            vertexShader={basicVert}
            fragmentShader={rayFrag}
            uniforms={uniformsArray[i]}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Floating torus — dark chrome ring that intercepts and deflects the rays
// ─────────────────────────────────────────────────────────────────────────────

function FloatingTorus() {
  const ref  = useRef<THREE.Mesh>(null);
  const time = useRef(0);

  useFrame((_, delta) => {
    if (!ref.current) return;
    time.current += delta;
    // Very slow primary roll around Z
    ref.current.rotation.z += delta * 0.04;
    // Subtle breathing sway on Y
    ref.current.rotation.y = Math.sin(time.current * 0.16) * 0.05;
  });

  // Larger ring (radius 2.2), steeply tilted, right-of-centre and closer in
  return (
    <mesh ref={ref} position={[2.5, -0.5, -4]} rotation={[-1.05, 0.15, 0.28]}>
      <torusGeometry args={[2.2, 0.18, 128, 256]} />
      <meshPhongMaterial
        color="#060610"
        specular="#a5b4fc"
        shininess={340}
        emissive="#060614"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Scene
// ─────────────────────────────────────────────────────────────────────────────

function Scene() {
  const { scene } = useThree();
  useMemo(() => {
    scene.background = new THREE.Color(0x050508);
    scene.fog = null;
  }, [scene]);

  return (
    <>
      {/* Faint ambient so the torus shadow-side isn't absolute black */}
      <ambientLight intensity={0.05} color="#080618" />

      {/* Key light mirrors the god-ray source: top-right, indigo-white */}
      <pointLight
        position={[12, 10, -4]}
        intensity={12}
        color="#b0b6ff"
        distance={70}
        decay={1.5}
      />

      {/* Cool fill from bottom-left separates the torus from total darkness */}
      <pointLight
        position={[-5, -4, 2]}
        intensity={0.4}
        color="#06b6d4"
        distance={20}
        decay={2}
      />

      <AmbientGlow />
      <GodRayBars />
      <FloatingTorus />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Canvas
// ─────────────────────────────────────────────────────────────────────────────

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
