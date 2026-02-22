import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx for conditional classes with tailwind-merge for deduplication
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Theme type for page theming
 */
export type Theme = "home" | "about" | "projects" | "research" | "contact";

/**
 * Sets the theme on the document body
 * Used for page-specific accent color theming
 */
export function setPageTheme(theme: Theme) {
  if (typeof document !== "undefined") {
    document.body.setAttribute("data-theme", theme);
  }
}

/**
 * Animation variants for Framer Motion
 */
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

export const slideInFromLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export const slideInFromRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

/**
 * Stagger animation container
 */
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

/**
 * Spring animation config for fluid feel
 */
export const fluidSpring = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

/**
 * Ease curves for consistent animations
 */
export const easeOut = [0.4, 0, 0.2, 1];
export const easeInOut = [0.4, 0, 0.2, 1];
export const easeIn = [0.4, 0, 1, 1];
