"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface AnimatedTextProps {
  text: string
  className?: string
  once?: boolean
  delay?: number
}

export function AnimatedText({ text, className = "", once = true, delay = 0 }: AnimatedTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once })

  // Split text into words, but limit to 15 words max to reduce animation overhead
  const words = text.split(" ").slice(0, 15)

  // Variants for the container
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // Reduced from 0.12
        delayChildren: delay * 0.1,
      },
    }),
  }

  // Variants for each word - simplified animation
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200, // Increased for faster animation
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200, // Increased for faster animation
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden ${className}`}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {words.map((word, index) => (
        <motion.span key={index} className="mr-1 inline-block" variants={child}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}
