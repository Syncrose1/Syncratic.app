"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNavigation } from "@/lib/data";
import { setPageTheme, type Theme } from "@/lib/utils";

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
      case "home": return "var(--accent-primary)";
      case "about": return "var(--accent-human)";
      case "projects": return "var(--accent-tech)";
      case "research": return "var(--accent-discovery)";
      case "contact": return "var(--accent-contact)";
      default: return "var(--accent-primary)";
    }
  };

  return (
    <aside className="fixed right-0 top-0 z-50 h-screen">
      <nav className="flex h-full w-16 flex-col">
        {mainNavigation.map((item, index) => {
          const isActive = pathname === item.href;
          const isHovered = hoveredIndex === index;
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.id} 
              href={item.href}
              className="relative flex h-1/5 w-full items-center justify-center border-l border-white/5"
              style={{
                backgroundColor: isActive
                  ? "rgba(255, 255, 255, 0.06)"
                  : "rgba(255, 255, 255, 0.02)",
                backdropFilter: "blur(12px)",
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  className="absolute left-0 top-0 h-full w-[2px]"
                  style={{ backgroundColor: getAccentColor() }}
                  layoutId="activeIndicator"
                />
              )}

              {/* Hover overlay - expands outward without affecting layout */}
              <motion.div 
                className="absolute right-0 top-0 h-full"
                initial={false}
                animate={{
                  width: isHovered ? 140 : 64,
                  backgroundColor: isHovered ? "rgba(255, 255, 255, 0.04)" : "transparent",
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
                style={{
                  background: isHovered ? `linear-gradient(90deg, ${getAccentColor()}08, transparent)` : undefined,
                }}
              />

              {/* Content - always centered */}
              <div className="relative z-10 flex flex-col items-center justify-center gap-2">
                <motion.div
                  animate={{
                    scale: isHovered ? 1.1 : 1,
                    color: isActive 
                      ? getAccentColor() 
                      : isHovered 
                      ? "#ffffff" 
                      : "rgba(255, 255, 255, 0.6)",
                  }}
                >
                  <Icon className="h-5 w-5" />
                </motion.div>

                <span 
                  className="whitespace-nowrap text-[10px] font-medium uppercase tracking-wider"
                  style={{ 
                    color: isActive ? getAccentColor() : "rgba(255, 255, 255, 0.7)",
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                  }}
                >
                  {item.label}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
