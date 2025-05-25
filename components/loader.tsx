"use client"

import { useState, useEffect, useRef, useCallback } from "react"

interface LoaderProps {
  onLoadComplete: () => void
}

export default function Loader({ onLoadComplete }: LoaderProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [dots, setDots] = useState(0)
  const [showFilledBar, setShowFilledBar] = useState(false)
  const progressAnimationRef = useRef<NodeJS.Timeout | null>(null)

  // ===== CUSTOMIZATION PARAMETERS =====
  // Adjust these values to change the speed of different animations
  const DOT_ANIMATION_SPEED = 200 // Time in ms between dot updates (lower = faster)
  const STEP_COMPLETION_SPEED = 700 // Time in ms for each step to complete (lower = faster)
  const PROGRESS_BAR_FILL_DURATION = 400 // Time in ms to fill the progress bar (higher = slower)
  const PROGRESS_BAR_FILL_STEPS = 3 // Number of steps to animate the progress bar (higher = smoother but potentially slower)
  const FINAL_DELAY_BEFORE_COMPLETE = 300 // Time in ms to wait after progress bar fills before completing
  // ===================================

  // Define our loading steps
  const loadingSteps = [
    "INITIALIZING PORTFOLIO SEQUENCE",
    "LOADING CORE MODULES",
    "RENDERING GRAPHICAL INTERFACE",
    "SCANNING NODES",
  ]

  // Animate the dots for the current step
  useEffect(() => {
    // Only animate if we're not at the end
    if (currentStep >= loadingSteps.length) return

    // Set up the dot animation interval
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev + 1) % 4) // Cycle through 0-3 dots
    }, DOT_ANIMATION_SPEED) // Adjust this value to change dot animation speed

    return () => clearInterval(dotsInterval)
  }, [currentStep, loadingSteps.length, DOT_ANIMATION_SPEED])

  // Handle the progress bar animation
  const animateProgressBar = useCallback(() => {
    // Animate the progress bar filling up
    let currentProgress = 0
    const progressStep = 100 / PROGRESS_BAR_FILL_STEPS
    const stepTime = PROGRESS_BAR_FILL_DURATION / PROGRESS_BAR_FILL_STEPS

    // Clear any existing animation
    if (progressAnimationRef.current) {
      clearInterval(progressAnimationRef.current)
    }

    // Start a new animation
    progressAnimationRef.current = setInterval(() => {
      currentProgress += progressStep

      if (currentProgress >= 100) {
        // Animation complete
        setProgress(100)

        // Clear the interval
        if (progressAnimationRef.current) {
          clearInterval(progressAnimationRef.current)
          progressAnimationRef.current = null
        }

        // Call the completion callback after a short delay
        setTimeout(() => {
          onLoadComplete()
        }, FINAL_DELAY_BEFORE_COMPLETE)
      } else {
        // Update progress
        setProgress(currentProgress)
      }
    }, stepTime)
  }, [PROGRESS_BAR_FILL_DURATION, PROGRESS_BAR_FILL_STEPS, FINAL_DELAY_BEFORE_COMPLETE, onLoadComplete])

  // Handle the loading sequence
  useEffect(() => {
    // If we've completed all steps, start filling the progress bar
    if (currentStep >= loadingSteps.length) {
      setShowFilledBar(true)
      animateProgressBar()

      return () => {
        // Clean up the interval on unmount
        if (progressAnimationRef.current) {
          clearInterval(progressAnimationRef.current)
        }
      }
    }

    // Set timeout for the next step
    const timer = setTimeout(() => {
      setCurrentStep((prev) => prev + 1)
    }, STEP_COMPLETION_SPEED) // Adjust this value to change step completion speed

    return () => clearTimeout(timer)
  }, [currentStep, loadingSteps.length, STEP_COMPLETION_SPEED, animateProgressBar])

  // Create the progress bar
  const totalChars = 40

  // Calculate filled characters based on current progress
  const filledChars = showFilledBar ? Math.floor((progress / 100) * totalChars) : 0
  const emptyChars = totalChars - filledChars
  const progressBar = `[${filledChars > 0 ? "▓".repeat(filledChars) : ""}${emptyChars > 0 ? "⋅".repeat(emptyChars) : ""}]`

  return (
    <div
      className="fixed inset-0 z-50 flex min-h-screen flex-col items-center justify-center p-4 font-mono"
      style={{
        backgroundColor: "#111111",
        color: "#E5E5E5",
        fontSize: "13px",
        lineHeight: "22px",
        letterSpacing: "-0.3px",
      }}
    >
      {/* Fixed width container to prevent layout shifting */}
      <div
        className="flex flex-col space-y-2"
        style={{
          width: "320px",
          minHeight: "150px",
        }}
      >
        {/* Display each loading step with its status */}
        {loadingSteps.map((step, index) => (
          <div key={index} style={{ color: "#E5E5E5" }}>
            {step}{" "}
            {index < currentStep ? (
              <span>[COMPLETE]</span>
            ) : index === currentStep && currentStep < loadingSteps.length ? (
              <span>
                {".".repeat(dots)}
                {"\u00A0".repeat(3 - dots)}
              </span>
            ) : (
              <span>{"\u00A0".repeat(3)}</span>
            )}
          </div>
        ))}

        {/* Progress bar - always visible but fills gradually when all steps are complete */}
        <div
          className="mt-4"
          style={{
            color: "#E5E5E5",
            width: "100%",
          }}
        >
          {progressBar}
        </div>
      </div>
    </div>
  )
}
