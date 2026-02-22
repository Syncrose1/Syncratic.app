"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * GravityWell Component
 * 
 * Creates a gravitational lensing effect that distorts the background grid.
 * Uses SVG filters to create actual displacement/warping of grid lines.
 */

export function GravityWell() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  
  const springConfig = { damping: 30, stiffness: 150 };
  const smoothX = useMotionValue(0);
  const smoothY = useMotionValue(0);
  const springX = useSpring(smoothX, springConfig);
  const springY = useSpring(smoothY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      smoothX.set(e.clientX);
      smoothY.set(e.clientY);
      setIsActive(true);
    };

    const handleMouseLeave = () => setIsActive(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [smoothX, smoothY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* SVG Filter Definition - Creates the distortion effect */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="gravity-distortion" x="-50%" y="-50%" width="200%" height="200%">
            {/* Turbulence for the warping effect */}
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.015" 
              numOctaves="2" 
              result="noise"
            />
            {/* Displacement map to warp the grid */}
            <feDisplacementMap 
              in="SourceGraphic" 
              in2="noise" 
              scale="20" 
              xChannelSelector="R" 
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* 
        Distorted Grid Layer
        This grid follows the mouse and has the distortion filter applied
      */}
      <motion.div
        className="absolute w-[500px] h-[500px] -ml-[250px] -mt-[250px] rounded-full"
        style={{
          x: springX,
          y: springY,
          background: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 39px,
              rgba(255,255,255,0.06) 39px,
              rgba(255,255,255,0.06) 40px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 39px,
              rgba(255,255,255,0.06) 39px,
              rgba(255,255,255,0.06) 40px
            )
          `,
          filter: "url(#gravity-distortion)",
          maskImage: "radial-gradient(circle at center, black 0%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(circle at center, black 0%, transparent 70%)",
        }}
        animate={{
          scale: isActive ? 1 : 0.8,
          opacity: isActive ? 1 : 0,
        }}
        transition={{
          scale: { duration: 0.4, ease: "easeOut" },
          opacity: { duration: 0.3 },
        }}
      >
        {/* Inner compressed grid - creates the pulled-in effect */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full"
          style={{
            background: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 19px,
                rgba(255,255,255,0.08) 19px,
                rgba(255,255,255,0.08) 20px
              ),
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 19px,
                rgba(255,255,255,0.08) 19px,
                rgba(255,255,255,0.08) 20px
              )
            `,
            transform: "scale(0.6)",
          }}
          animate={{
            rotate: isActive ? 360 : 0,
          }}
          transition={{
            rotate: { duration: 15, repeat: Infinity, ease: "linear" },
          }}
        />
      </motion.div>

      {/* Visual glow effect */}
      <motion.div
        className="absolute w-[350px] h-[350px] -ml-[175px] -mt-[175px] rounded-full"
        style={{
          x: springX,
          y: springY,
          background: "radial-gradient(circle at center, rgba(255,255,255,0.02) 0%, transparent 60%)",
        }}
        animate={{
          scale: isActive ? [1, 1.1, 1] : 0.8,
          opacity: isActive ? 1 : 0,
        }}
        transition={{
          scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 0.3 },
        }}
      />
    </div>
  );
}
