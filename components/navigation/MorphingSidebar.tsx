"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNavigation } from "@/lib/data";
import { setPageTheme, type Theme } from "@/lib/utils";

export function MorphingSidebar() {
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
      <div className="flex h-full flex-col">
        {mainNavigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.id} 
              href={item.href}
              className="group relative flex h-[20%] w-full items-center justify-center border-l border-white/5 transition-colors duration-300 hover:bg-white/[0.04]"
              style={{
                backgroundColor: isActive ? "rgba(255, 255, 255, 0.06)" : "rgba(255, 255, 255, 0.02)",
              }}
            >
              {/* Glass effect overlay */}
              <div 
                className="pointer-events-none absolute inset-0"
                style={{ backdropFilter: "blur(12px)" }}
              />

              {/* Active indicator */}
              {isActive && (
                <div
                  className="absolute left-0 top-0 h-full w-[2px]"
                  style={{ backgroundColor: getAccentColor() }}
                />
              )}

              {/* Hover indicator */}
              <div 
                className="absolute left-0 top-0 h-full w-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ backgroundColor: getAccentColor() }}
              />

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center justify-center gap-2">
                <div
                  className="transition-all duration-300 group-hover:scale-110"
                  style={{
                    color: isActive ? getAccentColor() : "rgba(255, 255, 255, 0.6)",
                  }}
                >
                  <Icon className="h-5 w-5" />
                </div>

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
      </div>
    </aside>
  );
}
