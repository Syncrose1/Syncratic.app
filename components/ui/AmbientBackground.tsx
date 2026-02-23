"use client";

import { SplineBackground } from "../three/SplineBackground";
import { FogRaysBackground } from "../three/FogRaysBackground";
import { MouseEffects } from "./MouseEffects";

/**
 * AmbientBackground Component
 *
 * Full-screen fixed background layer, three stacked sublayers:
 *   1. SplineBackground  — Spline iframe: god rays, fog, primary arc
 *   2. FogRaysBackground — Transparent R3F canvas: our closer 3D ring
 *   3. MouseEffects      — 2D mouse-reactive particles
 */

export function AmbientBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Layer 1: Spline atmospheric scene (god rays + arc) */}
      <SplineBackground />

      {/* Layer 2: Our R3F ring — transparent canvas sits above Spline */}
      <FogRaysBackground />

      {/* Layer 3: 2D mouse-reactive particles */}
      <MouseEffects />
    </div>
  );
}
