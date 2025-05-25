/**
 * KeyboardShortcuts Component
 *
 * This component adds keyboard navigation shortcuts to the application.
 * It listens for key presses and navigates to the corresponding page.
 */

"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { NAV_ITEMS } from "@/constants"

export default function KeyboardShortcuts() {
  // Next.js router for programmatic navigation
  const router = useRouter()

  // Set up keyboard event listener
  useEffect(() => {
    // Function to handle keydown events
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if the user is typing in an input field or textarea
      const activeElement = document.activeElement
      const isInputActive =
        activeElement instanceof HTMLInputElement ||
        activeElement instanceof HTMLTextAreaElement ||
        activeElement?.isContentEditable

      // Don't trigger shortcuts if user is typing in a form field
      if (isInputActive) return

      // Get the pressed key
      const pressedKey = event.key

      // Find the navigation item that matches the pressed key
      const navItem = NAV_ITEMS.find((item) => item.key === pressedKey)

      // If a matching navigation item was found, navigate to its path
      if (navItem) {
        router.push(navItem.path)
      }
    }

    // Add event listener when component mounts
    window.addEventListener("keydown", handleKeyDown)

    // Clean up event listener when component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [router]) // Re-run effect if router changes

  // This component doesn't render anything visible
  return null
}
