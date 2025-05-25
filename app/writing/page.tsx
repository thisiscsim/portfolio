"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { journalEntries } from "@/data/journalEntries"
import { JOURNAL_CATEGORIES } from "@/constants"
import { STYLES } from "@/constants"
import { FadeIn } from "@/components/ui/fade-in"
import ScrambleText from "@/components/ui/scramble-text"
import NavButton from "@/components/ui/nav-button"

export default function WritingPage() {
  // State to track the currently selected category filter
  const [selectedCategory, setSelectedCategory] = useState("All")

  // Track if this component has been mounted before
  const hasMounted = useRef(false)

  // State to track if the page has loaded (for animations)
  const [isLoaded, setIsLoaded] = useState(false)

  // Set isLoaded to true after a short delay to ensure synchronized animations
  useEffect(() => {
    // Only trigger animations on first mount
    if (!hasMounted.current) {
      hasMounted.current = true

      // Small delay to ensure all components are mounted before animations start
      const timer = setTimeout(() => {
        setIsLoaded(true)
      }, 100)

      return () => clearTimeout(timer)
    } else {
      // If not first mount, just set loaded to true immediately
      setIsLoaded(true)
    }
  }, [])

  // Filter entries based on selected category - memoize to prevent unnecessary recalculations
  const filteredEntries = useMemo(() => {
    return selectedCategory === "All"
      ? journalEntries // If "All" is selected, show all entries
      : journalEntries.filter((entry) => entry.categories.includes(selectedCategory)) // Otherwise, filter by category
  }, [selectedCategory])

  // Animation variants for individual items
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      height: 0,
      marginBottom: 0,
      transition: {
        y: { duration: 0.2 },
        opacity: { duration: 0.2 },
        height: { duration: 0.2 },
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      height: "auto",
      marginBottom: "0px",
      transition: {
        y: { type: "spring", stiffness: 500, damping: 25 },
        opacity: { duration: 0.2 },
        height: { duration: 0.2 },
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      height: 0,
      marginBottom: 0,
      transition: {
        y: { duration: 0.2 },
        opacity: { duration: 0.1 },
        height: { duration: 0.2 },
      },
    },
  }

  // Create a map of all entries for efficient rendering
  const allEntries = useMemo(() => {
    // Create a map of all entries with their visibility status
    return journalEntries.map((entry) => {
      const isVisible = selectedCategory === "All" || entry.categories.includes(selectedCategory)
      return {
        ...entry,
        isVisible,
      }
    })
  }, [selectedCategory])

  return (
    <>
      {/* Writing Introduction with full-width border - styled like homepage info section */}
      <section className="w-full">
        <div className="mx-auto max-w-[872px] py-8">
          <ScrambleText text="Writing" className={STYLES.titleClass} delay={100} />
          <FadeIn delay={2}>
            <p className="mt-2 text-text-primary">
              Infrequent thoughts on design, the future, current state of society, and life. These are in no way
              representative of my employer and are strictly my personal opinions. I use Notion as the CMS, and the list
              here updates automatically through the Notion API.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Filters and Table Container with padding - NO BORDERS */}
      <section className="py-8">
        <div className="mx-auto max-w-[872px] w-full flex flex-col flex-grow">
          {/* Category Filters - USING NAV BUTTON COMPONENT WITH UPDATED STYLING */}
          <FadeIn delay={3}>
            <div className="flex flex-wrap gap-1" role="group" aria-label="Filter writing entries by category">
              {JOURNAL_CATEGORIES.map((category) => (
                <NavButton
                  key={category}
                  isActive={selectedCategory === category}
                  onClick={() => setSelectedCategory(category)}
                  ariaLabel={`Filter by ${category}`}
                  ariaPressed={selectedCategory === category}
                  paddingX="px-[5px]"
                  paddingY="py-[3px]"
                  fontSize="text-xs"
                  lineHeight="leading-[12px]"
                >
                  {category}
                </NavButton>
              ))}
            </div>
          </FadeIn>

          {/* Writing Entries with Animation */}
          <FadeIn delay={4} className="flex-grow mt-6">
            <div className="w-full">
              {allEntries.length > 0 ? (
                <div className="relative">
                  {allEntries.map((entry) => (
                    <AnimatePresence key={entry.id} initial={false}>
                      {entry.isVisible && (
                        <motion.div
                          key={entry.id}
                          layout
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="grid grid-cols-[120px_1fr_200px] gap-x-1 hover:bg-bg-secondary transition-colors duration-150 overflow-hidden"
                          style={{
                            borderBottom: "0.5px solid var(--border-primary)",
                          }}
                        >
                          <div className="py-3 flex items-center text-text-primary">
                            <div className="w-2.5 h-2.5 bg-text-primary mr-2" aria-hidden="true"></div>
                            {entry.date}
                          </div>
                          <div className="py-3 text-text-primary">{entry.title}</div>
                          <div className="py-3 text-text-tertiary">{entry.categories.join(", ")}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-8 text-center text-text-tertiary"
                >
                  No entries found for the selected category.
                </motion.div>
              )}

              {/* Show "No entries" message when filtered list is empty but allEntries has items */}
              {allEntries.length > 0 && filteredEntries.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-8 text-center text-text-tertiary"
                >
                  No entries found for the selected category.
                </motion.div>
              )}
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
