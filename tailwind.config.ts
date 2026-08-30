import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
        mono: [
          "var(--font-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "monospace",
        ],
      },
      colors: {
        background: "hsl(var(--background))",
        surface: "hsl(var(--surface))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
      },
      fontSize: {
        // Fluid display sizes
        "display-sm": ["clamp(2.5rem, 8vw, 4.5rem)", { lineHeight: "0.9" }],
        "display-md": ["clamp(3rem, 12vw, 8rem)", { lineHeight: "0.85" }],
        "display-lg": ["clamp(3.25rem, 15vw, 11rem)", { lineHeight: "0.82" }],
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.7" },
          "100%": { transform: "scale(2.4)", opacity: "0" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "pulse-ring": "pulse-ring 2s cubic-bezier(0.4, 0, 0.2, 1) infinite",
      },
      typography: {
        DEFAULT: {
          css: {
            "--tw-prose-body": "hsl(var(--foreground))",
            "--tw-prose-headings": "hsl(var(--foreground))",
            "--tw-prose-links": "hsl(var(--accent))",
            "--tw-prose-bold": "hsl(var(--foreground))",
            "--tw-prose-quotes": "hsl(var(--foreground))",
            "--tw-prose-quote-borders": "hsl(var(--accent))",
            "--tw-prose-hr": "hsl(var(--border))",
            "--tw-prose-captions": "hsl(var(--muted-foreground))",
            "--tw-prose-counters": "hsl(var(--muted-foreground))",
            "--tw-prose-bullets": "hsl(var(--border))",
            maxWidth: "68ch",
            fontSize: "1.0625rem",
            lineHeight: "1.75",
            h2: {
              fontWeight: "600",
              letterSpacing: "-0.03em",
              marginTop: "2.5em",
              fontSize: "1.6em",
            },
            h3: { fontWeight: "600", letterSpacing: "-0.02em" },
            a: {
              textDecoration: "none",
              borderBottom: "1.5px solid hsl(var(--accent) / 0.45)",
              transition: "border-color 0.2s",
            },
            "a:hover": { borderBottomColor: "hsl(var(--accent))" },
            code: { fontWeight: "400" },
            "code::before": { content: '""' },
            "code::after": { content: '""' },
            blockquote: {
              fontStyle: "normal",
              fontWeight: "500",
              fontSize: "1.15em",
              lineHeight: "1.5",
              borderLeftWidth: "2px",
            },
            "pre code": { backgroundColor: "transparent", padding: "0" },
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
