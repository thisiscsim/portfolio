"use client"

import { useTheme } from "@/components/theme-provider"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="inline-flex items-center justify-center bg-bg-secondary text-text-primary px-[4px] py-[2px] text-sm tracking-[-0.3px] leading-none font-normal hover:bg-bg-tertiary transition-colors duration-200 rounded-[3px] cursor-pointer"
      aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
    >
      {theme === "light" ? <Moon size={14} /> : <Sun size={14} />}
    </button>
  )
}
