"use client"

import Image from "next/image"

interface ProjectItemProps {
  title: string
  description: string
  imageUrl: string
  imageAlt?: string
}

export default function ProjectItem({ title, description, imageUrl, imageAlt = "" }: ProjectItemProps) {
  return (
    <div className="space-y-4">
      {/* Project title and description */}
      <div className="space-y-2">
        <h3 className="text-text-primary font-medium">{title}</h3>
        <p className="text-text-secondary">{description}</p>
      </div>

      {/* Project image */}
      <div className="w-full relative bg-bg-secondary rounded-md overflow-hidden">
        <div className="relative w-full" style={{ height: "auto", aspectRatio: "16/9" }}>
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={imageAlt || title}
            fill
            className="object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  )
}
