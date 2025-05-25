/**
 * This file contains the data for all journal entries.
 * Separating data from components makes the code more maintainable.
 */

import type { JournalEntry } from "@/types"

/**
 * Array of all journal entries
 * Each entry has an id, date, title, and categories
 */
export const journalEntries: JournalEntry[] = [
  { id: 1, date: "2025.3.14", title: "How I built this site", categories: ["Design", "Code", "Tech"] },
  { id: 2, date: "2025.3.14", title: "Reclaiming my health", categories: ["Personal"] },
  {
    id: 3,
    date: "2025.3.14",
    title: "How I prototype and handoff my designs with v0",
    categories: ["Design", "Tech", "Interaction"],
  },
  { id: 4, date: "2025.3.14", title: "Finding my tribe in the Bay Area", categories: ["Personal"] },
  { id: 5, date: "2025.3.14", title: "Chaotic good vs lawfully good", categories: ["Design", "Tech"] },
  { id: 6, date: "2025.3.14", title: "Observations on the changing landscape of design", categories: ["Career"] },
  { id: 7, date: "2025.3.14", title: "Coming out...again", categories: ["Personal"] },
  { id: 8, date: "2025.3.14", title: "Contrarian discussions is healthy for democracy", categories: ["Politics"] },
  { id: 9, date: "2025.3.14", title: "Px vs rem", categories: ["Design", "Code", "Tech"] },
  { id: 10, date: "2025.3.14", title: "Joining Harvey", categories: ["Career", "Tech"] },
  { id: 11, date: "2025.3.14", title: "I'm leaving Arc", categories: ["Career", "Tech"] },
  {
    id: 12,
    date: "2025.3.14",
    title: "What I learned from building a design system from scratch",
    categories: ["Design", "Code", "Tech"],
  },
  {
    id: 13,
    date: "2025.3.14",
    title: "Defense is the next frontier and the U.S. must win it",
    categories: ["Politics", "Tech"],
  },
  { id: 14, date: "2025.3.14", title: "Weddings are fucking expensive", categories: ["Personal"] },
  { id: 15, date: "2025.3.14", title: "First impressions of riding a Waymo", categories: ["Tech"] },
  {
    id: 16,
    date: "2025.3.14",
    title: "How I found a new role in 3 months as a new grad",
    categories: ["Personal", "Career"],
  },
  { id: 17, date: "2025.3.14", title: "Getting laid off from my dream job", categories: ["Personal", "Career"] },
  { id: 18, date: "2025.3.14", title: "Yay, I've Graduated!!!", categories: ["Personal"] },
]
