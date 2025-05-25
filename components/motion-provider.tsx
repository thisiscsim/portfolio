"use client"

import { MotionConfig } from "framer-motion"
import type { ReactNode } from "react"
import { useEffect, useState } from "react"

export function MotionProvider({ children }: { children: ReactNode }) {
  // Default to no reduced motion, then check on client
  const [reducedMotion, setReducedMotion] = useState<"user" | "never">("never")

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    // Set reduced motion based on user preference
    setReducedMotion(prefersReducedMotion ? "user" : "never")

    // Listen for changes in user preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches ? "user" : "never")
    }

    mediaQuery.addEventListener("change", handleChange)

    return () => {
      mediaQuery.removeEventListener("change", handleChange)
    }
  }, [])

  return (
    <MotionConfig
      reducedMotion={reducedMotion}
      transition={{
        duration: 0.3, // Reduced duration for faster animations
        ease: "easeOut",
        // Add this to ensure hover states don't persist
        type: "tween",
      }}
    >
      {children}
    </MotionConfig>
  )
}
