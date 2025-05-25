"use client"

import { useEffect, useRef, useCallback } from "react"
import { useScramble } from "use-scramble"

interface ScrambleTextProps {
  text: string
  className?: string
  delay?: number
}

export default function ScrambleText({ text, className = "", delay = 0 }: ScrambleTextProps) {
  const hasAnimated = useRef(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

  const { ref, replay } = useScramble({
    text,
    speed: 0.6,
    tick: 1,
    step: 1,
    scramble: 4,
    seed: 0,
    chance: 0.8,
    overdrive: false,
    overflow: true,
  })

  const startAnimation = useCallback(() => {
    if (!hasAnimated.current) {
      timeoutRef.current = setTimeout(() => {
        replay()
        hasAnimated.current = true
      }, delay)
    }
  }, [delay, replay])

  useEffect(() => {
    startAnimation()
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [startAnimation])

  return (
    <span 
      ref={ref} 
      className={className}
      style={{ 
        willChange: 'transform, opacity',
        backfaceVisibility: 'hidden'
      }}
    />
  )
}
