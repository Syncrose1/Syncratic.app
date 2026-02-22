"use client";

import { motion } from "framer-motion";
import { PageContainer } from "@/components/layout/PageContainer";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { GlassCard } from "@/components/ui/GlassCard";
import { Code2, Heart, Microscope, Lightbulb } from "lucide-react";

/**
 * About Page - The Observer
 * 
 * A personal introduction page that tells the story of who I am,
 * combining my medical background with my passion for development.
 */

export default function AboutPage() {
  const skills = [
    {
      category: "Medical",
      items: ["Clinical Medicine", "Medical Education", "Patient Care", "Research"],
      icon: Heart,
      color: "var(--accent-human)",
    },
    {
      category: "Development",
      items: ["React/Next.js", "TypeScript", "Python", "AI/ML Integration"],
      icon: Code2,
      color: "var(--accent-tech)",
    },
    {
      category: "Research",
      items: ["Medical AI", "EdTech", "Data Analysis", "Clinical Studies"],
      icon: Microscope,
      color: "var(--accent-discovery)",
    },
    {
      category: "Interests",
      items: ["UI/UX Design", "Productivity", "Open Source", "Teaching"],
      icon: Lightbulb,
      color: "var(--accent-primary)",
    },
  ];

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
          <span className="text-sm font-medium tracking-widest uppercase"
          style={{ color: "var(--accent-human)" }}>
            The Observer
          </span>
        </motion.div>

        <AnimatedText
          text="About Me"
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
          <p className="mb-6 text-lg leading-relaxed text-[var(--text-secondary)]">
            I'm a medical student with a passion for building digital tools that make a difference. 
            My journey bridges two worlds: the precision and empathy required in medicine, and the 
            creativity and problem-solving of software development.
          </p>
          <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
            I believe that technology, when thoughtfully designed, can enhance human capabilities 
            rather than replace them. My work focuses on creating tools that help medical students 
            learn more effectively, clinicians work more efficiently, and patients receive better care.
          </p>
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="mb-4 text-3xl font-light text-white">Philosophy</h2>
          <div className="h-1 w-20 rounded-full"
          style={{ backgroundColor: "var(--accent-human)" }} />
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <GlassCard className="h-full p-8" hover>
              <h3 className="mb-4 text-xl font-medium text-white">Medicine Meets Code</h3>
              <p className="leading-relaxed text-[var(--text-secondary)]">
                The practice of medicine and the art of programming share common threads: attention 
                to detail, systematic thinking, and a deep desire to solve problems. I bring the 
                clinical mindset to my development work—always considering the human at the other end.
              </p>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <GlassCard className="h-full p-8" hover>
              <h3 className="mb-4 text-xl font-medium text-white">Building for Impact</h3>
              <p className="leading-relaxed text-[var(--text-secondary)]">
                Every project I undertake is driven by a simple question: <em>How can this help?</em> 
                Whether it's helping medical students track their progress or creating tools that 
                visualize complex data, I aim to build things that matter.
              </p>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="mb-4 text-3xl font-light text-white">Skills & Expertise</h2>
          <div className="h-1 w-20 rounded-full"
          style={{ backgroundColor: "var(--accent-human)" }} />
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlassCard className="h-full p-6" hover>
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg"
                      style={{
                        backgroundColor: `${skill.color}20`,
                        color: skill.color,
                      }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-medium text-white">{skill.category}</h3>
                  </div>
                  
                  <ul className="space-y-2">
                    {skill.items.map((item) => (
                      <li
                        key={item}
                        className="text-sm text-[var(--text-secondary)]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="mb-4 text-3xl font-light text-white">The Journey</h2>
          <div className="h-1 w-20 rounded-full"
          style={{ backgroundColor: "var(--accent-human)" }} />
        </motion.div>

        <div className="space-y-8">
          {[
            {
              year: "2019",
              title: "Started Medical School",
              description: "Began the journey into medicine, discovering the intersection of science and human care.",
            },
            {
              year: "2020",
              title: "First Code",
              description: "Started learning to code as a way to solve problems I encountered in my studies.",
            },
            {
              year: "2022",
              title: "MedTracker Launch",
              description: "Released the first version of MedTracker to help fellow students track their progress.",
            },
            {
              year: "2023",
              title: "Expanding the Ecosystem",
              description: "Built BlockOut and began work on Increment, exploring new ways to visualize and organize information.",
            },
            {
              year: "2024",
              title: "The Future",
              description: "Continuing to bridge medicine and technology, exploring AI integration in healthcare tools.",
            },
          ].map((milestone, index) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex gap-6"
            >
              <div className="flex flex-col items-center">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full text-sm font-medium text-white"
                  style={{ backgroundColor: "var(--accent-human)" }}
                >
                  {milestone.year.slice(-2)}
                </div>
                {index < 4 && (
                  <div className="mt-2 h-full w-px bg-[var(--glass-border)]" />
                )}
              </div>
              
              <GlassCard className="flex-1 p-6" hover>
                <div className="mb-2 text-sm font-medium"
                style={{ color: "var(--accent-human)" }}>
                  {milestone.year}
                </div>
                <h3 className="mb-2 text-lg font-medium text-white">
                  {milestone.title}
                </h3>
                <p className="text-[var(--text-secondary)]">{milestone.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
