"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const projects = [
  {
    title: "Feel CV",
    tags: ["Python", "OpenAI", "LangChain"],
    year: "2024",
    href: "https://github.com/cytric-74/feel-cv",
  },
  {
    title: "Audio Sentimental Prediction",
    tags: ["React", "D3.js", "Python"],
    year: "2024",
    href: "https://github.com/cytric-74/audio-sentiment",
  },
  {
    title: "GTA6 Sale Prediction",
    tags: ["Python", "Tableau", "spaCy", "ARIMA"],
    year: "2023",
    href: "https://github.com/cytric-74/gta6-sale-prediction",
  },
  {
    title: "Stock Market Prediction",
    tags: ["Tableau", "Docker", "TensorFlow", "PostgreSQL"],
    year: "2023",
    href: "https://github.com/cytric-74/stock-market-prediction",
  },
]

export function Works() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="works" className="relative py-32 px-8 md:px-12 md:py-24">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-24"
      >
        <p className="font-mono text-sm tracking-[0.3em] text-muted-foreground mb-4">
          03 — SELECTED WORKS
        </p>

        <h2 className="font-sans text-3xl md:text-5xl font-light italic text-blue-200">
          The Distortion Gallery
        </h2>
      </motion.div>

      {/* Projects List */}
      <div className="relative">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="relative border-t border-white/10 py-8 md:py-12"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="group flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              {/* Year */}
              <span className="font-mono text-xs text-muted-foreground tracking-widest order-1 md:order-none">
                {project.year}
              </span>

              {/* Title */}
              <motion.h3
                className="flex-1 font-sans text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-white group-hover:text-[#2563eb] transition-colors duration-150"
                animate={{
                  x: hoveredIndex === index ? 20 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              >
                {project.title}
              </motion.h3>

              {/* Tags */}
              <div className="flex gap-2 flex-wrap order-2 md:order-none">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] tracking-wider px-3 py-1 border border-white/20 rounded-full text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          </motion.div>
        ))}
      </div>

      {/* Bottom Border */}
      <div className="border-t border-white/10" />
    </section>
  )
}