"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNavigation } from "@/lib/data";
import { cn, setPageTheme, type Theme } from "@/lib/utils";

/**
 * MorphingSidebar Navigation Component
 * 
 * A unique sidebar that morphs between collapsed and expanded states.
 * When collapsed: Shows minimal icons with subtle indicators
 * When expanded: Reveals labels, descriptions, and enhanced visual effects
 * 
 * Features:
 * - Smooth morphing animations using Framer Motion
 * - Theme-aware accent colors that change per page
 * - Glassmorphism styling with backdrop blur
 * - Hover-triggered expansion
 * - Active state highlighting with glow effects
 */

export function MorphingSidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
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

  // Get accent color based on current theme
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

  const getGlowColor = () => {
    switch (currentTheme) {
      case "home":
        return "var(--accent-primary-glow)";
      case "about":
        return "var(--accent-human-glow)";
      case "projects":
        return "var(--accent-tech-glow)";
      case "research":
        return "var(--accent-discovery-glow)";
      case "contact":
        return "var(--accent-contact-glow)";
      default:
        return "var(--accent-primary-glow)";
    }
  };

  return (
    <motion.aside
      className="fixed left-0 top-0 z-50 h-screen"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      initial={false}
      animate={{
        width: isExpanded ? 280 : 80,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
      }}
    >
      {/* Glass Background */}
      <motion.div
        className="absolute inset-0 glass"
        style={{
          borderRight: `1px solid var(--glass-border)`,
        }}
        animate={{
          backgroundColor: isExpanded
            ? "rgba(255, 255, 255, 0.05)"
            : "rgba(255, 255, 255, 0.02)",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Ambient Glow Effect */}
      <motion.div
        className="absolute -right-20 top-1/4 h-64 w-64 rounded-full"
        style={{
          background: `radial-gradient(circle, ${getGlowColor()} 0%, transparent 70%)`,
          filter: "blur(40px)",
        }}
        animate={{
          opacity: isExpanded ? 0.6 : 0.3,
          scale: isExpanded ? 1.2 : 1,
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Navigation Content */}
      <div className="relative flex h-full flex-col py-8">
        {/* Logo/Brand Area */}
        <div className="mb-12 px-6">
          <Link href="/" className="flex items-center gap-3">
            <motion.div
              className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{
                background: `linear-gradient(135deg, ${getAccentColor()}, transparent)`,
                border: `1px solid ${getAccentColor()}`,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-lg font-semibold text-white">S</span>
            </motion.div>
            
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-lg font-medium text-white">Syncratic</span>
                </motion.div>
              )}
            </AnimatePresence>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4">
          <ul className="space-y-2">
            {mainNavigation.map((item, index) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={item.href} className="block">
                    <motion.div
                      className={cn(
                        "group relative flex items-center gap-4 rounded-xl px-4 py-3 transition-colors",
                        isActive
                          ? "bg-white/5"
                          : "hover:bg-white/[0.03]"
                      )}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Active Indicator */}
                      {isActive && (
                        <motion.div
                          className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full"
                          style={{ backgroundColor: getAccentColor() }}
                          layoutId="activeIndicator"
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}

                      {/* Icon */}
                      <motion.div
                        className="flex h-10 w-10 items-center justify-center rounded-lg"
                        style={{
                          color: isActive ? getAccentColor() : "var(--text-secondary)",
                        }}
                        animate={{
                          color: isActive ? getAccentColor() : "var(--text-secondary)",
                        }}
                      >
                        <Icon className="h-5 w-5" />
                      </motion.div>

                      {/* Expanded Content */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            className="flex flex-col overflow-hidden"
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <span
                              className={cn(
                                "whitespace-nowrap text-sm font-medium transition-colors",
                                isActive
                                  ? "text-white"
                                  : "text-[var(--text-secondary)] group-hover:text-white"
                              )}
                            >
                              {item.label}
                            </span>
                            <span className="whitespace-nowrap text-xs text-[var(--text-muted)]">
                              {item.description}
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Hover Glow Effect */}
                      <motion.div
                        className="absolute inset-0 rounded-xl opacity-0 transition-opacity group-hover:opacity-100"
                        style={{
                          background: `linear-gradient(90deg, ${getGlowColor()} 0%, transparent 100%)`,
                        }}
                      />
                    </motion.div>
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </nav>

        {/* Footer Area */}
        <div className="px-6 pt-8">
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <div className="h-px bg-gradient-to-r from-transparent via-[var(--glass-border)] to-transparent" />
                <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                  <span>Medical Student</span>
                  <span>&</span>
                  <span>Developer</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Collapse/Expand Indicator */}
      <motion.div
        className="absolute -right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full glass"
        style={{ borderColor: getAccentColor() }}
        animate={{
          rotate: isExpanded ? 180 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <div
          className="h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: getAccentColor() }}
        />
      </motion.div>
    </motion.aside>
  );
}
