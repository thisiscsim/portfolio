"use client"

import { useEffect, useRef } from "react"
import { useScramble } from "use-scramble"

interface ScrambleTextProps {
  text: string
  className?: string
  delay?: number
}

export default function ScrambleText({ text, className = "", delay = 0 }: ScrambleTextProps) {
  const hasAnimated = useRef(false)

  const { ref, replay } = useScramble({
    text,
    speed: 0.6,
    tick: 1,
    step: 1,
    scramble: 4,
    seed: 0,
    chance: 0.8,
    overdrive: false,
  })

  useEffect(() => {
    if (!hasAnimated.current) {
      const timer = setTimeout(() => {
        replay()
        hasAnimated.current = true
      }, delay)

      return () => clearTimeout(timer)
    }
  }, [delay, replay])

  return <span ref={ref} className={className}></span>
}
