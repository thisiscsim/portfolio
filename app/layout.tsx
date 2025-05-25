import type React from "react"
import { Geist_Mono } from "next/font/google"
import "./globals.css"
import { berkeleyMono } from "./fonts"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import KeyboardShortcuts from "@/components/ui/keyboard-shortcuts"
import { MotionProvider } from "@/components/motion-provider"
import { ThemeProvider } from "@/components/theme-provider"
import ScrollDetector from "@/components/ui/scroll-detector"

// Import and configure the Geist Mono font
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
})

export const metadata = {
  title: "Portfolio 2025",
  description: "A retro-style portfolio site",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistMono.variable} ${berkeleyMono.variable} font-mono text-md`}>
        <ThemeProvider>
          <MotionProvider>
            <ScrollDetector />
            <div className="min-h-screen flex flex-col bg-bg-primary text-text-primary">
              {/* Skip to content link for accessibility */}
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-bg-secondary focus:text-text-primary"
              >
                Skip to content
              </a>

              {/* Keyboard shortcuts handler */}
              <KeyboardShortcuts />

              {/* Outer container with max-width and side borders */}
              <div className="mx-auto max-w-[1320px] relative flex flex-col flex-grow w-full">
                {/* Left border - now removed */}
                <div className="absolute top-0 left-0 h-full"></div>

                {/* Right border - now removed */}
                <div className="absolute top-0 right-0 h-full"></div>

                {/* Navigation - now inside the max-width container */}
                <Navigation />

                {/* Main Content */}
                <main id="main-content" className="flex-grow flex flex-col">
                  {children}
                </main>

                {/* Footer */}
                <Footer />
              </div>
            </div>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
