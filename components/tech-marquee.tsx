"use client"

import { motion } from "framer-motion"

const techItems = [
  "PYTHON",
  "MYSQL",
  "TYPESCRIPT",
  "PYTORCH",
  "TABLEAU",
  "LANGCHAIN",
  "JAVASCRIPT",
  "REACT",
  "POSTMAN",
]

const concepts = [
  "DATA ANALYTICS",
  "MLops",
  "NLP LLMops",
  "DATA ORCHESTRATION",
  "CFD",
  "DATA STRUCTURES",
  "SYSTEM ARCHITECTURE",
  "NEURAL NETWORKS",
  "ENTROPY",
  "SYSTEM PIPELINE",
  "TENSOR",
]

function MarqueeRow({ items, direction = "left" }: { items: string[]; direction?: "left" | "right" }) {
  const duplicatedItems = [...items, ...items, ...items, ...items]

  return (
    <div className="relative overflow-hidden py-4">
      <motion.div
        className={`flex gap-8 ${direction === "left" ? "animate-marquee-left" : "animate-marquee-right"}`}
        style={{ width: "fit-content" }}
      >
        {duplicatedItems.map((item, index) => (
          <span
            key={index}
            className="group font-sans text-2xl md:text-4xl lg:text-6xl font-light tracking-tight whitespace-nowrap cursor-default"
            style={{
              WebkitTextStroke: "1px rgba(255,255,255,0.3)",
              color: "transparent",
              transition: "all 0.5s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.color = "white"
              ;el.style.setProperty("-webkit-text-stroke", "none")
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.color = "transparent"
              ;el.style.setProperty("-webkit-text-stroke", "1px rgba(255,255,255,0.3)")
            }}
          >
            {item}
            <span className="mx-8 text-white/20">•</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export function TechMarquee() {
  return (
    <section className="relative py-16 overflow-hidden md:py-16">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="px-8 md:px-12 mb-16"
      >
        <p className="font-mono text-base tracking-[0.3em] text-muted-foreground mb-4">04 — TECHNICAL ARSENAL</p>
      </motion.div>

      {/* Marquee Rows */}
      <div className="space-y-4">
        <MarqueeRow items={techItems} direction="left" />
        <MarqueeRow items={concepts} direction="right" />
      </div>
    </section>
  )
}
