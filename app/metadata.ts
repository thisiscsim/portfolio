import type { Metadata } from "next"

export const baseMetadata: Metadata = {
  title: {
    template: "%s | Portfolio 2025",
    default: "Portfolio 2025",
  },
  description: "Personal portfolio showcasing design and development work",
  keywords: ["portfolio", "design", "development", "interface design", "UX", "UI"],
  authors: [{ name: "Chris" }],
  creator: "Chris",
}

export function generateMetadata({
  title,
  description,
}: {
  title?: string
  description?: string
}): Metadata {
  return {
    ...baseMetadata,
    ...(title && { title }),
    ...(description && { description }),
  }
}
