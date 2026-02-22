"use client";

import { useState, useEffect } from "react";
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
              className="group relative flex h-1/5 w-full items-center justify-center overflow-hidden border-l border-white/5 transition-all duration-300"
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
                <div
                  className="absolute left-0 top-0 h-full w-[2px]"
                  style={{ backgroundColor: getAccentColor() }}
                />
              )}

              {/* Hover background */}
              <div 
                className="absolute inset-0 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(90deg, ${getAccentColor()}08, transparent)`,
                  opacity: isHovered ? 1 : 0,
                }}
              />

              {/* Expanding container */}
              <div 
                className="relative z-10 flex flex-col items-center justify-center gap-3 transition-all duration-300"
                style={{
                  width: isHovered ? 120 : 64,
                }}
              >
                {/* Icon */}
                <div
                  className="transition-all duration-300"
                  style={{
                    transform: isHovered ? "scale(1.1)" : "scale(1)",
                    color: isActive 
                      ? getAccentColor() 
                      : isHovered 
                      ? "#ffffff" 
                      : "rgba(255, 255, 255, 0.6)",
                  }}
                >
                  <Icon className="h-5 w-5" />
                </div>

                {/* Label - vertical */}
                <span 
                  className="whitespace-nowrap text-[10px] font-medium uppercase tracking-wider transition-colors duration-300"
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
