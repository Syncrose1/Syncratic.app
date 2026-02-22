"use client";

import { motion } from "framer-motion";
import { PageContainer } from "@/components/layout/PageContainer";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { GlassCard } from "@/components/ui/GlassCard";
import { socialLinks } from "@/lib/data";
import { Mail, Github, Linkedin, Send, MapPin } from "lucide-react";

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
      <section className="pt-16 pb-24">
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
          className="mb-8 text-5xl font-light text-white sm:text-6xl lg:text-7xl"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-12 max-w-3xl"
        >
          <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
            Have a question, idea, or just want to say hello? I&apos;d love to hear from you. 
            Whether you&apos;re interested in collaborating on a project, discussing research, 
            or just connecting, feel free to reach out.
          </p>
        </motion.div>
      </section>

      <section className="max-w-2xl mx-auto">
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

          <div className="space-y-4">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.a
                  key={method.label}
                  href={method.href}
                  target={method.href.startsWith("http") ? "_blank" : undefined}
                  rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="block"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <GlassCard
                    className="group flex items-center gap-4 p-6 transition-all"
                    hover
                  >
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl transition-colors"
                      style={{
                        backgroundColor: "rgba(226, 232, 240, 0.1)",
                      }}
                    >
                      <Icon className="h-5 w-5 text-[var(--accent-contact)]" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-white">{method.label}</div>
                          <div className="text-sm text-[var(--text-secondary)]">
                            {method.value}
                          </div>
                        </div>
                        <Send className="h-4 w-4 text-[var(--text-muted)] opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                      </div>
                      
                      <p className="mt-1 text-xs text-[var(--text-muted)]">
                        {method.description}
                      </p>
                    </div>
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
            className="mt-8"
          >
            <GlassCard className="p-6">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-[var(--accent-contact)]" />
                <span className="text-[var(--text-secondary)]">
                  Based in United Kingdom
                </span>
              </div>
            </GlassCard>
          </motion.div>
      </section>

      {/* Closing Section */}
      <section className="py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard className="mx-auto max-w-2xl p-12" glow="subtle">
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
