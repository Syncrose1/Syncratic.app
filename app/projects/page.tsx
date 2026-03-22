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
          className="mb-8 text-4xl font-light text-white sm:text-5xl md:text-6xl lg:text-7xl"
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
                    <div className="flex flex-col justify-between p-5 sm:p-6 lg:p-8">
                      <div>
                        {/* Header */}
                        <div className="mb-4 sm:mb-6 flex items-center justify-between">
                          <div className="flex items-center gap-3 sm:gap-4">
                            <div
                              className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl flex-shrink-0"
                              style={{
                                backgroundColor: `${project.accentColor}20`,
                                color: project.accentColor,
                              }}
                            >
                              <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                            </div>
                            
                            <div className="min-w-0">
                              <h2 className="text-xl sm:text-2xl font-medium text-white truncate"
                              >
                                {project.title}
                              </h2>
                              <div className="flex items-center gap-2 flex-wrap"
                              >
                                {isInDevelopment && (
                                  <span className="rounded-full bg-yellow-500/20 px-2 py-0.5 text-xs text-yellow-400"
                                  >
                                    In Dev
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
                        <p className="mb-4 sm:mb-6 text-base sm:text-lg leading-relaxed text-[var(--text-secondary)]"
                        >
                          {project.longDescription}
                        </p>

                        {/* Tech Stack */}
                        <div className="mb-4 sm:mb-6">
                          <h4 className="mb-2 sm:mb-3 text-xs sm:text-sm font-medium text-[var(--text-muted)] uppercase tracking-wider"
                          >
                            Tech Stack
                          </h4>
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {project.techStack.map((tech, idx) => (
                              <span
                                key={tech}
                                className={`rounded-full bg-white/5 px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm text-[var(--text-secondary)] ${idx >= 4 ? 'hidden sm:inline-block' : ''}`}
                              >
                                {tech}
                              </span>
                            ))}
                            {project.techStack.length > 4 && (
                              <span className="rounded-full bg-white/5 px-2 py-0.5 text-xs text-[var(--text-secondary)] sm:hidden">
                                +{project.techStack.length - 4}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Features Preview - Hidden on mobile */}
                        <div className="mb-6 sm:mb-8 hidden sm:block">
                          <ul className="space-y-2">
                            {project.features.slice(0, 3).map((feature) => (
                              <li
                                key={feature}
                                className="flex items-center gap-2 text-[var(--text-secondary)] text-sm"
                              >
                                <div
                                  className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                                  style={{ backgroundColor: project.accentColor }}
                                />
                                <span className="line-clamp-1">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 sm:gap-4">
                        <Link
                          href={`/projects/${project.id}`}
                          className="group/btn inline-flex items-center gap-1.5 sm:gap-2 rounded-lg px-3 sm:px-4 py-2 text-sm font-medium text-white transition-all"
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
                            className="inline-flex items-center gap-1.5 sm:gap-2 rounded-lg border border-[var(--glass-border)] px-3 sm:px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition-all hover:border-[var(--glass-border-hover)] hover:text-white"
                          >
                            <span className="hidden sm:inline">Visit Site</span>
                            <span className="sm:hidden">Visit</span>
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Visual Side */}
                    <div className="relative min-h-[180px] sm:min-h-[240px] lg:min-h-0 bg-gradient-to-br from-white/5 to-transparent p-5 sm:p-6 lg:p-8"
                    >
                      {/* Project screenshot or placeholder */}
                      {project.id === "medtracker" ? (
                        <div className="absolute inset-4 rounded-xl overflow-hidden">
                          <img
                            src="/MedTracker_screenshot.png"
                            alt="MedTracker Screenshot"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : project.id === "blockout" ? (
                        <div className="absolute inset-4 rounded-xl overflow-hidden">
                          <img
                            src="/BlockOut_screenshot.png"
                            alt="BlockOut Screenshot"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : project.id === "labs" ? (
                        <div className="absolute inset-4 rounded-xl overflow-hidden">
                          <img
                            src="/Labs.png"
                            alt="Syncratic Labs Screenshot"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : project.id === "increment" ? (
                        <div className="absolute inset-4 rounded-xl overflow-hidden">
                          <img
                            src="/Increment_Screenshot.png"
                            alt="Increment Screenshot"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : project.id === "binder" ? (
                        <div className="absolute inset-4 rounded-xl overflow-hidden">
                          <img
                            src="/Binder_Screenshot.png"
                            alt="Binder Screenshot"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div
                          className="absolute inset-4 rounded-xl border border-dashed border-[var(--glass-border)] flex items-center justify-center"
                          style={{
                            background: `linear-gradient(135deg, ${project.accentColor}10 0%, transparent 50%)`,
                          }}
                        >
                          <div className="text-center">
                            <Icon
                              className="mx-auto mb-2 sm:mb-4 h-10 w-10 sm:h-16 sm:w-16 opacity-30"
                              style={{ color: project.accentColor }}
                            />
                            <p className="text-xs sm:text-sm text-[var(--text-muted)]">
                              {project.shortName} Preview
                            </p>
                          </div>
                        </div>
                      )}

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
