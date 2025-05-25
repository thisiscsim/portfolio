"use client"

import { useEffect, useState, useRef, useMemo } from "react"
import { STYLES } from "@/constants"
import { FadeIn } from "@/components/ui/fade-in"
import ScrambleText from "@/components/ui/scramble-text"
import CompanySection from "@/components/ui/company-section"
import ProjectItem from "@/components/ui/project-item"

export default function HomePage() {
  // Track if this component has been mounted before
  const hasMounted = useRef(false)

  // Set up animations only on first mount
  const [shouldAnimate, setShouldAnimate] = useState(false)

  useEffect(() => {
    // Only trigger animations on first mount
    if (!hasMounted.current) {
      hasMounted.current = true
      setShouldAnimate(true)
    }
  }, [])

  // Memoize the project items to prevent unnecessary re-renders
  const harveyProjects = useMemo(
    () => [
      <ProjectItem
        key="review-tables"
        title="Review Tables"
        description="I'm currently the design lead for Vault where I work on our multi-document review queries, data management and knowledge base features. I'm also the co-lead of Harvey's design system, which supports dozens of internal embedded product surfaces."
        imageUrl="/dark-data-table.png"
      />,
      <ProjectItem
        key="file-event-log"
        title="File Event Log"
        description="Real-time event log for file uploads, providing users with detailed tracking of document processing and system actions."
        imageUrl="/dark-search-interface.png"
      />,
      <ProjectItem
        key="vault-file-browser"
        title="Vault File Browser"
        description="Full-featured document management system with advanced search, filtering, and organization capabilities."
        imageUrl="/futuristic-dashboard.png"
      />,
    ],
    [],
  )

  const arcProjects = useMemo(
    () => [
      <ProjectItem
        key="arc-deposits"
        title="Deposits"
        description="Faster, easier deposits for Arc users with streamlined verification and instant access to funds."
        imageUrl="/arc-deposits.jpg"
      />,
      <ProjectItem
        key="arc-bill-pay"
        title="Bill Pay"
        description="Unified platform to capture, scan and automate invoice payments, reducing manual processing time by 60%."
        imageUrl="/data-dashboard-dark.png"
      />,
      <ProjectItem
        key="arc-notifications"
        title="Notifications"
        description="Action center with granular notification controls, allowing users to customize their alert preferences."
        imageUrl="/command-icon.png"
      />,
    ],
    [],
  )

  const uberProjects = useMemo(
    () => [
      <ProjectItem
        key="driving-onboarding"
        title="Driving Onboarding"
        description="Enhanced driver onboarding experience that improved completion rates by 23% through simplified document verification."
        imageUrl="/dark-search-interface.png"
      />,
      <ProjectItem
        key="en-route-delay"
        title="En-route Delay Notification"
        description="Helping bridge the rider-driver communication gap with real-time updates and transparent delay information."
        imageUrl="/futuristic-dashboard.png"
      />,
    ],
    [],
  )

  const flexportProjects = useMemo(
    () => [
      <ProjectItem
        key="freight-forwarding"
        title="Freight Forwarding App"
        description="Move shipments with realtime, actionable visibility across global supply chains, reducing tracking inquiries by 40%."
        imageUrl="/data-dashboard-dark.png"
      />,
    ],
    [],
  )

  return (
    <>
      {/* Info Section */}
      <section className="">
        <div className="mx-auto max-w-[872px] py-8">
          <ScrambleText text="Description" className={STYLES.titleClass} delay={100} />
          <FadeIn delay={2}>
            <p className="text-md text-text-primary">
              Chris (He/Him) designs interfaces. He thrives in complex, ambiguous problem spaces focused around
              interactive media, digital tooling, and multimodal interaction. He studied Human-Computer Interaction at
              the University of Washington. Previously, he's worked with teams at{" "}
              <a href="https://www.flexport.com" target="_blank" rel="noopener noreferrer" className={STYLES.linkStyle}>
                Flexport
              </a>
              ,{" "}
              <a href="https://www.uber.com" target="_blank" rel="noopener noreferrer" className={STYLES.linkStyle}>
                Uber
              </a>{" "}
              and{" "}
              <a href="https://www.joinarc.com" target="_blank" rel="noopener noreferrer" className={STYLES.linkStyle}>
                Arc
              </a>
              . Here are some of his featured work.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Location, Currently, Connect Section */}
      <section className="">
        <div className="mx-auto max-w-[872px] grid grid-cols-1 md:grid-cols-3">
          {/* Location */}
          <div className="py-8">
            <ScrambleText text="Location" className={STYLES.titleClass} delay={300} />
            <FadeIn delay={4}>
              <div className="text-md text-text-primary">
                <p>37.8044° N, 122.2711° W</p>
                <p>Oakland, CA</p>
              </div>
            </FadeIn>
          </div>

          {/* Current Position */}
          <div className="py-8">
            <ScrambleText text="Currently" className={STYLES.titleClass} delay={500} />
            <FadeIn delay={5}>
              <div className="text-md text-text-primary">
                <p>Member of the Design staff</p>
                <p>Harvey</p>
              </div>
            </FadeIn>
          </div>

          {/* Connect Links */}
          <div className="py-8">
            <ScrambleText text="Connect" className={STYLES.titleClass} delay={700} />
            <FadeIn delay={6}>
              <div className="text-md text-text-primary">
                <p>
                  <a href="mailto:hello@csim.me" className={STYLES.linkStyle} aria-label="Email hello@csim.me">
                    hello@csim.me
                  </a>
                </p>
                <p>
                  <a
                    href="https://www.instagram.com/thisiscsim/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={STYLES.linkStyle}
                    aria-label="Instagram @thisiscsim"
                  >
                    @thisiscsim
                  </a>
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Projects Section with new two-column layout */}
      <section className="flex-grow flex flex-col">
        <div className="mx-auto max-w-[872px] py-8 flex flex-col flex-grow">
          {/* Harvey Projects */}
          <CompanySection date="2024 - Current" company="Harvey" delay={7} projects={harveyProjects} />

          {/* Arc Projects */}
          <CompanySection date="2022 - 2024" company="Arc" delay={10} projects={arcProjects} />

          {/* Uber Projects */}
          <CompanySection date="2020 - 2022" company="Uber" delay={13} projects={uberProjects} />

          {/* Flexport Projects */}
          <CompanySection date="2019 - 2020" company="Flexport" delay={16} projects={flexportProjects} />
        </div>
      </section>
    </>
  )
}
