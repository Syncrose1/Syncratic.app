"use client";

import { motion } from "framer-motion";
import { PageContainer } from "@/components/layout/PageContainer";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { GlassCard } from "@/components/ui/GlassCard";
import { ArrowDown, Sparkles } from "lucide-react";

/**
 * Home Page - The Nexus
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
          <span className="text-sm font-medium tracking-widest text-[var(--accent-primary)] uppercase">
            Welcome to the Nexus
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
          <AnimatedText
            text="Syncratic"
            type="chars"
            animation="fadeUp"
            delay={0.3}
            staggerDelay={0.05}
            className="text-6xl font-light tracking-tight text-white sm:text-7xl lg:text-8xl"
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <p className="mt-4 max-w-2xl text-xl text-[var(--text-secondary)] sm:text-2xl">
              Medical Student & Developer
            </p>
          </motion.div>
        </div>

        {/* Tagline */}
        <motion.p
          className="mb-12 max-w-xl text-lg leading-relaxed text-[var(--text-muted)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          Exploring the intersection of medicine, technology, and human experience. 
          Building tools that bridge the gap between clinical practice and digital innovation.
        </motion.p>

        {/* Quick Stats/Highlights */}
        <motion.div
          className="mb-16 grid grid-cols-1 gap-4 sm:grid-cols-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          {[
            { label: "Projects", value: "3", color: "var(--accent-tech)" },
            { label: "Years Coding", value: "5+", color: "var(--accent-human)" },
            { label: "Passion", value: "∞", color: "var(--accent-discovery)" },
          ].map((stat, index) => (
            <GlassCard
              key={stat.label}
              className="p-6 text-center"
              hover
              glow="subtle"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 1.4 + index * 0.1,
                  type: "spring",
                  stiffness: 200,
                }}
                className="mb-2 text-3xl font-light"
                style={{ color: stat.color }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-[var(--text-muted)]">{stat.label}</div>
            </GlassCard>
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
          <h2 className="mb-4 text-3xl font-light text-white">Featured Systems</h2>
          <p className="mb-12 max-w-2xl text-[var(--text-muted)]">
            Tools and applications built to solve real problems at the intersection of medicine and technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              name: "MedTracker",
              description: "Track clinical rotations and medical education progress",
              color: "var(--accent-tech)",
              href: "/projects/medtracker",
            },
            {
              name: "BlockOut",
              description: "Visual task planning with treemap visualization",
              color: "var(--accent-human)",
              href: "/projects/blockout",
            },
            {
              name: "Increment",
              description: "AI-powered list-based note taking",
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
                className="group relative h-full p-8 transition-all duration-500"
                hover
              >
                {/* Accent Line */}
                <div
                  className="absolute left-0 top-0 h-full w-1 rounded-l-2xl opacity-0 transition-opacity group-hover:opacity-100"
                  style={{ backgroundColor: project.color }}
                />

                <div className="relative z-10">
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
