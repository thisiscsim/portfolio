"use client"

import { motion, useInView } from "framer-motion"
import { type ReactNode, useRef, useMemo } from "react"

interface StaggerInProps {
  children: ReactNode[]
  className?: string
  delay?: number
  staggerDelay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  distance?: number
  once?: boolean
}

export function StaggerIn({
  children,
  className = "",
  delay = 0,
  staggerDelay = 0.1,
  direction = "up",
  distance = 20,
  once = true,
}: StaggerInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount: 0.2 }) // Trigger earlier

  // Memoize the direction props to prevent unnecessary recalculations
  const directionProps = useMemo(() => {
    switch (direction) {
      case "up":
        return { y: distance }
      case "down":
        return { y: -distance }
      case "left":
        return { x: distance }
      case "right":
        return { x: -distance }
      case "none":
        return {}
      default:
        return { y: distance }
    }
  }, [direction, distance])

  // Memoize the variants to prevent unnecessary recalculations
  const { container, item } = useMemo(() => {
    return {
      container: {
        hidden: { opacity: 0, ...directionProps },
        show: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay * 0.1,
          },
        },
      },
      item: {
        hidden: { opacity: 0, ...directionProps },
        show: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            type: "spring",
            damping: 20,
            stiffness: 200,
          },
        },
      },
    }
  }, [directionProps, staggerDelay, delay])

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className={`stagger-in-component ${className}`}
      style={{ border: "none", outline: "none", boxShadow: "none" }}
    >
      {Array.isArray(children) &&
        children.map((child, index) => (
          <motion.div key={index} variants={item} style={{ border: "none", outline: "none", boxShadow: "none" }}>
            {child}
          </motion.div>
        ))}
    </motion.div>
  )
}
