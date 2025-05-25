"use client"

import type React from "react"

import { useEffect, useState, useRef, useMemo } from "react"
import { AnimatedGroup } from "@/components/ui/animated-group"

interface MasonryGridProps {
  children: React.ReactNode[]
  columns?: number
  gap?: number
  className?: string
}

export default function MasonryGrid({ children, columns = 3, gap = 16, className = "" }: MasonryGridProps) {
  const gridRef = useRef<HTMLDivElement>(null)
  const [items, setItems] = useState<React.ReactNode[][]>([])
  const [isClient, setIsClient] = useState(false)

  // Handle client-side rendering
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Distribute items into columns
  useEffect(() => {
    if (!isClient) return

    const newItems: React.ReactNode[][] = Array(columns)
      .fill([])
      .map(() => [])
    const heights = Array(columns).fill(0)

    // Simple algorithm to distribute items
    children.forEach((child) => {
      // Find the column with the smallest height
      const minHeightIndex = heights.indexOf(Math.min(...heights))

      // Add the item to that column
      newItems[minHeightIndex] = [...newItems[minHeightIndex], child]

      // Update the height (just an approximation)
      // For images, we'll use a random height factor to create the masonry effect
      const heightFactor = Math.random() * 0.5 + 0.75 // Random between 0.75 and 1.25
      heights[minHeightIndex] += heightFactor
    })

    setItems(newItems)
  }, [children, columns, isClient])

  // Memoize the grid style to prevent unnecessary recalculations
  const gridStyle = useMemo(() => {
    return {
      display: "grid",
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: `${gap}px`,
    }
  }, [columns, gap])

  if (!isClient) {
    return null // Return nothing during SSR
  }

  return (
    <div ref={gridRef} className={`grid ${className}`} style={gridStyle}>
      {items.map((columnItems, columnIndex) => (
        <div key={columnIndex} className="flex flex-col space-y-4">
          <AnimatedGroup preset="slide" className="space-y-4">
            {columnItems}
          </AnimatedGroup>
        </div>
      ))}
    </div>
  )
}
