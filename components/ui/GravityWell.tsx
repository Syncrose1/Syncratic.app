"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * GravityWell Component
 * 
 * Creates a radial distortion/lens effect that warps the background grid
 * around the mouse cursor position. Uses CSS backdrop-filter and radial
 * gradients to create the illusion of gravitational lensing.
 */

export function GravityWell() {
  const [isActive, setIsActive] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Smooth spring physics for fluid movement
  const springConfig = { damping: 30, stiffness: 150, mass: 0.8 };
  const smoothX = useSpring(mousePosition.x, springConfig);
  const smoothY = useSpring(mousePosition.y, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsActive(true);
    };

    const handleMouseLeave = () => {
      setIsActive(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Update springs when mouse moves
  useEffect(() => {
    smoothX.set(mousePosition.x);
    smoothY.set(mousePosition.y);
  }, [mousePosition, smoothX, smoothY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 
        Gravity Well Lens Effect
        This creates a circular region around the mouse that:
        1. Uses backdrop-filter to blur/distort the background
        2. Applies a radial gradient mask to blend the effect
        3. Creates the illusion of space-time curvature
      */}
      <motion.div
        className="absolute w-[300px] h-[300px] -ml-[150px] -mt-[150px] rounded-full"
        style={{
          x: smoothX,
          y: smoothY,
          // Backdrop blur creates the distortion effect
          backdropFilter: "blur(2px) saturate(1.2)",
          WebkitBackdropFilter: "blur(2px) saturate(1.2)",
          // Radial gradient creates the lens shape with falloff
          background: `
            radial-gradient(
              circle at center,
              rgba(255,255,255,0.03) 0%,
              rgba(255,255,255,0.01) 30%,
              transparent 60%
            )
          `,
          // Inner glow for the gravity well
          boxShadow: `
            inset 0 0 80px 20px rgba(255,255,255,0.02),
            0 0 60px 30px rgba(255,255,255,0.01)
          `,
        }}
        animate={{
          scale: isActive ? 1 : 0.5,
          opacity: isActive ? 1 : 0,
        }}
        transition={{
          scale: { duration: 0.4, ease: "easeOut" },
          opacity: { duration: 0.3 },
        }}
      />

      {/* 
        Secondary Ring - Accretion Disk Effect
        A rotating ring around the gravity well for visual interest
      */}
      <motion.div
        className="absolute w-[350px] h-[350px] -ml-[175px] -mt-[175px] rounded-full border border-white/[0.03]"
        style={{
          x: smoothX,
          y: smoothY,
        }}
        animate={{
          scale: isActive ? [1, 1.05, 1] : 0.8,
          opacity: isActive ? [0.2, 0.4, 0.2] : 0,
          rotate: isActive ? 360 : 0,
        }}
        transition={{
          scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 15, repeat: Infinity, ease: "linear" },
        }}
      />

      {/* 
        Tertiary Ring - Outer Gravity Field
      */}
      <motion.div
        className="absolute w-[450px] h-[450px] -ml-[225px] -mt-[225px] rounded-full border border-white/[0.02]"
        style={{
          x: smoothX,
          y: smoothY,
        }}
        animate={{
          scale: isActive ? [1, 1.08, 1] : 0.8,
          opacity: isActive ? [0.1, 0.25, 0.1] : 0,
          rotate: isActive ? -360 : 0,
        }}
        transition={{
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
          opacity: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
        }}
      />

      {/* 
        Central Core - The intense center
        A subtle glow at the center of the gravity well
      */}
      <motion.div
        className="absolute w-20 h-20 -ml-10 -mt-10 rounded-full"
        style={{
          x: smoothX,
          y: smoothY,
          background: "radial-gradient(circle at center, rgba(255,255,255,0.08) 0%, transparent 70%)",
          filter: "blur(4px)",
        }}
        animate={{
          scale: isActive ? [1, 1.3, 1] : 0,
          opacity: isActive ? 1 : 0,
        }}
        transition={{
          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 0.3 },
        }}
      />
    </div>
  );
}
