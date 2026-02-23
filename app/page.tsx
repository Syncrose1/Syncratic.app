"use client";

import { motion } from "framer-motion";
import { PageContainer } from "@/components/layout/PageContainer";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { GlassCard } from "@/components/ui/GlassCard";
import { ArrowDown, Sparkles } from "lucide-react";

/**
 * Home Page
 * 
 * The landing page that serves as the central hub.
 * Features a stunning hero section with animated text,
 * and quick links to explore the site.
 */

export default function HomePage() {
  return (
    <PageContainer>
      {/* Hero Section */}
      <section className="flex min-h-[90vh] flex-col justify-center">
        {/* Eyebrow */}
        <motion.div
          className="mb-6 flex items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Sparkles className="h-4 w-4 text-[var(--accent-primary)]" />
          <span className="text-sm font-medium tracking-widest text-[var(--accent-primary)] uppercase"
          >
            Welcome to the portfolio of...
          </span>
        </motion.div>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mb-6"
        >
          <img 
            src="/Syncratic-Logo.svg" 
            alt="Syncratic Logo"
            className="w-24 h-16 object-contain brightness-0 invert opacity-90"
          />
        </motion.div>

        {/* Main Title */}
        <div className="mb-8">
          {/* Mobile */}
          <div className="sm:hidden">
            <AnimatedText
              text="Raahat Shah"
              type="chars"
              animation="fadeUp"
              delay={0.3}
              staggerDelay={0.05}
              className="text-4xl font-light tracking-tight text-white"
            />
          </div>
          {/* Desktop */}
          <div className="hidden sm:block">
            <AnimatedText
              text="Raahat Shah"
              type="chars"
              animation="fadeUp"
              delay={0.3}
              staggerDelay={0.05}
              className="text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight text-white"
            />
          </div>
        </div>

        {/* Tagline */}
        <motion.p
          className="mb-12 max-w-2xl text-lg leading-relaxed text-[var(--text-muted)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          Exploring the intersection of medicine, technology, ophthalmology and the mechanisms of learning. Building productivity tools that bridge the gap between clinical practice and digital innovation.
        </motion.p>

        {/* Quick Stats/Highlights */}
        <motion.div
          className="mb-16 flex flex-col gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          {[
            { label: "Public Projects", value: "3", color: "var(--accent-tech)", offset: "ml-0" },
            { label: "Years Coding", value: "8+", color: "var(--accent-human)", offset: "ml-8" },
            { label: "Driven by Curiosity", value: "∞", color: "var(--accent-discovery)", offset: "ml-16" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className={`flex items-center gap-4 ${stat.offset}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 1.4 + index * 0.15,
                duration: 0.5,
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 1.6 + index * 0.15,
                  type: "spring",
                  stiffness: 200,
                }}
                className="text-4xl font-light"
                style={{ color: stat.color }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm font-medium tracking-wider text-[var(--text-muted)] uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <span className="text-xs tracking-widest text-[var(--text-muted)] uppercase">
            Explore
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ArrowDown className="h-5 w-5 text-[var(--text-muted)]" />
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Projects Preview */}
      <section className="py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-3xl font-light text-white">Featured Projects</h2>
          <p className="mb-12 max-w-2xl text-[var(--text-muted)]">
            Tools and applications built to solve real problems at the intersection of medicine, productivity and technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              name: "MedTracker",
              description: "UKMLA-based medical education tracker providing a ticklist version of the UKMLA content map",
              color: "var(--accent-tech)",
              href: "/projects/medtracker",
            },
            {
              name: "BlockOut",
              description: "WinDirStat-inspired task visualiser with daily planning capabilities",
              color: "var(--accent-human)",
              href: "/projects/blockout",
            },
            {
              name: "Increment",
              description: "List-based note taking tool with integrated AI-based task decomposition",
              color: "var(--accent-discovery)",
              href: "/projects/increment",
            },
          ].map((project, index) => (
            <motion.a
              key={project.name}
              href={project.href}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassCard
                className="group relative h-full transition-all duration-500"
                hover
              >
                {/* Accent Line */}
                <div
                  className="absolute left-0 top-0 h-full w-1 rounded-l-2xl opacity-0 transition-opacity group-hover:opacity-100"
                  style={{ backgroundColor: project.color }}
                />
                
                {/* Content with padding */}
                {/* Content with padding */}
                <div className="relative z-10 p-8 pl-10">
                  <h3
                    className="mb-2 text-xl font-medium text-white transition-colors"
                    style={{ color: project.color }}
                  >
                    {project.name}
                  </h3>
                  <p className="text-[var(--text-secondary)]">{project.description}</p>
                </div>

                {/* Hover Glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-30"
                  style={{
                    background: `radial-gradient(circle at center, ${project.color} 0%, transparent 70%)`,
                  }}
                />
              </GlassCard>
            </motion.a>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
