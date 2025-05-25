"use client"

import type React from "react"
import { motion } from "framer-motion"

interface ScrollToProps {
  to: string // ID of the element to scroll to
  offset?: number // Optional offset from the top of the element
  onClick?: () => void // Optional callback
  children: React.ReactNode
}

export default function ScrollTo({ to, offset = 0, onClick, children }: ScrollToProps) {
  const handleClick = () => {
    // Find the target element
    const targetElement = document.getElementById(to)

    // If we found the element, scroll to it
    if (targetElement) {
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }

    // Call the onClick callback if provided
    if (onClick) onClick()
  }

  return (
    <motion.div
      onClick={handleClick}
      whileHover={{ opacity: 0.9 }} // Changed from scale to opacity
      whileTap={{ opacity: 0.8 }} // Changed from scale to opacity
    >
      {children}
    </motion.div>
  )
}
