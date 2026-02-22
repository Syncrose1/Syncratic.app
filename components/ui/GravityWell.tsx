"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * GravityWell Component
 * 
 * Creates a radial distortion effect around the mouse cursor that affects
 * the background grid, making it look like the cursor has a gravity well.
 * 
 * The effect uses CSS transforms and radial gradients to create a lens-like
 * distortion that follows the mouse with smooth spring physics.
 */

export function GravityWell() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  
  // Raw mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring physics for the gravity well follow
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseenter", handleMouseEnter);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
    >
      {/* Base Grid Layer */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--text-primary) 1px, transparent 1px),
            linear-gradient(to bottom, var(--text-primary) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Gravity Well Effect Layer */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--text-primary) 1px, transparent 1px),
            linear-gradient(to bottom, var(--text-primary) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          opacity: 0.04,
          x: smoothX,
          y: smoothY,
        }}
      >
        {/* Radial distortion mask that follows mouse */}
        <motion.div
          className="absolute w-[400px] h-[400px] -ml-[200px] -mt-[200px] rounded-full"
          style={{
            x: smoothX,
            y: smoothY,
            background: `
              radial-gradient(
                circle at center,
                transparent 0%,
                transparent 20%,
                rgba(255,255,255,0.1) 25%,
                rgba(255,255,255,0.05) 40%,
                transparent 60%
              )
            `,
            boxShadow: `
              inset 0 0 60px 20px rgba(255,255,255,0.03),
              0 0 100px 50px rgba(255,255,255,0.02)
            `,
          }}
          animate={{
            scale: isHovering ? 1 : 0.8,
            opacity: isHovering ? 1 : 0,
          }}
          transition={{
            scale: { duration: 0.4, ease: "easeOut" },
            opacity: { duration: 0.3 },
          }}
        />
      </motion.div>

      {/* Distorted Grid Layer - This creates the actual warping effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          x: smoothX,
          y: smoothY,
        }}
      >
        <motion.div
          className="absolute w-[500px] h-[500px] -ml-[250px] -mt-[250px]"
          style={{
            background: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 59px,
                rgba(255,255,255,0.08) 59px,
                rgba(255,255,255,0.08) 60px
              ),
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 59px,
                rgba(255,255,255,0.08) 59px,
                rgba(255,255,255,0.08) 60px
              )
            `,
            borderRadius: "50%",
            transform: "scale(1.5)",
          }}
          animate={{
            scale: isHovering ? [1.3, 1.5, 1.3] : 1.3,
            rotate: isHovering ? [0, 5, -5, 0] : 0,
            opacity: isHovering ? [0.6, 0.8, 0.6] : 0,
          }}
          transition={{
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 0.3 },
          }}
        />
      </motion.div>

      {/* Central Gravity Core - The intense center of the well */}
      <motion.div
        className="absolute w-32 h-32 -ml-16 -mt-16 rounded-full"
        style={{
          x: smoothX,
          y: smoothY,
          background: `
            radial-gradient(
              circle at center,
              rgba(255,255,255,0.15) 0%,
              rgba(255,255,255,0.05) 30%,
              transparent 70%
            )
          `,
          filter: "blur(8px)",
        }}
        animate={{
          scale: isHovering ? [1, 1.2, 1] : 0,
          opacity: isHovering ? 1 : 0,
        }}
        transition={{
          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 0.3 },
        }}
      />

      {/* Secondary rings - like accretion disk */}
      <motion.div
        className="absolute w-48 h-48 -ml-24 -mt-24 rounded-full border border-white/5"
        style={{
          x: smoothX,
          y: smoothY,
        }}
        animate={{
          scale: isHovering ? [1, 1.1, 1] : 0.8,
          opacity: isHovering ? [0.3, 0.5, 0.3] : 0,
          rotate: isHovering ? 360 : 0,
        }}
        transition={{
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
        }}
      />

      <motion.div
        className="absolute w-64 h-64 -ml-32 -mt-32 rounded-full border border-white/[0.03]"
        style={{
          x: smoothX,
          y: smoothY,
        }}
        animate={{
          scale: isHovering ? [1, 1.15, 1] : 0.8,
          opacity: isHovering ? [0.2, 0.4, 0.2] : 0,
          rotate: isHovering ? -360 : 0,
        }}
        transition={{
          scale: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
          opacity: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
          rotate: { duration: 25, repeat: Infinity, ease: "linear" },
        }}
      />
    </div>
  );
}
