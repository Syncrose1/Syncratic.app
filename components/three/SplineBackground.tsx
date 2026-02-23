"use client";

/**
 * SplineBackground
 *
 * Embeds the Spline "Eternal Arc" atmospheric scene as a full-screen iframe.
 * The scene provides the god rays, ambient fog, and primary arc object.
 * pointer-events is kept none so the iframe never intercepts page clicks.
 */

export function SplineBackground() {
  return (
    <iframe
      src="https://my.spline.design/theeternalarc-lpqtqpy3zvcgE1sODuEYMX5J-Vrs/embed"
      frameBorder={0}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        border: "none",
        display: "block",
        pointerEvents: "none",
      }}
      title="Ambient background"
      loading="eager"
    />
  );
}
