"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { PageContainer } from "@/components/layout/PageContainer";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { GlassCard } from "@/components/ui/GlassCard";
import { Code2, Heart, Microscope, Lightbulb, GraduationCap } from "lucide-react";
import { useRef, useEffect, useState } from "react";

/**
 * FloatingIcon Component
 * 
 * An icon that moves away from the mouse cursor and springs back to origin.
 */
function FloatingIcon({ 
  src, 
  alt, 
  className, 
  style, 
  initialRotate,
  containerRef 
}: { 
  src: string; 
  alt: string; 
  className: string; 
  style: React.CSSProperties;
  initialRotate: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const iconRef = useRef<HTMLDivElement>(null);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useMotionValue(initialRotate);
  
  const springConfig = { damping: 20, stiffness: 300 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const springRotate = useSpring(rotate, springConfig);

  useEffect(() => {
    if (iconRef.current && containerRef.current) {
      const rect = iconRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      setOrigin({
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top + rect.height / 2
      });
    }
  }, [containerRef]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - containerRect.left;
      const mouseY = e.clientY - containerRect.top;
      
      const dx = mouseX - origin.x;
      const dy = mouseY - origin.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      const repelRadius = 150;
      const repelStrength = 80;
      
      if (distance < repelRadius && distance > 0) {
        const force = (1 - distance / repelRadius) * repelStrength;
        const angle = Math.atan2(dy, dx);
        
        x.set(-Math.cos(angle) * force);
        y.set(-Math.sin(angle) * force);
        rotate.set(initialRotate + (Math.random() - 0.5) * 10);
      } else {
        x.set(0);
        y.set(0);
        rotate.set(initialRotate);
      }
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
      rotate.set(initialRotate);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [origin, x, y, rotate, initialRotate, containerRef]);

  return (
    <motion.div
      ref={iconRef}
      className={className}
      style={{
        ...style,
        x: springX,
        y: springY,
        rotate: springRotate,
      }}
      whileHover={{ scale: 1.1 }}
    >
      <img 
        src={src} 
        alt={alt}
        className="w-full h-full drop-shadow-2xl"
      />
    </motion.div>
  );
}

/**
 * About Page
 * 
 * A personal introduction page that tells the story of who I am,
 * combining my medical background with my passion for development.
 */

export default function AboutPage() {
  const visualsRef = useRef<HTMLDivElement>(null);
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
      items: ["Medical AI", "EdTech", "Ophthalmology", "Clinical Studies"],
      icon: Microscope,
      color: "var(--accent-discovery)",
    },
    {
      category: "Background",
      items: ["Pharmaceutical Chemistry", "First Class Honours", "QMUL"],
      icon: GraduationCap,
      color: "var(--accent-primary)",
    },
    {
      category: "Interests",
      items: ["Ophthalmology", "Productivity", "Open Source", "Teaching"],
      icon: Lightbulb,
      color: "var(--accent-discovery)",
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
            About Me
          </span>
        </motion.div>

        <AnimatedText
          text="About Me"
          type="chars"
          animation="fadeUp"
          delay={0.2}
          staggerDelay={0.04}
          className="mb-8 text-4xl font-light text-white sm:text-5xl md:text-6xl lg:text-7xl"
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Text Content - Takes up 3 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="lg:col-span-3 max-w-3xl"
          >
            <p className="mb-6 text-lg leading-relaxed text-[var(--text-secondary)]">
              I'm a medical student with a passion for building digital tools that make a difference. 
              My journey bridges three worlds: the analytical precision of pharmaceutical chemistry, 
              the empathy and problem-solving required in medicine, and the creativity and utility of software development.
            </p>
            <p className="mb-6 text-lg leading-relaxed text-[var(--text-secondary)]">
              I believe that technology, when thoughtfully designed, can enhance human capabilities 
              rather than replace them. My work focuses on creating tools that help medical students 
              learn more effectively, and for planners to organise more efficiently. I hope to engage 
              more closely with the NHS to develop tools and conduct research that benefits patient care 
              and empowers clinicians.
            </p>
            <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
              With deep proficiency in AI tools and a solid understanding of AI systems architecture, 
              I bring a unique perspective to medical AI research. I actively work with large language 
              models, machine learning frameworks, and AI-assisted development workflows—bridging the 
              gap between cutting-edge AI capabilities and real-world clinical applications. I'm particularly 
              interested in collaborating on research that explores how AI can augment clinical decision-making, 
              streamline healthcare workflows, and ultimately improve patient outcomes.
            </p>
          </motion.div>

          {/* Visual Elements - Takes up 2 columns */}
          <motion.div
            ref={visualsRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="lg:col-span-2 relative h-[400px] lg:h-[500px]"
          >
            {/* Flask - Chemistry */}
            <FloatingIcon
              src="/Flask.svg"
              alt="Chemistry Flask"
              className="absolute top-8 left-4 w-32 h-32 cursor-pointer"
              style={{ filter: 'brightness(0) saturate(100%) invert(77%) sepia(28%) saturate(555%) hue-rotate(179deg) brightness(93%) contrast(92%)' }}
              initialRotate={-12}
              containerRef={visualsRef}
            />

            {/* Stethoscope - Medicine */}
            <FloatingIcon
              src="/Stethoscope.svg"
              alt="Stethoscope"
              className="absolute top-24 right-4 w-36 h-36 cursor-pointer"
              style={{ filter: 'brightness(0) saturate(100%) invert(73%) sepia(37%) saturate(628%) hue-rotate(312deg) brightness(101%) contrast(96%)' }}
              initialRotate={18}
              containerRef={visualsRef}
            />

            {/* Programming - Code */}
            <FloatingIcon
              src="/Programming.svg"
              alt="Programming"
              className="absolute bottom-8 left-12 w-28 h-28 cursor-pointer"
              style={{ filter: 'brightness(0) saturate(100%) invert(80%) sepia(19%) saturate(709%) hue-rotate(203deg) brightness(94%) contrast(88%)' }}
              initialRotate={-22}
              containerRef={visualsRef}
            />
          </motion.div>
        </div>
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
                Every project I undertake is driven by a simple question: <em>How can this help?</em>{" "}
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

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
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
      <section className="py-12 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-12"
        >
          <h2 className="mb-4 text-2xl md:text-3xl font-light text-white">The Journey</h2>
          <div className="h-1 w-20 rounded-full"
          style={{ backgroundColor: "var(--accent-human)" }} />
        </motion.div>

        {/* Mobile: Horizontal scroll layout */}
        <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4">
          <div className="flex gap-4" style={{ width: "max-content" }}>
            {[
              {
                year: "2016",
                title: "First Code",
                description: "Started learning Python, GML (GameMaker Language), and C# for Unity—driven by a passion for game development and the desire to bring creative ideas to life through code.",
              },
              {
                year: "2020",
                title: "BSc Pharmaceutical Chemistry",
                description: "Began studying Pharmaceutical Chemistry at Queen Mary's University of London. This chemistry-focused degree provided a strong foundation in analytical thinking and molecular science.",
              },
              {
                year: "2023",
                title: "Graduate Entry Medicine",
                description: "Achieved First Class Honours and transitioned to the 4-year Graduate Entry Medicine program at the University of Southampton. Projected graduation in 2027.",
              },
              {
                year: "2025",
                title: "MedTracker Launch",
                description: "Released MedTracker—a UKMLA-based medical education tracker providing a ticklist version of the UKMLA content map.",
              },
              {
                year: "2026",
                title: "BlockOut & Increment",
                description: "Launched BlockOut—a WinDirStat-inspired task visualiser. Increment is being rebuilt as a web-first application with AI-powered features.",
              },
            ].map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-[280px] flex-shrink-0"
              >
                <GlassCard className="h-full p-5" hover>
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium text-white flex-shrink-0"
                      style={{ backgroundColor: "var(--accent-human)" }}
                    >
                      {milestone.year.slice(-2)}
                    </div>
                    <div className="text-sm font-medium"
                    style={{ color: "var(--accent-human)" }}>
                      {milestone.year}
                    </div>
                  </div>
                  <h3 className="mb-2 text-base font-medium text-white">
                    {milestone.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{milestone.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop: Timeline layout */}
        <div className="hidden md:block space-y-8">
          {[
            {
              year: "2016",
              title: "First Code",
              description: "Started learning Python, GML (GameMaker Language), and C# for Unity—driven by a passion for game development and the desire to bring creative ideas to life through code.",
            },
            {
              year: "2020",
              title: "BSc Pharmaceutical Chemistry",
              description: "Began studying Pharmaceutical Chemistry at Queen Mary's University of London. This chemistry-focused degree (with pharmaceutical specialisation in later years) provided a strong foundation in analytical thinking and molecular science—skills that translate remarkably well to both medicine and software architecture.",
            },
            {
              year: "2023",
              title: "Graduate Entry Medicine",
              description: "Achieved First Class Honours in Pharmaceutical Chemistry and immediately transitioned to the 4-year Graduate Entry Medicine program at the University of Southampton. Projected graduation in 2027.",
            },
            {
              year: "2025",
              title: "MedTracker Launch",
              description: "Released MedTracker in Q3 2025—a UKMLA-based medical education tracker that provides a ticklist version of the UKMLA content map, born from my own need to systematically track and organise my medical knowledge.",
            },
            {
              year: "2026",
              title: "BlockOut & Increment",
              description: "Launched BlockOut in Q1 2026—a WinDirStat-inspired task visualiser. Increment is currently being rebuilt from the ground up as a web-first application with refined architecture and AI-powered features.",
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
