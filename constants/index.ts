/**
 * This file contains constant values used throughout the application.
 * Centralizing constants makes it easier to update values in one place.
 */

/**
 * Navigation items for the header
 * Each item has a path (URL) and a label (display text)
 */
export const NAV_ITEMS = [
  { path: "/", label: "[0] Index", key: "0" },
  { path: "/craft", label: "[1] Craft", key: "1" },
  { path: "/writing", label: "[2] Writing", key: "2" },
]

/**
 * Categories for journal entries
 * Used for filtering in the journal page
 */
export const JOURNAL_CATEGORIES = ["All", "Design", "Career", "Personal", "Tech", "Politics", "Code", "Interaction"]

/**
 * Common styling constants
 */
export const STYLES = {
  // Border style used throughout the site (now empty)
  borderStyle: "",

  // Title class for section headers
  titleClass: "text-text-secondary text-sm mb-1",

  // Link style with permanent dotted underline
  linkStyle: "border-b border-dotted border-text-primary cursor-pointer",

  // Content max width
  contentMaxWidth: "max-w-[872px]",
}
