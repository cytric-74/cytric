"use client"

import { useEffect, useRef } from "react"
import type { PointerEvent } from "react"

type HoverChange = (hovered: boolean, target: HTMLElement) => void

const pressDelay = 150
const tapFlash = 150

export function usePressHover() {
  const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (pressTimer.current) clearTimeout(pressTimer.current)
    }
  }, [])

  return (onHoverChange: HoverChange) => {
    const cancelPress = () => {
      if (!pressTimer.current) return false
      clearTimeout(pressTimer.current)
      pressTimer.current = null
      return true
    }

    return {
      onPointerEnter: (e: PointerEvent<HTMLElement>) => {
        if (e.pointerType !== "touch") onHoverChange(true, e.currentTarget)
      },
      onPointerLeave: (e: PointerEvent<HTMLElement>) => {
        if (e.pointerType !== "touch") onHoverChange(false, e.currentTarget)
      },
      onPointerDown: (e: PointerEvent<HTMLElement>) => {
        if (e.pointerType !== "touch") return
        const target = e.currentTarget
        cancelPress()
        pressTimer.current = setTimeout(() => {
          pressTimer.current = null
          onHoverChange(true, target)
        }, pressDelay)
      },
      onPointerUp: (e: PointerEvent<HTMLElement>) => {
        if (e.pointerType !== "touch") return
        const target = e.currentTarget
        if (cancelPress()) {
          onHoverChange(true, target)
          setTimeout(() => onHoverChange(false, target), tapFlash)
        } else {
          onHoverChange(false, target)
        }
      },
      onPointerCancel: (e: PointerEvent<HTMLElement>) => {
        if (e.pointerType !== "touch") return
        cancelPress()
        onHoverChange(false, e.currentTarget)
      },
    }
  }
}
