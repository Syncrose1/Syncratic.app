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
 * On hover: bar expands and changes color.
 */

export function MorphingSidebar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [currentTheme, setCurrentTheme] = useState<Theme>("home");
  const pathname = usePathname();

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

  return (
    <motion.aside
      className="fixed right-0 top-0 z-50 h-screen"
      initial={{ x: 100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <nav className="flex h-full flex-col">
        {mainNavigation.map((item, index) => {
          const isActive = pathname === item.href;
          const isHovered = hoveredIndex === index;
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.id} 
              href={item.href} 
              className="flex-1"
              style={{ height: `${100 / mainNavigation.length}%` }}
            >
              <motion.div
                className="relative flex h-full cursor-pointer flex-col items-center justify-center overflow-hidden border-l border-white/10"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                initial={{ width: 80 }}
                animate={{
                  width: isHovered ? 200 : 80,
                  backgroundColor: isActive
                    ? "rgba(255, 255, 255, 0.1)"
                    : isHovered
                    ? "rgba(255, 255, 255, 0.08)"
                    : "rgba(255, 255, 255, 0.03)",
                }}
                transition={{
                  width: { type: "spring", stiffness: 300, damping: 30 },
                  backgroundColor: { duration: 0.2 },
                }}
                style={{
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
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

                {/* Glass shine effect */}
                <div 
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)"
                  }}
                />

                {/* Hover gradient overlay */}
                <motion.div 
                  className="absolute inset-0"
                  animate={{
                    opacity: isHovered ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background: `linear-gradient(90deg, ${getAccentColor()}15 0%, transparent 100%)`,
                  }}
                />

                {/* Content */}
                <div className="relative z-10 flex items-center gap-4 px-5">
                  {/* Icon */}
                  <motion.div
                    animate={{
                      color: isActive 
                        ? getAccentColor() 
                        : isHovered 
                        ? "#ffffff" 
                        : "rgba(255, 255, 255, 0.6)",
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon className="h-6 w-6 shrink-0" />
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
                    transition={{ duration: 0.2, delay: isHovered ? 0.05 : 0 }}
                  >
                    {item.label}
                  </motion.span>
                </div>
              </motion.div>
            </Link>
          );
        })}
      </nav>
    </motion.aside>
  );
}
