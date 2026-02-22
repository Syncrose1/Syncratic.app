"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { GlassCard } from "@/components/ui/GlassCard";
import { projects } from "@/lib/data";
import { ArrowUpRight, ExternalLink } from "lucide-react";

/**
 * Projects Hub Page
 * 
 * A showcase of all projects with visual previews and detailed information.
 * Each project card links to its dedicated detail page.
 */

export default function ProjectsPage() {
  return (
    <PageContainer>
      {/* Hero Section */}
      <section className="pt-16 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <span
            className="text-sm font-medium tracking-widest uppercase"
            style={{ color: "var(--accent-tech)" }}
          >
            My Projects
          </span>
        </motion.div>

        <AnimatedText
          text="Projects"
          type="chars"
          animation="fadeUp"
          delay={0.2}
          staggerDelay={0.04}
          className="mb-8 text-5xl font-light text-white sm:text-6xl lg:text-7xl"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-12 max-w-3xl"
        >
          <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
            A collection of tools and applications built to solve real problems at the 
            intersection of medicine, productivity, and technology. Each project represents 
            a unique approach to visualizing and organizing complex information.
          </p>
        </motion.div>
      </section>

      {/* Projects Grid */}
      <section className="pb-24">
        <div className="grid grid-cols-1 gap-8">
          {projects.map((project, index) => {
            const Icon = project.icon;
            const isInDevelopment = project.status === "development";

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <GlassCard
                  className="group relative overflow-hidden"
                  hover
                  glow="subtle"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Content Side */}
                    <div className="flex flex-col justify-between p-8 lg:p-12">
                      <div>
                        {/* Header */}
                        <div className="mb-6 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div
                              className="flex h-14 w-14 items-center justify-center rounded-xl"
                              style={{
                                backgroundColor: `${project.accentColor}20`,
                                color: project.accentColor,
                              }}
                            >
                              <Icon className="h-7 w-7" />
                            </div>
                            
                            <div>
                              <h2 className="text-2xl font-medium text-white"
                              >
                                {project.title}
                              </h2>
                              <div className="flex items-center gap-2"
                              >
                                {isInDevelopment && (
                                  <span className="rounded-full bg-yellow-500/20 px-2 py-0.5 text-xs text-yellow-400"
                                  >
                                    In Development
                                  </span>
                                )}
                                <span
                                  className="text-sm"
                                  style={{ color: project.accentColor }}
                                >
                                  {project.shortName}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="mb-6 text-lg leading-relaxed text-[var(--text-secondary)]"
                        >
                          {project.longDescription}
                        </p>

                        {/* Tech Stack */}
                        <div className="mb-6">
                          <h4 className="mb-3 text-sm font-medium text-[var(--text-muted)] uppercase tracking-wider"
                          >
                            Tech Stack
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {project.techStack.map((tech) => (
                              <span
                                key={tech}
                                className="rounded-full bg-white/5 px-3 py-1 text-sm text-[var(--text-secondary)]"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Features Preview */}
                        <div className="mb-8">
                          <ul className="space-y-2">
                            {project.features.slice(0, 3).map((feature) => (
                              <li
                                key={feature}
                                className="flex items-center gap-2 text-[var(--text-secondary)]"
                              >
                                <div
                                  className="h-1.5 w-1.5 rounded-full"
                                  style={{ backgroundColor: project.accentColor }}
                                />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-4">
                        <Link
                          href={`/projects/${project.id}`}
                          className="group/btn inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-all"
                          style={{
                            backgroundColor: project.accentColor,
                          }}
                        >
                          Explore
                          <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                        </Link>

                        {!isInDevelopment && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg border border-[var(--glass-border)] px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition-all hover:border-[var(--glass-border-hover)] hover:text-white"
                          >
                            Visit Site
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Visual Side */}
                    <div className="relative min-h-[300px] bg-gradient-to-br from-white/5 to-transparent p-8 lg:min-h-0"
                    >
                      {/* Placeholder for project screenshot */}
                      <div
                        className="absolute inset-4 rounded-xl border border-dashed border-[var(--glass-border)] flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${project.accentColor}10 0%, transparent 50%)`,
                        }}
                      >
                        <div className="text-center">
                          <Icon
                            className="mx-auto mb-4 h-16 w-16 opacity-30"
                            style={{ color: project.accentColor }}
                          />
                          <p className="text-sm text-[var(--text-muted)]">
                            {project.shortName} Preview
                          </p>
                        </div>
                      </div>

                      {/* Decorative Elements */}
                      <motion.div
                        className="absolute right-8 top-8 h-32 w-32 rounded-full opacity-20"
                        style={{
                          background: `radial-gradient(circle, ${project.accentColor} 0%, transparent 70%)`,
                          filter: "blur(40px)",
                        }}
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.2, 0.3, 0.2],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </section>
    </PageContainer>
  );
}
