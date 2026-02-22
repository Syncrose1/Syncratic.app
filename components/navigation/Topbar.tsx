"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNavigation } from "@/lib/data";
import { setPageTheme, type Theme } from "@/lib/utils";

export function Topbar() {
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
    <motion.header
      className="fixed left-0 right-0 top-0 z-50 h-20"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        {/* Logo and Title */}
        <Link href="/" className="flex items-center gap-3">
          <motion.div
            className="flex h-10 w-10 items-center justify-center rounded-xl overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${getAccentColor()}, transparent)`,
              border: `1px solid ${getAccentColor()}`,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img 
              src="/Syncratic-Logo.svg" 
              alt="Syncratic Logo"
              className="w-7 h-7 object-contain brightness-0 invert"
            />
          </motion.div>
          
          <span className="text-xl font-medium text-white tracking-tight">
            Syncratic
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1">
          {mainNavigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.id}
                href={item.href}
                className="group relative px-4 py-2"
              >
                <motion.div
                  className="flex items-center gap-2 rounded-lg px-4 py-2 transition-colors"
                  style={{
                    backgroundColor: isActive 
                      ? "rgba(255, 255, 255, 0.08)" 
                      : "transparent",
                  }}
                  whileHover={{
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    scale: 1.02,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Active indicator dot */}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full"
                      style={{ backgroundColor: getAccentColor() }}
                      layoutId="topbarIndicator"
                    />
                  )}

                  <Icon 
                    className="h-5 w-5 transition-colors duration-200"
                    style={{
                      color: isActive 
                        ? getAccentColor() 
                        : "rgba(255, 255, 255, 0.6)",
                    }}
                  />
                  
                  <span 
                    className="text-sm font-medium transition-colors duration-200"
                    style={{
                      color: isActive 
                        ? "#ffffff" 
                        : "rgba(255, 255, 255, 0.7)",
                    }}
                  >
                    {item.label}
                  </span>
                </motion.div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom border gradient */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
        }}
      />
    </motion.header>
  );
}
