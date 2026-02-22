"use client";

import { motion } from "framer-motion";
import { MorphingSidebar } from "@/components/navigation/MorphingSidebar";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { cn } from "@/lib/utils";

/**
 * PageContainer Component
 * 
 * Wraps all pages with:
 * - MorphingSidebar navigation
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
      <MorphingSidebar />

      {/* Main Content */}
      <motion.main
        className={cn(
          "min-h-screen pl-8 pt-8 pb-8 pr-20",
          fullWidth && "pr-20",
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
