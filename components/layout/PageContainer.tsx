"use client";

import { motion } from "framer-motion";
import { Topbar } from "@/components/navigation/Topbar";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { cn } from "@/lib/utils";

/**
 * PageContainer Component
 * 
 * Wraps all pages with:
 * - Topbar navigation
 * - AmbientBackground effects
 * - Consistent layout structure
 * - Page transition animations
 */

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export function PageContainer({
  children,
  className,
  fullWidth = false,
}: PageContainerProps) {
  return (
    <div className="relative min-h-screen">
      {/* Ambient Background */}
      <AmbientBackground />

      {/* Navigation */}
      <Topbar />

      {/* Main Content */}
      <motion.main
        className={cn(
          // relative + z-10 creates a stacking context that sits above the
          // fixed Three.js canvas background, preventing the dynamically-loaded
          // WebGL layer from ever painting over the page text.
          "relative z-10 min-h-screen px-8 pb-8 pt-24",
          fullWidth && "px-8",
          className
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.6,
          ease: [0.4, 0, 0.2, 1] as const,
        }}
      >
        <div className={cn(
          "mx-auto",
          !fullWidth && "max-w-6xl"
        )}>
          {children}
        </div>
      </motion.main>
    </div>
  );
}
