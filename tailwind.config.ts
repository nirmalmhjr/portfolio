import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

/**
 * Colors come from CSS variables in styles/globals.css, so light and dark
 * themes share one set of class names. Channels are stored as "R G B" so
 * opacity modifiers work (e.g. bg-surface/80).
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  darkMode: "class",
  plugins: [typography],
  theme: {
    extend: {
      animation: {
        bob: "bob 10s ease-in-out infinite",
        drift: "drift 22s ease-in-out infinite alternate",
        ping: "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
      borderColor: {
        DEFAULT: "var(--line)",
      },
      colors: {
        a1: "rgb(var(--a1) / <alpha-value>)",
        a2: "rgb(var(--a2) / <alpha-value>)",
        canvas: "rgb(var(--canvas) / <alpha-value>)",
        faint: "rgb(var(--faint) / <alpha-value>)",
        fg: "rgb(var(--fg) / <alpha-value>)",
        info: "rgb(var(--info) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        line: "var(--line)",
        "line-strong": "var(--line-strong)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        ok: "rgb(var(--ok) / <alpha-value>)",
        raised: "rgb(var(--raised) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
      },
      fontFamily: {
        mono: [
          "var(--font-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
      },
      keyframes: {
        bob: {
          "50%": { transform: "translateY(-6px)" },
        },
        drift: {
          "0%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(60px, 40px) scale(1.08)" },
          "100%": { transform: "translate(-30px, 70px) scale(0.95)" },
        },
        ping: {
          "75%, 100%": { opacity: "0", transform: "scale(2.6)" },
        },
      },
      maxWidth: {
        site: "80rem",
      },
      typography: {
        DEFAULT: {
          css: {
            "--tw-prose-body": "rgb(var(--muted))",
            "--tw-prose-bold": "rgb(var(--fg))",
            "--tw-prose-bullets": "rgb(var(--faint))",
            "--tw-prose-captions": "rgb(var(--faint))",
            "--tw-prose-code": "rgb(var(--fg))",
            "--tw-prose-counters": "rgb(var(--faint))",
            "--tw-prose-headings": "rgb(var(--fg))",
            "--tw-prose-hr": "var(--line)",
            "--tw-prose-lead": "rgb(var(--muted))",
            "--tw-prose-links": "rgb(var(--ink))",
            "--tw-prose-pre-bg": "transparent",
            "--tw-prose-pre-code": "rgb(var(--fg))",
            "--tw-prose-quote-borders": "rgb(var(--a1))",
            "--tw-prose-quotes": "rgb(var(--fg))",
            "--tw-prose-td-borders": "var(--line)",
            "--tw-prose-th-borders": "var(--line-strong)",
            a: {
              fontWeight: "500",
              textDecoration: "underline",
              textDecorationColor: "rgb(var(--ink) / 0.4)",
              textUnderlineOffset: "3px",
            },
            "a:hover": { textDecorationColor: "rgb(var(--ink))" },
            blockquote: { fontStyle: "normal", fontWeight: "500" },
            code: { fontWeight: "400" },
            "code::after": { content: '""' },
            "code::before": { content: '""' },
            fontSize: "1.0625rem",
            h2: { marginTop: "2.2em" },
            "h2, h3, h4": { fontWeight: "700", letterSpacing: "-0.02em" },
            lineHeight: "1.75",
            maxWidth: "none",
            "pre code": { backgroundColor: "transparent", padding: "0" },
          },
        },
      },
    },
  },
};

export default config;
