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
    <aside className="fixed right-0 top-0 z-50 h-screen w-16">
      <div className="grid h-full grid-rows-5">
        {mainNavigation.map((item, index) => {
          const isActive = pathname === item.href;
          const isHovered = hoveredIndex === index;
          const Icon = item.icon;
          
          return (
            <Link key={item.id} href={item.href} className="relative block w-full">
              <motion.div
                className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-2 border-l border-white/10"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                animate={{
                  width: isHovered ? 140 : 64,
                  backgroundColor: isActive
                    ? "rgba(255, 255, 255, 0.08)"
                    : isHovered
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(255, 255, 255, 0.02)",
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
                style={{
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }}
              >
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    className="absolute left-0 top-0 h-full w-[2px]"
                    style={{ backgroundColor: getAccentColor() }}
                    layoutId="activeIndicator"
                  />
                )}

                {/* Hover highlight */}
                <motion.div
                  className="absolute inset-0"
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  style={{
                    background: `linear-gradient(90deg, ${getAccentColor()}10, transparent)`,
                  }}
                />

                {/* Icon */}
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

                {/* Vertical Label */}
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
              </motion.div>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
