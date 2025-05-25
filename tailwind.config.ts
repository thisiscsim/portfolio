import type { Config } from "tailwindcss"
const defaultTheme = require("tailwindcss/defaultTheme")

const config: Config = {
  darkMode: ["class"],
  content: [
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Theme colors
        "bg-primary": {
          DEFAULT: "var(--bg-primary)",
          dark: "#08090A",
          light: "#FFFFFF",
        },
        "bg-secondary": {
          DEFAULT: "var(--bg-secondary)",
          dark: "#1C1C1F",
          light: "#F9F8F9",
        },
        "bg-tertiary": {
          DEFAULT: "var(--bg-tertiary)",
          dark: "#232326",
          light: "#F4F2F4",
        },
        "border-primary": {
          DEFAULT: "var(--border-primary)",
          dark: "#23252A",
          light: "#E9E8EA",
        },
        "text-primary": {
          DEFAULT: "var(--text-primary)",
          dark: "#F7F8F8",
          light: "#282A30",
        },
        "text-secondary": {
          DEFAULT: "var(--text-secondary)",
          dark: "#8A8F98",
          light: "#3C4149",
        },
        "text-tertiary": {
          DEFAULT: "var(--text-tertiary)",
          dark: "#62666D",
          light: "#6F6E77",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        // lg: "0.5rem",
        // md: "0.375rem",
        // sm: "0.25rem",
      },
      fontSize: {
        // Custom font sizes
        sm: [
          "12px",
          {
            lineHeight: "16px",
            letterSpacing: "-0.3px",
          },
        ],
        md: [
          "13px",
          {
            lineHeight: "22px",
            letterSpacing: "-0.3px",
          },
        ],
      },
      fontFamily: {
        mono: ["var(--font-berkeley-mono)", "var(--font-geist-mono)", ...defaultTheme.fontFamily.mono],
        berkeley: ["var(--font-berkeley-mono)", "monospace"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
