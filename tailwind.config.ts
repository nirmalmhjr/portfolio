import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

/**
 * Colors come from CSS variables in styles/globals.css, so light and dark
 * themes share one set of class names. Channels are stored as "R G B" so
 * opacity modifiers work (e.g. bg-surface/80).
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: [
          "var(--font-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
      },
      colors: {
        canvas: "rgb(var(--canvas) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        raised: "rgb(var(--raised) / <alpha-value>)",
        fg: "rgb(var(--fg) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        faint: "rgb(var(--faint) / <alpha-value>)",
        line: "var(--line)",
        "line-strong": "var(--line-strong)",
        a1: "rgb(var(--a1) / <alpha-value>)",
        a2: "rgb(var(--a2) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        ok: "rgb(var(--ok) / <alpha-value>)",
        info: "rgb(var(--info) / <alpha-value>)",
      },
      borderColor: {
        DEFAULT: "var(--line)",
      },
      maxWidth: {
        site: "80rem",
      },
      keyframes: {
        drift: {
          "0%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(60px, 40px) scale(1.08)" },
          "100%": { transform: "translate(-30px, 70px) scale(0.95)" },
        },
        bob: {
          "50%": { transform: "translateY(-6px)" },
        },
        ping: {
          "75%, 100%": { transform: "scale(2.6)", opacity: "0" },
        },
      },
      animation: {
        drift: "drift 22s ease-in-out infinite alternate",
        bob: "bob 10s ease-in-out infinite",
        ping: "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
      typography: {
        DEFAULT: {
          css: {
            "--tw-prose-body": "rgb(var(--muted))",
            "--tw-prose-headings": "rgb(var(--fg))",
            "--tw-prose-lead": "rgb(var(--muted))",
            "--tw-prose-links": "rgb(var(--ink))",
            "--tw-prose-bold": "rgb(var(--fg))",
            "--tw-prose-counters": "rgb(var(--faint))",
            "--tw-prose-bullets": "rgb(var(--faint))",
            "--tw-prose-hr": "var(--line)",
            "--tw-prose-quotes": "rgb(var(--fg))",
            "--tw-prose-quote-borders": "rgb(var(--a1))",
            "--tw-prose-captions": "rgb(var(--faint))",
            "--tw-prose-code": "rgb(var(--fg))",
            "--tw-prose-pre-code": "rgb(var(--fg))",
            "--tw-prose-pre-bg": "transparent",
            "--tw-prose-th-borders": "var(--line-strong)",
            "--tw-prose-td-borders": "var(--line)",
            maxWidth: "none",
            fontSize: "1.0625rem",
            lineHeight: "1.75",
            "h2, h3, h4": { fontWeight: "700", letterSpacing: "-0.02em" },
            h2: { marginTop: "2.2em" },
            a: {
              fontWeight: "500",
              textDecoration: "underline",
              textUnderlineOffset: "3px",
              textDecorationColor: "rgb(var(--ink) / 0.4)",
            },
            "a:hover": { textDecorationColor: "rgb(var(--ink))" },
            "code::before": { content: '""' },
            "code::after": { content: '""' },
            code: { fontWeight: "400" },
            "pre code": { backgroundColor: "transparent", padding: "0" },
            blockquote: { fontStyle: "normal", fontWeight: "500" },
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
