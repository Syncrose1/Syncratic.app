"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * MouseEffects Component
 * 
 * Combines two elegant mouse interactions:
 * 1. Spotlight effect - A subtle glow that follows the cursor
 * 2. Floating particles - Ambient particles that react to mouse proximity
 */

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export function MouseEffects() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  
  // Smooth spring physics for fluid movement
  const springConfig = { damping: 25, stiffness: 200 };
  const smoothX = useMotionValue(0);
  const smoothY = useMotionValue(0);
  const springX = useSpring(smoothX, springConfig);
  const springY = useSpring(smoothY, springConfig);

  // Generate random particles on mount
  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

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
      
      {/* ============================================
          SPOTLIGHT EFFECT
          A subtle radial glow that follows the cursor
         ============================================ */}
      
      <motion.div
        className="absolute w-[400px] h-[400px] -ml-[200px] -mt-[200px] rounded-full"
        style={{
          x: springX,
          y: springY,
          background: "radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, transparent 60%)",
          filter: "blur(40px)",
        }}
        animate={{
          scale: isActive ? 1 : 0.5,
          opacity: isActive ? 1 : 0,
        }}
        transition={{
          scale: { duration: 0.5, ease: "easeOut" },
          opacity: { duration: 0.3 },
        }}
      />

      {/* Inner intense core */}
      <motion.div
        className="absolute w-32 h-32 -ml-16 -mt-16 rounded-full"
        style={{
          x: springX,
          y: springY,
          background: "radial-gradient(circle at center, rgba(255,255,255,0.06) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
        animate={{
          scale: isActive ? [1, 1.2, 1] : 0.5,
          opacity: isActive ? 1 : 0,
        }}
        transition={{
          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 0.3 },
        }}
      />

      {/* ============================================
          FLOATING PARTICLES
          Ambient particles that react to mouse
         ============================================ */}
      
      {particles.map((particle) => (
        <Particle
          key={particle.id}
          particle={particle}
          mousePos={mousePos}
          isActive={isActive}
        />
      ))}
    </div>
  );
}

/**
 * Individual Particle Component
 * Each particle floats and reacts to mouse proximity
 */
function Particle({ 
  particle, 
  mousePos, 
  isActive 
}: { 
  particle: Particle; 
  mousePos: { x: number; y: number };
  isActive: boolean;
}) {
  // Calculate distance from mouse for interaction
  const particleX = (particle.x / 100) * window.innerWidth;
  const particleY = (particle.y / 100) * window.innerHeight;
  const distance = Math.sqrt(
    Math.pow(mousePos.x - particleX, 2) + Math.pow(mousePos.y - particleY, 2)
  );
  
  // Particles move away from mouse when close
  const maxDistance = 150;
  const repelStrength = Math.max(0, 1 - distance / maxDistance);
  
  const angle = Math.atan2(particleY - mousePos.y, particleX - mousePos.x);
  const offsetX = isActive ? Math.cos(angle) * repelStrength * 30 : 0;
  const offsetY = isActive ? Math.sin(angle) * repelStrength * 30 : 0;

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: `${particle.x}%`,
        top: `${particle.y}%`,
        width: particle.size,
        height: particle.size,
        backgroundColor: "rgba(255, 255, 255, 0.4)",
        boxShadow: `0 0 ${particle.size * 2}px rgba(255, 255, 255, 0.3)`,
      }}
      animate={{
        x: offsetX,
        y: offsetY,
        opacity: isActive && repelStrength > 0.3 ? 0.8 : 0.3,
        scale: isActive && repelStrength > 0.3 ? 1.5 : 1,
      }}
      transition={{
        x: { type: "spring", stiffness: 150, damping: 15 },
        y: { type: "spring", stiffness: 150, damping: 15 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      }}
      // Floating animation
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 0.3 }}
    >
      <motion.div
        className="w-full h-full rounded-full"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: particle.duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: particle.delay,
        }}
      />
    </motion.div>
  );
}
