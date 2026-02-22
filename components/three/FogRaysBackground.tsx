"use client";

import dynamic from "next/dynamic";

/**
 * FogRaysBackground
 *
 * SSR-safe wrapper for the Three.js atmospheric background.
 * Three.js / WebGL requires browser APIs that don't exist on the server,
 * so we use Next.js dynamic import with ssr: false.
 *
 * The component is positioned absolute so it fills whatever container
 * the caller provides (typically the fixed full-screen AmbientBackground div).
 */

const ThreeScene = dynamic(() => import("./ThreeScene"), {
  ssr: false,
  // Render nothing while the JS bundle loads — the CSS background-color
  // on <body> covers the brief gap seamlessly.
  loading: () => null,
});

export function FogRaysBackground() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
      }}
    >
      <ThreeScene />
    </div>
  );
}
