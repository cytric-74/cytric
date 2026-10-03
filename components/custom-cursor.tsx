"use client"

import { useEffect, useState } from "react"
import { motion, useSpring } from "framer-motion"

const hoverTargets = "a, button, [data-cursor-hover]"
const dotSpring = { stiffness: 300, damping: 20, mass: 0.4 }
const ringSpring = { stiffness: 300, damping: 20, mass: 0.8 }

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const dotX = useSpring(-6, dotSpring)
  const dotY = useSpring(-6, dotSpring)
  const ringX = useSpring(-24, ringSpring)
  const ringY = useSpring(-24, ringSpring)

  useEffect(() => {
    let lastPointerType = "mouse"
    const isTouchInput = () => lastPointerType === "touch"

    const isHoverTarget = (target: EventTarget | null) =>
      target instanceof Element && target.closest(hoverTargets) !== null

    const moveTo = (x: number, y: number) => {
      dotX.set(x - 6)
      dotY.set(y - 6)
      ringX.set(x - 24)
      ringY.set(y - 24)
    }

    const jumpTo = (x: number, y: number) => {
      dotX.jump(x - 6)
      dotY.jump(y - 6)
      ringX.jump(x - 24)
      ringY.jump(y - 24)
    }

    const handlePointerType = (e: PointerEvent) => {
      lastPointerType = e.pointerType
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (isTouchInput()) return
      moveTo(e.clientX, e.clientY)
      setIsVisible(true)
    }

    const handleMouseEnter = () => {
      if (!isTouchInput()) setIsVisible(true)
    }

    const handleMouseLeave = () => {
      if (!isTouchInput()) setIsVisible(false)
    }

    const handleHoverStart = (e: MouseEvent) => {
      if (isTouchInput()) return
      if (isHoverTarget(e.target)) {
        setIsHovering(true)
      }
    }

    const handleHoverEnd = (e: MouseEvent) => {
      if (isTouchInput()) return
      if (isHoverTarget(e.target)) {
        setIsHovering(false)
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      lastPointerType = "touch"
      const touch = e.touches[0]
      jumpTo(touch.clientX, touch.clientY)
      setIsHovering(isHoverTarget(e.target))
      setIsVisible(true)
    }

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0]
      moveTo(touch.clientX, touch.clientY)
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (e.touches.length === 0) {
        setIsVisible(false)
      }
    }

    window.addEventListener("pointerdown", handlePointerType)
    window.addEventListener("pointermove", handlePointerType)
    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseover", handleHoverStart)
    document.addEventListener("mouseout", handleHoverEnd)
    window.addEventListener("touchstart", handleTouchStart, { passive: true })
    window.addEventListener("touchmove", handleTouchMove, { passive: true })
    window.addEventListener("touchend", handleTouchEnd, { passive: true })
    window.addEventListener("touchcancel", handleTouchEnd, { passive: true })

    return () => {
      window.removeEventListener("pointerdown", handlePointerType)
      window.removeEventListener("pointermove", handlePointerType)
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseover", handleHoverStart)
      document.removeEventListener("mouseout", handleHoverEnd)
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
      window.removeEventListener("touchcancel", handleTouchEnd)
    }
  }, [dotX, dotY, ringX, ringY])

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[10000] mix-blend-difference"
        style={{ x: dotX, y: dotY }}
        animate={{
          scale: isHovering ? 0 : 5,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.4 }}
      />
      {/* Hover ring */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border border-white rounded-full pointer-events-none z-[10000] mix-blend-difference"
        style={{ x: ringX, y: ringY }}
        animate={{
          scale: isHovering ? 1 : 0,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.8 }}
      />
    </>
  )
}
