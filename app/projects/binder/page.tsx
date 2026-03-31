"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { GlassCard } from "@/components/ui/GlassCard";
import { projects } from "@/lib/data";
import { ArrowLeft, ExternalLink, CheckCircle } from "lucide-react";
import { BookOpen } from "lucide-react";

/**
 * Binder Project Detail Page
 */

export default function BinderPage() {
  const project = projects.find((p) => p.id === "binder")!;
  const Icon = BookOpen;
  const accentColor = "#06b6d4";

  return (
    <PageContainer>
      {/* Back Navigation */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="pt-8"
      >
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>
      </motion.div>

      {/* Hero Section */}
      <section className="pt-12 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6"
        >
          <div className="mb-4 flex items-center gap-4">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl"
              style={{
                backgroundColor: `${accentColor}20`,
                color: accentColor,
              }}
            >
              <Icon className="h-8 w-8" />
            </div>
            
            <div>
              <span
                className="text-sm font-medium tracking-widest uppercase"
                style={{ color: accentColor }}
              >
                {project.shortName}
              </span>
              
              <h1 className="text-4xl font-light text-white sm:text-5xl lg:text-6xl">
                {project.title}
              </h1>
            </div>          
          </div>

          <p className="max-w-3xl text-lg leading-relaxed text-[var(--text-secondary)]">
            {project.longDescription}
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-4"
        >
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-base font-medium text-white transition-all hover:opacity-90"
            style={{ backgroundColor: accentColor }}
          >
            Visit Live Site
            <ExternalLink className="h-5 w-5" />
          </a>
        </motion.div>
      </section>

      {/* Preview Section */}
      <section className="py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <GlassCard
            className="relative aspect-video overflow-hidden"
            glow="subtle"
            border
          >
            <img
              src="/Binder_Screenshot.png"
              alt="Binder Screenshot"
              className="h-full w-full object-cover"
            />

            <motion.div
              className="absolute right-1/4 top-1/4 h-64 w-64 rounded-full opacity-30"
              style={{
                background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
                filter: "blur(60px)",
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.4, 0.3],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </GlassCard>
        </motion.div>
      </section>

      {/* Features & Tech Stack Grid */}
      <section className="py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <GlassCard className="h-full p-8" hover>
              <h2 className="mb-6 text-2xl font-medium text-white">Features</h2>
              
              <ul className="space-y-4">
                {project.features.map((feature, index) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle
                      className="mt-0.5 h-5 w-5 shrink-0"
                      style={{ color: accentColor }}
                    />
                    <span className="text-[var(--text-secondary)]">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </GlassCard>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <GlassCard className="h-full p-8" hover>
              <h2 className="mb-6 text-2xl font-medium text-white">Tech Stack</h2>
              
              <div className="grid grid-cols-2 gap-3">
                {project.techStack.map((tech, index) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
                    className="rounded-lg border border-[var(--glass-border)] bg-white/5 px-4 py-3 text-center text-sm text-[var(--text-secondary)] transition-colors hover:border-[var(--glass-border-hover)] hover:text-white"
                  >
                    {tech}
                  </motion.div>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="mb-3 text-sm font-medium text-[var(--text-muted)] uppercase tracking-wider">
                  Tags
                </h3>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/5 px-3 py-1 text-xs text-[var(--text-muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12">
        <div className="flex justify-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Link
              href="/projects/labs"
              className="group flex items-center gap-4 rounded-xl border border-[var(--glass-border)] bg-white/5 p-4 transition-all hover:border-[var(--glass-border-hover)]"
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-lg"
                style={{
                  backgroundColor: "rgba(139, 92, 246, 0.2)",
                  color: "#8b5cf6",
                }}
              >
                <span className="text-lg">L</span>
              </div>
              
              <div>
                <div className="text-xs text-[var(--text-muted)]">Previous</div>
                <div className="font-medium text-white">Labs</div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>
    </PageContainer>
  );
}
