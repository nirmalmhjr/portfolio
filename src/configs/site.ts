import { CLIENT_ENV } from "@/env/client";

/**
 * Central site configuration: identity, links and SEO defaults. This file is
 * bundled into client JavaScript, so keep private details (like the phone
 * number) out of it. Page content lives in the feature constants
 * (features/profile/constants, features/projects/constants).
 */
export const SITE_CONFIG = {
  author: {
    email: "nirmalmhjr@gmail.com",
    github: "nirmalmhjr",
    /** LinkedIn handle, shown in the header, footer and contact page. */
    // linkedin: "https://www.linkedin.com/in/nirmal-maharjan-513290a9/",
    linkedin: "nirmal-maharjan-513290a9",
    name: "Nirmal Maharjan",
  },
  availability: "Open to new opportunities",
  /** Default meta description. */
  description:
    "Frontend developer in Kathmandu, Nepal, building production websites, landing pages and CMS dashboards with Next.js, TypeScript and React.",
  /** Years of frontend experience, used in the hero, facts row and ledger. */
  experienceYears: "1.5+",
  /** Search keywords for the homepage. */
  keywords: [
    "Frontend Developer Nepal",
    "Frontend Developer Kathmandu",
    "Next.js Developer Nepal",
    "React Developer Kathmandu",
    "TypeScript",
    "Tailwind CSS",
    "Nirmal Maharjan",
  ],
  locale: "en_US",
  location: "Kathmandu, Nepal",
  /** What you're looking for; shown in the hero and on the contact card. */
  lookingFor: "Full-time frontend roles, remote or in Kathmandu",
  name: "Nirmal Maharjan",
  /** Posts per page on the blog listing. */
  postsPerPage: 6,
  /** File name the downloaded résumé PDF is saved as. */
  resumeFileName: "Nirmal-Maharjan-Resume.pdf",
  /** IANA time zone, for the live clock in the hero. */
  timeZoneId: "Asia/Kathmandu",
  timezone: "UTC+5:45",
  /** Short title used in the hero, page titles and Person JSON-LD. */
  title: "Frontend Developer",
  /** Your domain. NEXT_PUBLIC_SITE_URL overrides it (see env/client.ts). */
  url: CLIENT_ENV.NEXT_PUBLIC_SITE_URL,
} as const;

/** Size of the generated Open Graph image (app/opengraph-image.tsx). */
export const OG_IMAGE_SIZE = { height: 630, width: 1200 } as const;

export const SOCIAL_LINKS = {
  email: `mailto:${SITE_CONFIG.author.email}`,
  github: `https://github.com/${SITE_CONFIG.author.github}`,
  /** Email link with a subject line, for "Email me" buttons. */
  hireEmail: `mailto:${SITE_CONFIG.author.email}?subject=${encodeURIComponent(
    "Frontend developer role"
  )}`,
  // biome-ignore lint/suspicious/noUnnecessaryConditions: remove the handle above to hide every LinkedIn link.
  linkedin: SITE_CONFIG.author.linkedin
    ? `https://www.linkedin.com/in/${SITE_CONFIG.author.linkedin}`
    : null,
} as const;
