/**
 * This file contains all of the TypeScript interfaces and types used throughout the application.
 */

/**
 * JournalEntry represents a single blog post in the journal section
 */
export interface JournalEntry {
  id: number // Unique identifier for the entry
  date: string // Publication date in format YYYY.M.D
  title: string // Title of the journal entry
  categories: string[] // Array of categories this entry belongs to
}

/**
 * ProjectCardProps defines the properties required by the ProjectCard component
 */
export interface ProjectCardProps {
  title: string // Title of the project
  imageUrl: string // URL to the project image
  description: string // Description of the project (required)
  className?: string // CSS class for styling variants (project-card-standard or project-card-tall)
}

/**
 * ScrambleTextProps defines the properties for the ScrambleText component
 */
export interface ScrambleTextProps {
  text: string // Text to be displayed and scrambled
  isLoaded: boolean // Whether the page has loaded (controls when animation starts)
  delay: number // Delay in milliseconds before starting the animation
  className?: string // Optional CSS classes
}
