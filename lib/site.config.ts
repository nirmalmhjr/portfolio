/**
 * Central site configuration. Edit this file to update identity, links, and
 * SEO defaults across the whole site. Almost nothing else needs to change.
 */

export const siteConfig = {
  /** Fallback used when NEXT_PUBLIC_SITE_URL is not set (e.g. local dev). */
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://example.com",

  name: "Jane Doe",
  /** Professional title shown in the hero and used in Person JSON-LD. */
  title: "Full-Stack Engineer",
  /** One-line intro for the hero + default meta description. */
  description:
    "I build fast, accessible web apps with React, Next.js, and TypeScript — and write about the JavaScript concepts behind them.",
  /** Longer tagline for the homepage hero body. */
  intro:
    "Full-stack engineer focused on the frontend. I care about performance, developer experience, and shipping things that feel good to use.",

  locale: "en_US",
  /** Default OG image. Generated dynamically by app/opengraph-image.tsx. */
  ogImage: "/opengraph-image",

  author: {
    name: "Jane Doe",
    email: "jane@example.com",
    /** Bare handles — full URLs are derived below. */
    github: "janedoe",
    linkedin: "janedoe",
    twitter: "janedoe",
  },

  /** Posts per page on the blog listing. */
  postsPerPage: 6,
} as const;

export const socialLinks = {
  email: `mailto:${siteConfig.author.email}`,
  github: `https://github.com/${siteConfig.author.github}`,
  linkedin: `https://www.linkedin.com/in/${siteConfig.author.linkedin}`,
  twitter: `https://twitter.com/${siteConfig.author.twitter}`,
} as const;

export const mainNav = [
  { title: "About", href: "/about" },
  { title: "Projects", href: "/projects" },
  { title: "Blog", href: "/blog" },
  { title: "Contact", href: "/contact" },
] as const;

/** Absolute URL helper. Pass a path with a leading slash. */
export function absoluteUrl(path = "/"): string {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
