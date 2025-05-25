"use client"

/**
 * ProjectCard Component
 *
 * This component displays a project card with a title and image.
 * Used in the home page to showcase projects.
 *
 * VARIANTS:
 * - Standard: 284px height (use className="project-card-standard")
 * - Tall: 384px height (use className="project-card-tall")
 */

import Image from "next/image"
import { motion } from "framer-motion"
import type { ProjectCardProps } from "@/types"
import { cn } from "@/lib/utils"

export default function ProjectCard({
  title,
  imageUrl,
  description,
  className = "project-card-standard",
}: ProjectCardProps) {
  // Determine if this is a tall card
  const isTall = className.includes("tall")

  return (
    <motion.div
      className={cn("overflow-hidden group", className)}
      whileHover={{ opacity: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      {/* Project image - height controlled by the parent className */}
      <div
        className="w-full relative bg-bg-secondary rounded-md overflow-hidden"
        style={{ height: isTall ? "384px" : "284px" }}
      >
        <div className="absolute inset-0 bg-text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-10 z-10"></div>
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-opacity duration-200"
          loading="lazy"
        />
      </div>

      {/* Card text content */}
      <div className="pt-2.5 pb-[2px]">
        <p className="text-sm text-text-primary">{title}</p>
        <p className="text-sm text-text-secondary mt-1">{description}</p>
      </div>
    </motion.div>
  )
}
