"use client"

import { useEffect } from "react"

export default function ScrollDetector() {
  useEffect(() => {
    let scrollTimer: NodeJS.Timeout | null = null
    const body = document.body

    // Function to handle scroll events with throttling
    const handleScroll = () => {
      // Only add class if it's not already present
      if (!body.classList.contains("is-scrolling")) {
        body.classList.add("is-scrolling")
      }

      // Clear any existing timer
      if (scrollTimer) {
        clearTimeout(scrollTimer)
      }

      // Set a timer to hide the scrollbar after scrolling stops
      scrollTimer = setTimeout(() => {
        body.classList.remove("is-scrolling")
      }, 1000) // Hide scrollbar after 1 second of inactivity
    }

    // Add scroll event listener with passive flag for better performance
    window.addEventListener("scroll", handleScroll, { passive: true })

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (scrollTimer) {
        clearTimeout(scrollTimer)
      }
    }
  }, [])

  // This component doesn't render anything visible
  return null
}
