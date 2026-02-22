"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * GlassCard Component
 * 
 * A reusable glassmorphism card component with hover effects and optional glow.
 * 
 * @example
 * <GlassCard glow="subtle" hover>
 *   <h3>Card Title</h3>
 *   <p>Card content</p>
 * </GlassCard>
 */

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: "none" | "subtle" | "strong";
  border?: boolean;
  onClick?: () => void;
}

export function GlassCard({
  children,
  className,
  hover = true,
  glow = "none",
  border = true,
  onClick,
}: GlassCardProps) {
  const glowStyles = {
    none: {},
    subtle: {
      boxShadow: "0 0 30px var(--accent-glow)",
    },
    strong: {
      boxShadow: "0 0 60px var(--accent-glow)",
    },
  };

  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-2xl",
        "bg-[var(--glass-bg)] backdrop-blur-[var(--glass-blur)]",
        border && "border border-[var(--glass-border)]",
        hover && "transition-all duration-300 hover:bg-[var(--glass-bg-hover)] hover:border-[var(--glass-border-hover)]",
        onClick && "cursor-pointer",
        className
      )}
      style={glowStyles[glow]}
      whileHover={
        hover
          ? {
              y: -4,
              transition: { duration: 0.3 },
            }
          : undefined
      }
      whileTap={onClick ? { scale: 0.98 } : undefined}
      onClick={onClick}
    >
      {/* Subtle gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
