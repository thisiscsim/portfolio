"use client"

import { useEffect, useState, useRef, useMemo } from "react"
import { STYLES } from "@/constants"
import { FadeIn } from "@/components/ui/fade-in"
import ScrambleText from "@/components/ui/scramble-text"
import MasonryGrid from "@/components/ui/masonry-grid"
import MasonryImage from "@/components/ui/masonry-image"

// Sample image data with different aspect ratios to create the masonry effect
const imageData = [
  {
    src: "/dark-mode-ui.png",
    alt: "UI Design Interface",
    width: 800,
    height: 600,
  },
  {
    src: "/mobile-app-wireframe.png",
    alt: "Mobile App Wireframe",
    width: 600,
    height: 800,
  },
  {
    src: "/dashboard-analytics-dark.png",
    alt: "Dashboard Analytics",
    width: 800,
    height: 500,
  },
  {
    src: "/calendar-interface-dark-mode.png",
    alt: "Calendar Interface",
    width: 800,
    height: 700,
  },
  {
    src: "/task-management-app-interface.png",
    alt: "Task Management App",
    width: 600,
    height: 900,
  },
  {
    src: "/dark-data-visualization.png",
    alt: "Data Visualization",
    width: 800,
    height: 600,
  },
  {
    src: "/placeholder.svg?height=800&width=800&query=User profile settings page",
    alt: "User Profile Settings",
    width: 800,
    height: 800,
  },
  {
    src: "/placeholder.svg?height=500&width=800&query=Notification center UI dark",
    alt: "Notification Center",
    width: 800,
    height: 500,
  },
  {
    src: "/placeholder.svg?height=700&width=600&query=Form design with validation",
    alt: "Form Design",
    width: 600,
    height: 700,
  },
]

export default function CraftPage() {
  // Track if this component has been mounted before
  const hasMounted = useRef(false)

  // State to track if the page has loaded (for animations)
  const [isLoaded, setIsLoaded] = useState(false)

  // Set isLoaded to true after a short delay to ensure synchronized animations
  useEffect(() => {
    // Only trigger animations on first mount
    if (!hasMounted.current) {
      hasMounted.current = true

      // Small delay to ensure all components are mounted before animations start
      const timer = setTimeout(() => {
        setIsLoaded(true)
      }, 100)

      return () => clearTimeout(timer)
    } else {
      // If not first mount, just set loaded to true immediately
      setIsLoaded(true)
    }
  }, [])

  // Memoize the image components to prevent unnecessary re-renders
  const imageComponents = useMemo(() => {
    return imageData.map((image, index) => (
      <MasonryImage key={index} src={image.src} alt={image.alt} width={image.width} height={image.height} />
    ))
  }, [])

  return (
    <>
      {/* Craft Introduction */}
      <section className="w-full">
        <div className="mx-auto max-w-[872px] py-8">
          <ScrambleText text="Craft" className={STYLES.titleClass} delay={100} />
          <FadeIn delay={2}>
            <p className="mt-2 text-text-primary">
              Infrequent thoughts on design, the future, current state of society, and life. These are in no way
              representative of my employer and are strictly my personal opinions. I use Notion as the CMS, and the list
              here updates automatically through the Notion API.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Masonry Grid with Images */}
      <section className="w-full">
        <div className="mx-auto py-8 px-10">
          <FadeIn delay={6}>
            <MasonryGrid columns={3} gap={16}>
              {imageComponents}
            </MasonryGrid>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
