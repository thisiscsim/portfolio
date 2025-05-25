"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface MasonryImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
}

export default function MasonryImage({ src, alt, width, height, className = "" }: MasonryImageProps) {
  const aspectRatio = width / height

  return (
    <motion.div
      className={`overflow-hidden bg-bg-secondary rounded-md ${className}`}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative" style={{ width: "100%", paddingBottom: `${(1 / aspectRatio) * 100}%` }}>
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          loading="lazy"
        />
      </div>
    </motion.div>
  )
}
