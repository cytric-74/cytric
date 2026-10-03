"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Works", href: "#works" },
  { label: "Contact", href: "#footer" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : ""
      }`}
    >
      <nav className="flex items-center justify-between gap-3 px-4 py-4 my-0 md:px-12 md:py-5">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
          className="group flex items-center gap-2"
        >
          <span className="font-mono text-nav md:text-xs tracking-widest text-muted-foreground">PORTFOLIO</span>
          <span className="w-1.5 h-1.5 rounded-full bg-accent group-hover:scale-150 group-active:scale-150 transition-transform duration-300" />
        </a>

        {/* Desktop Navigation */}
        <ul className="flex items-center gap-2 md:gap-8">
          {navLinks.map((link, index) => (
            <li key={link.label}>
              <button
                onClick={() => scrollToSection(link.href)}
                className="group relative font-mono text-nav md:text-xs tracking-wider text-muted-foreground hover:text-foreground active:text-foreground transition-colors duration-300"
              >
                <span className="text-accent mr-1">0{index + 1}</span>
                {link.label.toUpperCase()}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground group-hover:w-full group-active:w-full transition-all duration-300" />
              </button>
            </li>
          ))}
        </ul>

        {/* Status Indicator */}
        <div className="flex items-center gap-1.5 md:gap-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          <span className="font-mono text-nav md:text-xs tracking-wider text-muted-foreground text-right">
            AVAILABLE <span className="whitespace-nowrap">FOR WORK</span>
          </span>
        </div>
      </nav>
    </motion.header>
  )
}
