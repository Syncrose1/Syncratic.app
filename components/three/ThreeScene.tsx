"use client";

/// <reference types="@react-three/fiber" />

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

// ─────────────────────────────────────────────────────────────────────────────
// Volumetric fog shaders
//
// The vertex shader bypasses the camera/projection matrices so the plane
// always covers exactly the full screen regardless of camera position.
// The fragment shader ray-marches through 6-octave fractal Brownian motion
// noise, accumulating fog density and Mie-scattered light from the top-right
// "sun".  This produces the soft, organic, cloud-like fog from the reference.
// ─────────────────────────────────────────────────────────────────────────────

const fogVert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    // Position directly in NDC — bypasses all camera transforms.
    // PlaneGeometry(2,2) has vertices at ±1, which map to screen corners.
    gl_Position = vec4(position.xy, 1.0, 1.0);
  }
`;

const fogFrag = /* glsl */ `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uAspect;

  // ── Value noise (fast, smooth) ───────────────────────────────────────────
  float hash(vec3 p) {
    p  = fract(p * vec3(443.897, 441.423, 437.195));
    p += dot(p, p.yxz + 19.19);
    return fract((p.x + p.y) * p.z);
  }
  float vnoise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i),            hash(i+vec3(1,0,0)), f.x),
          mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)), f.x), f.y),
      mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)), f.x),
          mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)), f.x), f.y),
      f.z);
  }

  // ── 6-octave fBm — creates cloud-like structure ──────────────────────────
  float fbm(vec3 p) {
    float v = 0.0;
    float a = 0.5;
    vec3  s = p;
    for (int i = 0; i < 6; i++) {
      v += a * vnoise(s);
      s *= 2.02;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;

    // ── Light source: top-right corner in aspect-corrected screen space ──
    vec2 aUV    = vec2(uv.x * uAspect, uv.y);
    vec2 aLight = vec2(0.87 * uAspect, 0.87);
    float screenLightDist = length(aUV - aLight);
    // Reduced multiplier (1.6→1.0) widens the glow into a softer bloom
    float screenFalloff   = exp(-screenLightDist * 1.0);

    // ── Ray setup from a virtual camera ─────────────────────────────────
    vec3 ro = vec3(0.0, 0.0, 2.5);
    vec2 ndc = (uv - 0.5) * vec2(uAspect, 1.0);
    vec3 rd = normalize(vec3(ndc, -1.3));

    // World-space light direction matching the corner position
    vec3 lightDir = normalize(vec3(0.6, 0.65, -0.45));

    // ── Ray march through fog volume ─────────────────────────────────────
    float fog          = 0.0;
    float illumination = 0.0;
    float stepSize     = 0.30;

    for (int i = 0; i < 56; i++) {
      float t = float(i) * stepSize;
      vec3  p = ro + rd * t;

      // Animated noise — drift the fog slowly on all axes
      vec3 sp = p * 0.38
              + vec3( uTime * 0.028,
                     -uTime * 0.012,
                      uTime * 0.018);
      float density = fbm(sp);
      density = max(0.0, density - 0.30);   // carve out clear regions

      if (density > 0.001) {
        // Mie-like forward scattering — bright where you look toward the light
        float scatter = pow(max(0.0, dot(-rd, lightDir)), 6.0) * 0.45;
        // Screen-space falloff from the corner light (simple, effective)
        float atten = screenFalloff * 0.80 + scatter;

        float transmit  = 1.0 - fog;
        fog          += density * 0.052 * transmit;
        illumination += density * atten  * 0.16 * transmit;
      }

      // Early exit once fully opaque
      if (fog > 0.98) break;
    }

    // ── Colour palette — matches the site's void/indigo theme ───────────
    // Background: --void #050508
    vec3 bgColor    = vec3(0.020, 0.020, 0.031);
    // Fog body: dark indigo, visible but not distracting
    vec3 fogColor   = vec3(0.060, 0.042, 0.155);
    // Light: indigo-tinted white, bright near the source
    vec3 lightColor = vec3(0.70,  0.75,  1.00);

    vec3 col = mix(bgColor, fogColor, clamp(fog, 0.0, 1.0));
    col += lightColor * clamp(illumination, 0.0, 2.0);

    gl_FragColor = vec4(col, 1.0);
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Full-screen fog plane
// renderOrder -1 → renders first; depthTest/Write false → never occludes
// the torus that renders on top with normal depth testing.
// ─────────────────────────────────────────────────────────────────────────────

function VolumetricFog() {
  const { size } = useThree();

  // Uniform object is stable across renders; values mutated in useFrame
  const uniforms = useRef<Record<string, THREE.IUniform>>({
    uTime:   { value: 0 },
    uAspect: { value: size.width / size.height },
  });

  useFrame((state, delta) => {
    uniforms.current.uTime.value  += delta;
    // Keep aspect ratio correct on resize
    uniforms.current.uAspect.value =
      state.size.width / state.size.height;
  });

  return (
    <mesh renderOrder={-1}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={fogVert}
        fragmentShader={fogFrag}
        uniforms={uniforms.current}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Rotating torus
//
// Dark, polished chrome ring that sits in the bright fog area (right-of-centre).
// The high-shininess Phong specular creates the narrow bright rim highlight
// seen in the reference — this works without an envMap because the point light
// above-right mimics the same illumination as the fog shader's light.
// ─────────────────────────────────────────────────────────────────────────────

function FloatingTorus() {
  const ref  = useRef<THREE.Mesh>(null);
  const time = useRef(0);

  useFrame((_, delta) => {
    if (!ref.current) return;
    time.current += delta;
    // Very slow primary roll around Z
    ref.current.rotation.z += delta * 0.045;
    // Subtle breathing sway on Y
    ref.current.rotation.y = Math.sin(time.current * 0.18) * 0.06;
  });

  // Pushed right (x=4.5) and deep (z=-7): right third of screen, clear of text.
  // At distance ~13 units, radius=1.0 ≈ 110px apparent size.
  return (
    <mesh ref={ref} position={[4.5, 0.5, -7]} rotation={[-0.55, 0, 0.22]}>
      <torusGeometry args={[1.0, 0.14, 128, 256]} />
      <meshPhongMaterial
        color="#06060f"
        specular="#a5b4fc"
        shininess={340}
        emissive="#060614"
        emissiveIntensity={0.25}
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
    scene.fog = null; // fog handled by shader, not Three.js
  }, [scene]);

  return (
    <>
      {/* Faint ambient so the torus shadow-side isn't absolute black */}
      <ambientLight intensity={0.06} color="#0a0820" />

      {/*
       * Bright key light: position mirrors the fog shader's light direction
       * so the torus rim catches the same "sun" that illuminates the fog.
       */}
      <pointLight
        position={[12, 9, -5]}
        intensity={10}
        color="#b4b8ff"
        distance={60}
        decay={1.5}
      />

      {/* Cool cyan fill from bottom-left — separates the torus from darkness */}
      <pointLight
        position={[-6, -4, 2]}
        intensity={0.5}
        color="#06b6d4"
        distance={20}
        decay={2}
      />

      <VolumetricFog />
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
