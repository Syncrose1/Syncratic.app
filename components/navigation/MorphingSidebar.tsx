"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNavigation } from "@/lib/data";
import { setPageTheme, type Theme } from "@/lib/utils";

export function MorphingSidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
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
    <motion.aside 
      className="fixed right-0 top-0 z-50 h-screen"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      initial={false}
      animate={{ width: isExpanded ? 180 : 64 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <nav className="flex h-full w-full flex-col">
        {mainNavigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.id} 
              href={item.href}
              className="group relative flex h-[20%] w-full items-center border-l border-white/5 transition-colors duration-300 hover:bg-white/[0.04]"
              style={{
                backgroundColor: isActive ? "rgba(255, 255, 255, 0.06)" : "rgba(255, 255, 255, 0.02)",
              }}
            >
              {/* Glass effect */}
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

              {/* Content - changes based on expanded state */}
              <div className="relative z-10 flex w-full items-center px-5">
                {/* Icon */}
                <motion.div
                  animate={{
                    color: isActive ? getAccentColor() : "rgba(255, 255, 255, 0.6)",
                  }}
                >
                  <Icon className="h-5 w-5" />
                </motion.div>

                {/* Label - horizontal when expanded */}
                <motion.span 
                  className="ml-3 whitespace-nowrap text-sm font-medium"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ 
                    opacity: isExpanded ? 1 : 0,
                    x: isExpanded ? 0 : -10,
                    color: isActive ? getAccentColor() : "#ffffff",
                  }}
                  transition={{ duration: 0.2, delay: isExpanded ? 0.1 : 0 }}
                >
                  {item.label}
                </motion.span>
              </div>
            </Link>
          );
        })}
      </nav>
    </motion.aside>
  );
}
