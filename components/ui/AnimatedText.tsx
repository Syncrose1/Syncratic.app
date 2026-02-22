"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * AnimatedText Component
 * 
 * Provides various text animation effects including character-by-character,
 * word-by-word, and line-by-line reveals.
 * 
 * @example
 * <AnimatedText 
 *   text="Hello World" 
 *   type="chars" 
 *   animation="fadeUp"
 *   className="text-4xl font-bold"
 * />
 */

interface AnimatedTextProps {
  text: string;
  type?: "chars" | "words" | "lines";
  animation?: "fadeUp" | "fadeIn" | "typewriter";
  delay?: number;
  staggerDelay?: number;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export function AnimatedText({
  text,
  type = "words",
  animation = "fadeUp",
  delay = 0,
  staggerDelay = 0.03,
  className,
  as: Component = "span",
}: AnimatedTextProps) {
  // Split text based on type
  const splitText = () => {
    switch (type) {
      case "chars":
        return text.split("");
      case "words":
        return text.split(" ");
      case "lines":
        return text.split("\n");
      default:
        return text.split(" ");
    }
  };

  const items = splitText();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: staggerDelay,
      },
    },
  };

  const getItemVariants = () => {
    switch (animation) {
      case "fadeUp":
        return {
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.5,
              ease: [0.4, 0, 0.2, 1] as const,
            },
          },
        };
      case "fadeIn":
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              duration: 0.5,
              ease: [0.4, 0, 0.2, 1] as const,
            },
          },
        };
      case "typewriter":
        return {
          hidden: { opacity: 0, width: 0 },
          visible: {
            opacity: 1,
            width: "auto",
            transition: {
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1] as const,
            },
          },
        };
      default:
        return {
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.5,
              ease: [0.4, 0, 0.2, 1] as const,
            },
          },
        };
    }
  };

  const itemVariants = getItemVariants();

  // Get separator based on type
  const getSeparator = () => {
    switch (type) {
      case "chars":
        return "";
      case "words":
        return " ";
      case "lines":
        return "\n";
      default:
        return " ";
    }
  };

  const separator = getSeparator();

  return (
    <Component className={cn("inline-block", className)}>
      <motion.span
        className="inline-flex flex-wrap"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {items.map((item, index) => (
          <motion.span
            key={index}
            variants={itemVariants}
            className="inline-block"
            style={{ whiteSpace: "pre" }}
          >
            {item}
            {index < items.length - 1 && separator}
          </motion.span>
        ))}
      </motion.span>
    </Component>
  );
}

/**
 * Simple fade-in text wrapper for page transitions
 */
export function FadeInText({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
