"use client"

import { motion, useInView } from "framer-motion"
import { type ReactNode, useRef, useMemo } from "react"

interface FadeInProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  distance?: number
  once?: boolean
}

export function FadeIn({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 20,
  once = true,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount: 0.3 }) // Trigger earlier

  // Memoize the initial props to prevent unnecessary recalculations
  const initialProps = useMemo(() => {
    const directionProps = (() => {
      switch (direction) {
        case "up":
          return { transform: `translateY(${distance}px)` }
        case "down":
          return { transform: `translateY(-${distance}px)` }
        case "left":
          return { transform: `translateX(${distance}px)` }
        case "right":
          return { transform: `translateX(-${distance}px)` }
        case "none":
          return {}
        default:
          return { transform: `translateY(${distance}px)` }
      }
    })()

    return {
      opacity: 0,
      ...directionProps,
    }
  }, [direction, distance])

  // Memoize the animation props
  const animateProps = useMemo(() => {
    return isInView
      ? {
          opacity: 1,
          transform: "translate(0, 0)",
          transition: {
            duration: 0.3,
            delay: delay * 0.1,
            ease: "easeOut",
          },
        }
      : initialProps
  }, [isInView, delay, initialProps])

  return (
    <motion.div
      ref={ref}
      initial={initialProps}
      animate={animateProps}
      className={className}
      style={{ 
        border: "none", 
        outline: "none", 
        boxShadow: "none",
        willChange: "transform, opacity"
      }}
    >
      {children}
    </motion.div>
  )
}
