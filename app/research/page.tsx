"use client";

import { motion } from "framer-motion";
import { PageContainer } from "@/components/layout/PageContainer";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { GlassCard } from "@/components/ui/GlassCard";
import { researchItems } from "@/lib/data";
import { FlaskConical, FileText, Clock, CheckCircle2 } from "lucide-react";

/**
 * Research Page - The Discovery
 * 
 * Showcases research involvement, publications, and academic work.
 */

export default function ResearchPage() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ongoing":
        return <Clock className="h-4 w-4 text-blue-400" />;
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-400" />;
      case "published":
        return <FileText className="h-4 w-4 text-purple-400" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "ongoing":
        return "Ongoing";
      case "completed":
        return "Completed";
      case "published":
        return "Published";
      default:
        return status;
    }
  };

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
            style={{ color: "var(--accent-discovery)" }}
          >
            The Discovery
          </span>
        </motion.div>

        <AnimatedText
          text="Research"
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
            Exploring the frontiers of medical knowledge through research. My work focuses 
            on the intersection of artificial intelligence, medical education, and clinical 
            practice—seeking to understand how technology can enhance, not replace, human expertise.
          </p>
        </motion.div>
      </section>

      {/* Research Areas */}
      <section className="py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="mb-4 text-3xl font-light text-white">Research Interests</h2>
          <div
            className="h-1 w-20 rounded-full"
            style={{ backgroundColor: "var(--accent-discovery)" }}
          />
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              title: "Medical AI",
              description: "Investigating how artificial intelligence can assist in diagnosis, treatment planning, and clinical decision-making.",
              icon: FlaskConical,
            },
            {
              title: "EdTech in Medicine",
              description: "Exploring digital tools and platforms that enhance medical education and knowledge retention.",
              icon: FileText,
            },
            {
              title: "Clinical Informatics",
              description: "Studying the intersection of information technology and clinical practice to improve patient outcomes.",
              icon: CheckCircle2,
            },
          ].map((area, index) => {
            const Icon = area.icon;
            return (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlassCard className="h-full p-8" hover>
                  <div
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: "var(--accent-discovery)",
                      opacity: 0.2,
                    }}
                  >
                    <Icon
                      className="h-6 w-6"
                      style={{ color: "var(--accent-discovery)" }}
                    />
                  </div>
                  
                  <h3 className="mb-3 text-xl font-medium text-white"
                  >
                    {area.title}
                  </h3>
                  
                  <p className="text-[var(--text-secondary)]">{area.description}</p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Active Research */}
      <section className="py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="mb-4 text-3xl font-light text-white">Active Research</h2>
          <div
            className="h-1 w-20 rounded-full"
            style={{ backgroundColor: "var(--accent-discovery)" }}
          />
        </motion.div>

        <div className="space-y-6">
          {researchItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassCard className="p-8" hover>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
                >
                  <div className="flex-1">
                    <div className="mb-3 flex flex-wrap items-center gap-3"
                    >
                      <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-[var(--text-muted)]"
                      >
                        {item.category}
                      </span>
                      
                      <span className="text-sm text-[var(--text-muted)]"
                      >
                        {item.year}
                      </span>
                      
                      
                      <div className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1"
                      >
                        {getStatusIcon(item.status)}
                        <span className="text-xs text-[var(--text-secondary)]"
                        >
                          {getStatusText(item.status)}
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="mb-2 text-xl font-medium text-white"
                    >
                      {item.title}
                    </h3>
                    
                    <p className="text-[var(--text-secondary)]">{item.description}</p>
                  </div>

                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-[var(--glass-border)] px-4 py-2 text-sm text-[var(--text-secondary)] transition-all hover:border-[var(--glass-border-hover)] hover:text-white"
                    >
                      View Paper
                    </a>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard className="relative overflow-hidden p-12" glow="strong">
            {/* Decorative background */}
            <div
              className="absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-30"
              style={{
                background: `radial-gradient(circle, var(--accent-discovery) 0%, transparent 70%)`,
                filter: "blur(60px)",
              }}
            />

            <div className="relative z-10">
              <h2 className="mb-6 text-3xl font-light text-white"
              >
                Research Philosophy
              </h2>
              
              <blockquote className="mb-6 text-xl italic leading-relaxed text-[var(--text-secondary)]"
              >
                "The best research happens at the intersection of disciplines, where fresh 
                perspectives meet established knowledge to create something truly innovative."
              </blockquote>
              
              <p className="leading-relaxed text-[var(--text-secondary)]">
                I believe that medical research should be accessible, collaborative, and 
                focused on real-world impact. Whether investigating AI applications in 
                diagnostics or studying the effectiveness of educational technologies, 
                the goal is always the same: to improve human health and wellbeing.
              </p>
            </div>
          </GlassCard>
        </motion.div>
      </section>
    </PageContainer>
  );
}
