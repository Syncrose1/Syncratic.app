"use client";

import { FogRaysBackground } from "../three/FogRaysBackground";
import { MouseEffects } from "./MouseEffects";

/**
 * AmbientBackground Component
 *
 * Full-screen fixed background layer.
 * Renders the Three.js fog + god-rays + floating crystal scene,
 * with the mouse-reactive 2D particle layer on top.
 */

export function AmbientBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Three.js atmospheric scene: fog, god rays, rotating crystal */}
      <FogRaysBackground />

      {/* 2D mouse-reactive particles sit above the 3D background */}
      <MouseEffects />
    </div>
  );
}
