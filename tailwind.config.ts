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
        display: ["var(--font-display)", "Georgia", "serif"],
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
      boxShadow: {
        card: "0 1px 2px hsl(var(--shadow-color) / 0.04), 0 12px 32px -12px hsl(var(--shadow-color) / 0.12)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.7" },
          "100%": { transform: "scale(2.4)", opacity: "0" },
        },
      },
      animation: {
        marquee: "marquee 34s linear infinite",
        "fade-up": "fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
        "pulse-ring": "pulse-ring 2s cubic-bezier(0.4, 0, 0.2, 1) infinite",
      },
      typography: {
        DEFAULT: {
          css: {
            "--tw-prose-body": "hsl(var(--foreground))",
            "--tw-prose-headings": "hsl(var(--foreground))",
            "--tw-prose-links": "hsl(var(--accent))",
            "--tw-prose-bold": "hsl(var(--foreground))",
            "--tw-prose-quotes": "hsl(var(--muted-foreground))",
            "--tw-prose-quote-borders": "hsl(var(--accent))",
            "--tw-prose-hr": "hsl(var(--border))",
            "--tw-prose-captions": "hsl(var(--muted-foreground))",
            maxWidth: "68ch",
            fontSize: "1.0625rem",
            lineHeight: "1.75",
            h2: {
              fontWeight: "400",
              letterSpacing: "-0.02em",
              marginTop: "2.5em",
            },
            h3: { fontWeight: "400", letterSpacing: "-0.02em" },
            a: {
              textDecoration: "none",
              borderBottom: "1.5px solid hsl(var(--accent) / 0.4)",
              transition: "border-color 0.2s",
            },
            "a:hover": { borderBottomColor: "hsl(var(--accent))" },
            "code::before": { content: '""' },
            "code::after": { content: '""' },
            blockquote: {
              fontStyle: "normal",
              fontFamily: "var(--font-display), Georgia, serif",
              fontSize: "1.15em",
              lineHeight: "1.5",
            },
            "pre code": { backgroundColor: "transparent", padding: "0" },
          },
        },
        invert: {
          css: {
            "--tw-prose-body": "hsl(var(--foreground))",
            "--tw-prose-headings": "hsl(var(--foreground))",
            "--tw-prose-links": "hsl(var(--accent))",
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
