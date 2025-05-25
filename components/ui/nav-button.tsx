"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface NavButtonProps {
  children: ReactNode
  isActive?: boolean
  onClick?: () => void
  className?: string
  ariaLabel?: string
  ariaPressed?: boolean
  paddingX?: string
  paddingY?: string
  fontSize?: string
  lineHeight?: string
}

export default function NavButton({
  children,
  isActive = false,
  onClick,
  className,
  ariaLabel,
  ariaPressed,
  paddingX = "px-[5px]",
  paddingY = "py-[3px]",
  fontSize = "text-sm",
  lineHeight = "leading-none",
}: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center tracking-[-0.3px] font-normal transition-colors duration-200 rounded-[3px] cursor-pointer",
        paddingX,
        paddingY,
        fontSize,
        lineHeight,
        isActive
          ? "bg-text-primary text-bg-primary" // Active style
          : "bg-bg-secondary text-text-primary hover:bg-bg-tertiary", // Inactive style
        className,
      )}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
    >
      {children}
    </button>
  )
}
