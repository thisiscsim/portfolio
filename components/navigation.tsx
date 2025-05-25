"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import Logo from "@/components/ui/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { NAV_ITEMS } from "@/constants"

export default function Navigation() {
  const pathname = usePathname()

  return (
    <header className="flex justify-between items-center px-10 py-4 w-full bg-bg-primary">
      {/* Logo/Home link */}
      <div className="hover:opacity-80 transition-opacity duration-200">
        <Logo />
      </div>

      {/* Navigation links and theme toggle */}
      <div className="flex items-center">
        <nav aria-label="Main navigation">
          <ul className="flex items-center space-x-1">
            {NAV_ITEMS.map((item) => (
              <li
                key={item.path}
                className="flex items-center hover:opacity-90 active:opacity-70 transition-opacity duration-200"
              >
                <Link
                  href={item.path}
                  className={`
                    inline-flex items-center px-[4px] py-[2px] text-sm tracking-[-0.3px] leading-none font-normal rounded-[3px] cursor-pointer
                    ${
                      pathname === item.path
                        ? "bg-text-primary text-bg-primary" // Active page style
                        : "bg-bg-secondary text-text-primary hover:bg-bg-tertiary transition-colors duration-200" // Inactive page style
                    }
                  `}
                  title={`Press ${item.key} to navigate`}
                  aria-current={pathname === item.path ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}

            {/* Add theme toggle as a separate list item after all nav items */}
            <li className="flex items-center hover:opacity-90 active:opacity-70 transition-opacity duration-200">
              <ThemeToggle />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
