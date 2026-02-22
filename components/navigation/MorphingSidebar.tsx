"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNavigation } from "@/lib/data";
import { setPageTheme, type Theme } from "@/lib/utils";

/**
 * RightSidebar Navigation Component
 * 
 * A right-side navigation with translucent full-height bars.
 * Each bar represents a navigation item, divided equally.
 * On hover: bar expands slightly and changes color.
 */

export function MorphingSidebar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [currentTheme, setCurrentTheme] = useState<Theme>("home");
  const pathname = usePathname();

  // Update theme based on current path
  useEffect(() => {
    const currentNav = mainNavigation.find((item) => item.href === pathname);
    if (currentNav) {
      setCurrentTheme(currentNav.theme);
      setPageTheme(currentNav.theme);
    }
  }, [pathname]);

  const getAccentColor = () => {
    switch (currentTheme) {
      case "home":
        return "var(--accent-primary)";
      case "about":
        return "var(--accent-human)";
      case "projects":
        return "var(--accent-tech)";
      case "research":
        return "var(--accent-discovery)";
      case "contact":
        return "var(--accent-contact)";
      default:
        return "var(--accent-primary)";
    }
  };

  // Calculate height percentage for each nav item
  const itemHeight = 100 / mainNavigation.length;

  return (
    <motion.aside
      className="fixed right-0 top-0 z-50 h-screen w-16"
      initial={{ x: 100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <nav className="relative flex h-full flex-col">
        {mainNavigation.map((item, index) => {
          const isActive = pathname === item.href;
          const isHovered = hoveredIndex === index;
          const Icon = item.icon;
          
          return (
            <Link key={item.id} href={item.href} className="flex-1">
              <motion.div
                className="relative flex h-full cursor-pointer flex-col items-center justify-center overflow-hidden border-l border-white/[0.05]"
                style={{
                  backgroundColor: isActive 
                    ? "rgba(255, 255, 255, 0.05)" 
                    : "rgba(255, 255, 255, 0.02)",
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                animate={{
                  width: isHovered ? 180 : 64,
                  backgroundColor: isActive
                    ? "rgba(255, 255, 255, 0.08)"
                    : isHovered
                    ? "rgba(255, 255, 255, 0.06)"
                    : "rgba(255, 255, 255, 0.02)",
                }}
                transition={{
                  width: { type: "spring", stiffness: 300, damping: 30 },
                  backgroundColor: { duration: 0.2 },
                }}
              >
                {/* Active indicator line */}
                {isActive && (
                  <motion.div
                    className="absolute left-0 top-0 h-full w-1"
                    style={{ backgroundColor: getAccentColor() }}
                    layoutId="activeIndicator"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}

                {/* Glass overlay */}
                <div 
                  className="absolute inset-0 backdrop-blur-sm"
                  style={{
                    background: isHovered 
                      ? `linear-gradient(90deg, ${getAccentColor()}10 0%, transparent 100%)`
                      : "transparent"
                  }}
                />

                {/* Content container */}
                <div className="relative z-10 flex items-center gap-3 px-4">
                  {/* Icon */}
                  <motion.div
                    animate={{
                      color: isActive 
                        ? getAccentColor() 
                        : isHovered 
                        ? "#ffffff" 
                        : "var(--text-secondary)",
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                  </motion.div>

                  {/* Label - appears on hover */}
                  <motion.span
                    className="whitespace-nowrap text-sm font-medium"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{
                      opacity: isHovered ? 1 : 0,
                      x: isHovered ? 0 : -10,
                      color: isActive ? getAccentColor() : "#ffffff",
                    }}
                    transition={{ duration: 0.2, delay: isHovered ? 0.1 : 0 }}
                  >
                    {item.label}
                  </motion.span>
                </div>

                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{
                    opacity: isHovered ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background: `linear-gradient(90deg, ${getAccentColor()}08 0%, transparent 100%)`,
                  }}
                />
              </motion.div>
            </Link>
          );
        })}
      </nav>
    </motion.aside>
  );
}
