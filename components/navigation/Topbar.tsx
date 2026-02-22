"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNavigation } from "@/lib/data";
import { setPageTheme, type Theme } from "@/lib/utils";
import { X } from "lucide-react";

export function Topbar() {
  const [currentTheme, setCurrentTheme] = useState<Theme>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    <>
      <motion.header
        className="fixed left-0 right-0 top-0 z-50 h-20"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
          {/* Logo and Title - clickable on mobile to toggle menu */}
          <div className="flex items-center gap-3">
            <motion.button
              className="flex h-10 w-10 items-center justify-center rounded-xl overflow-hidden md:pointer-events-none"
              style={{
                background: `linear-gradient(135deg, ${getAccentColor()}, transparent)`,
                border: `1px solid ${getAccentColor()}`,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5 text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="logo"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <img 
                      src="/Syncratic-Logo.svg" 
                      alt="Syncratic Logo"
                      className="w-7 h-7 object-contain brightness-0 invert"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
            
            <Link href="/">
              <span className="text-xl font-medium text-white tracking-tight">
                Syncratic
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - hidden on mobile */}
          <nav className="hidden md:flex items-center gap-1">
            {mainNavigation.filter(item => !item.hidden).map((item) => {
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

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Mobile Menu */}
            <motion.nav
              className="fixed top-20 left-0 right-0 z-40 bg-[var(--void)]/95 backdrop-blur-md border-b border-white/10 md:hidden"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="px-6 py-4 space-y-2">
                {mainNavigation.filter(item => !item.hidden).map((item, index) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        className="flex items-center gap-4 px-4 py-3 rounded-lg"
                        style={{
                          backgroundColor: isActive 
                            ? "rgba(255, 255, 255, 0.08)" 
                            : "transparent",
                        }}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Icon 
                          className="h-5 w-5"
                          style={{
                            color: isActive 
                              ? getAccentColor() 
                              : "rgba(255, 255, 255, 0.6)",
                          }}
                        />
                        <span 
                          className="font-medium"
                          style={{
                            color: isActive 
                              ? "#ffffff" 
                              : "rgba(255, 255, 255, 0.8)",
                          }}
                        >
                          {item.label}
                        </span>
                        {isActive && (
                          <div
                            className="ml-auto h-2 w-2 rounded-full"
                            style={{ backgroundColor: getAccentColor() }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
