"use client";

import { motion } from "framer-motion";
import { PageContainer } from "@/components/layout/PageContainer";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { GlassCard } from "@/components/ui/GlassCard";
import { socialLinks } from "@/lib/data";
import { Mail, Github, Linkedin, MapPin } from "lucide-react";

/**
 * Contact Page
 * 
 * A clean, elegant contact page with social links and a contact form.
 */

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "raahat.shah@gmail.com",
      href: "mailto:raahat.shah@gmail.com",
      description: "For general inquiries and collaborations",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "@Syncrose1",
      href: socialLinks.github,
      description: "Explore my code and projects",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Raahat Shah",
      href: "https://www.linkedin.com/in/raahat-shah",
      description: "Professional profile and updates",
    },
  ];

  return (
    <PageContainer>
      {/* Hero Section */}
      <section className="pt-8 md:pt-16 pb-12 md:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <span
            className="text-sm font-medium tracking-widest uppercase"
            style={{ color: "var(--accent-contact)" }}
          >
            Get in Touch
          </span>
        </motion.div>

        <AnimatedText
          text="Get in Touch"
          type="chars"
          animation="fadeUp"
          delay={0.2}
          staggerDelay={0.04}
          className="mb-4 md:mb-6 text-4xl font-light text-white sm:text-5xl md:text-6xl lg:text-7xl"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-8 max-w-3xl"
        >
          <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
            Have a question, idea, or just want to say hello? I&apos;d love to hear from you. 
            Whether you&apos;re interested in collaborating on a project, discussing research, 
            or just connecting, feel free to reach out.
          </p>
        </motion.div>
      </section>

      {/* Contact Methods - Responsive Grid */}
      <section className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="mb-4 text-2xl font-light text-white">Connect</h2>
          <div
            className="h-1 w-16 rounded-full"
            style={{ backgroundColor: "var(--accent-contact)" }}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <motion.a
                key={method.label}
                href={method.href}
                target={method.href.startsWith("http") ? "_blank" : undefined}
                rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="block"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlassCard
                  className="group h-full flex flex-col items-center text-center p-6 transition-all"
                  hover
                >
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-xl mb-4 transition-colors"
                    style={{
                      backgroundColor: "rgba(226, 232, 240, 0.1)",
                    }}
                  >
                    <Icon className="h-6 w-6 text-[var(--accent-contact)]" />
                  </div>
                  
                  <div className="font-medium text-white mb-1">{method.label}</div>
                  <div className="text-sm text-[var(--text-secondary)] mb-2">
                    {method.value}
                  </div>
                  
                  <p className="text-xs text-[var(--text-muted)]">
                    {method.description}
                  </p>
                </GlassCard>
              </motion.a>
            );
          })}
        </div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 max-w-md mx-auto md:max-w-none"
        >
          <GlassCard className="p-4 md:w-fit md:mx-auto">
            <div className="flex items-center justify-center gap-3">
              <MapPin className="h-5 w-5 text-[var(--accent-contact)]" />
              <span className="text-[var(--text-secondary)]">
                Based in United Kingdom
              </span>
            </div>
          </GlassCard>
        </motion.div>
      </section>

      {/* Closing Section */}
      <section className="py-16 md:py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard className="mx-auto max-w-2xl p-8 md:p-12" glow="subtle">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full"
              style={{
                background: `radial-gradient(circle, var(--accent-contact) 0%, transparent 70%)`,
              }}
            >
              <Mail className="h-6 w-6 text-white" />
            </motion.div>
            
            <p className="mb-4 text-xl text-white">Looking forward to hearing from you</p>
            
            <p className="text-[var(--text-muted)]">
              Whether it's a collaboration, a question, or just to connect—I'm all ears.
            </p>
          </GlassCard>
        </motion.div>
      </section>
    </PageContainer>
  );
}
