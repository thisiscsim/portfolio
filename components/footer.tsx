"use client"

import VisitorLocation from "@/components/ui/visitor-location"

export default function Footer() {
  return (
    <footer className="px-10 py-6 flex justify-between items-center text-text-secondary text-sm">
      {/* Credit line */}
      <div>Christopher Sim — © 2025</div>

      {/* Visitor location */}
      <div>
        Last visitor from <VisitorLocation />
      </div>
    </footer>
  )
}
