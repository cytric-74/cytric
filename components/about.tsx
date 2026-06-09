"use client"

import { motion } from "framer-motion"

const statements = [
  "Hi! I'm Rohan.",
  "Data Analyst and Developer",
  "I build with logic, aesthetics, and intent.",
  "Every interaction is a conversation.",
]

export function About() {
  const duplicatedStatements = [...statements, ...statements, ...statements]

  return (
    <section id="about" className="relative pt-16 pb-8 overflow-hidden">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="px-8 md:px-12 mb-12"
      >
        <p className="font-mono text-sm tracking-[0.3em] text-muted-foreground mb-4">
          02 — TRYING TO KNOW ME?
        </p>

        <h2 className="font-sans text-3xl md:text-5xl font-light italic">
          Stream of Consciousness
        </h2>
      </motion.div>

      {/* Marquee */}
      <div className="overflow-hidden py-6">
        <motion.div
          className="flex gap-8 animate-marquee-left whitespace-nowrap"
          style={{ width: "fit-content" }}
        >
          {duplicatedStatements.map((statement, index) => (
            <span
              key={index}
              className="
                text-3xl
                md:text-5xl
                lg:text-5xl
                font-light
                text-white/70
                hover:text-white
                transition-colors
                duration-300
              "
            >
              {statement}
              <span className="mx-8 text-white/20">•</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* Decorative Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="mt-8 mx-8 md:mx-12 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent origin-left"
      />
    </section>
  )
}