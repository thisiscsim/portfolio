"use client"

import type React from "react"

import { useRef, useEffect, useState, useMemo } from "react"
import { FadeIn } from "@/components/ui/fade-in"
import { AnimatedGroup } from "@/components/ui/animated-group"

interface CompanySectionProps {
  date: string
  company: string
  projects: React.ReactNode[]
  delay?: number
}

export default function CompanySection({ date, company, projects, delay = 0 }: CompanySectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const [isSticky, setIsSticky] = useState(false)

  // Set up intersection observer to detect when section is in view
  useEffect(() => {
    if (!sectionRef.current || !infoRef.current) return

    const handleScroll = () => {
      if (!sectionRef.current || !infoRef.current) return

      const scrollY = window.scrollY
      const sectionRect = sectionRef.current.getBoundingClientRect()
      const infoHeight = infoRef.current.offsetHeight

      // Calculate when to start and stop sticking
      const sectionTop = sectionRect.top + scrollY
      const sectionBottom = sectionRect.bottom + scrollY
      const shouldStick = scrollY > sectionTop && scrollY < sectionBottom - infoHeight

      setIsSticky(shouldStick)
    }

    // Initial check
    handleScroll()

    // Add scroll listener with passive flag for better performance
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [])

  // Memoize the container variants to prevent unnecessary recalculations
  const containerVariants = useMemo(() => {
    return {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: delay * 0.1 + 0.3,
        },
      },
    }
  }, [delay])

  // Memoize the item variants to prevent unnecessary recalculations
  const itemVariants = useMemo(() => {
    return {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          type: "spring",
          bounce: 0.1,
        },
      },
    }
  }, [])

  return (
    <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-0 mb-16">
      {/* Left column - Company info */}
      <div className="relative">
        <div ref={infoRef} className={`${isSticky ? "md:sticky" : ""} md:top-8`} style={{ height: "fit-content" }}>
          <FadeIn delay={delay}>
            <div>
              <p className="text-text-secondary text-sm">{date}</p>
            </div>
          </FadeIn>
          <FadeIn delay={delay + 1}>
            <div>
              <p className="text-text-primary font-medium">{company}</p>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Right column - Projects */}
      <div className="space-y-12">
        <AnimatedGroup
          className="space-y-12"
          variants={{
            container: containerVariants,
            item: itemVariants,
          }}
        >
          {projects}
        </AnimatedGroup>
      </div>
    </div>
  )
}
