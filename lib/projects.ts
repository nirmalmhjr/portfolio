import type { StaticImageData } from "next/image";
import plexbitBefore from "@/public/projects/plexbit-before.jpg";
import plexbitAfter from "@/public/projects/plexbit-after.jpg";
import plexlerBefore from "@/public/projects/plexler-before.jpg";
import plexlerAfter from "@/public/projects/plexler-after.jpg";
import sierra from "@/public/projects/sierra.jpg";
import prabhu from "@/public/projects/prabhu.jpg";
import galli from "@/public/projects/galli.jpg";
import meromenu from "@/public/projects/meromenu.jpg";
import devevents from "@/public/projects/devevents.jpg";
import macbook from "@/public/projects/macbook.jpg";
import zentry from "@/public/projects/zentry.jpg";
import paradiseHills from "@/public/projects/paradise-hills.jpg";

/**
 * Projects shown on the homepage and /projects, in display order.
 * Screenshots live in public/projects/.
 *
 * Client work ("client") appears under Work. Learning builds ("personal")
 * appear in their own "Things I built to learn" section.
 */

export type ProjectKind = "client" | "personal";
export type ProjectStatus =
  "live" | "demo" | "launching-soon" | "in-progress" | "shipped";

export type ProjectMedia =
  /** A tall full-page screenshot that scrolls on hover. */
  | { type: "scroll"; image: StaticImageData; alt: string; badge?: string }
  /** A single viewport screenshot that zooms slightly on hover. */
  | { type: "image"; image: StaticImageData; alt: string }
  /**
   * Drag to compare an old design with the redesign. Both images are saved
   * full-page screenshots, so this keeps working after the old site is gone.
   * On hover, both pages scroll down together.
   */
  | {
      type: "compare";
      before: StaticImageData;
      after: StaticImageData;
      beforeAlt: string;
      afterAlt: string;
      afterLabel?: string;
    }
  /** No screenshot yet (unlaunched work). */
  | { type: "placeholder" };

export interface Project {
  slug: string;
  title: string;
  kind: ProjectKind;
  status: ProjectStatus;
  /** Overrides the default status text, e.g. "Shipped 2025". */
  statusLabel?: string;
  /** What Nirmal personally built. */
  myPart: string;
  description: string;
  tech: string[];
  primaryTech?: string[];
  /** Public link, if the project can be visited. */
  url?: string;
  linkLabel?: string;
  /** Address shown in the browser frame. */
  displayUrl: string;
  media: ProjectMedia;
  featured?: boolean;
  /** Share of the work, shown as meters on the featured card. */
  contribution?: { label: string; value: number; display: string }[];
  /** Placeholder cards (e.g. unlaunched work) have no link or "my part". */
  placeholder?: boolean;
  /** For learning builds: what the project taught me. */
  learned?: string;
  /** Keep the entry but leave it off the site (e.g. while a demo is down). */
  hidden?: boolean;
}

export const projects: Project[] = [
  {
    slug: "plex-bit",
    title: "Plex Bit Infosystems",
    kind: "client",
    status: "launching-soon",
    featured: true,
    myPart: "Company website + CMS dashboard",
    description:
      "The new website for an AI-first technology company. Every page is dynamic and managed through a custom CMS.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    primaryTech: ["Next.js", "TypeScript"],
    // After launch: set status to "live", url to https://pbinfosystems.com/,
    // linkLabel to "Visit site" and displayUrl to "pbinfosystems.com".
    url: "https://v2.pbinfosystems.com/",
    linkLabel: "View v2 preview",
    displayUrl: "v2.pbinfosystems.com",
    media: {
      type: "compare",
      before: plexbitBefore,
      after: plexbitAfter,
      beforeAlt: "Previous Plex Bit homepage",
      afterAlt: "New Plex Bit homepage (v2)",
      afterLabel: "After · v2",
    },
    contribution: [
      { label: "Website frontend", value: 50, display: "~50%" },
      { label: "CMS admin dashboard", value: 100, display: "100%" },
    ],
  },
  {
    slug: "paradise-hills",
    title: "Paradise Hills Resort",
    kind: "client",
    status: "launching-soon",
    featured: true,
    myPart: "Website + admin dashboard, built solo",
    description:
      "The website for a nature retreat resort, with an availability search for bookings, rooms, events and a gallery, plus the admin dashboard that manages it all.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    primaryTech: ["Next.js", "TypeScript"],
    // After launch: set status to "live" and point url/displayUrl at the live domain.
    url: "https://paradisehills.pbinfosystems.com/",
    linkLabel: "View preview",
    displayUrl: "paradisehills.pbinfosystems.com",
    media: {
      type: "scroll",
      image: paradiseHills,
      alt: "Paradise Hills Resort website",
    },
    contribution: [
      { label: "Website frontend", value: 100, display: "100%" },
      { label: "Admin dashboard", value: 100, display: "100%" },
    ],
  },
  {
    slug: "plexler",
    title: "Plexler",
    kind: "client",
    status: "launching-soon",
    myPart: "Landing page redesign",
    description:
      "An AI-powered learning platform for schools, colleges, coaching centers and consultancies in Nepal.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    primaryTech: ["Next.js", "TypeScript"],
    // After launch: same as Plex Bit above, with plexler.com.
    url: "https://v2.plexler.com/",
    linkLabel: "View v2 preview",
    displayUrl: "v2.plexler.com",
    media: {
      type: "compare",
      before: plexlerBefore,
      after: plexlerAfter,
      beforeAlt: "Previous Plexler landing page",
      afterAlt: "Redesigned Plexler landing page",
    },
  },
  {
    slug: "sierra-adventurer",
    title: "Sierra Adventurer",
    kind: "client",
    status: "live",
    myPart: "Landing page redesign",
    description:
      "A Nepal travel company offering guided treks, tours and adventures across the Himalayas.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    primaryTech: ["Next.js", "TypeScript"],
    url: "https://www.sierraadventurer.com/",
    linkLabel: "Visit site",
    displayUrl: "sierraadventurer.com",
    media: {
      type: "scroll",
      image: sierra,
      alt: "Sierra Adventurer landing page",
    },
  },
  {
    slug: "prabhu-adventure",
    title: "Prabhu Adventure",
    kind: "client",
    status: "live",
    myPart: "Landing page + inner page components",
    description:
      "Expert-guided Himalayan treks and travel packages, with trek search, destinations and reviews.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    primaryTech: ["Next.js", "TypeScript"],
    url: "https://prabhuadventure.com/",
    linkLabel: "Visit site",
    displayUrl: "prabhuadventure.com",
    media: {
      type: "scroll",
      image: prabhu,
      alt: "Prabhu Adventure landing page",
    },
  },
  {
    slug: "galli-maps",
    title: "Galli Maps",
    kind: "client",
    status: "live",
    myPart: "Website + admin dashboard, Nepal Dairy modules",
    description:
      "A Nepali maps and navigation platform. I built its public website and the internal dashboard used to manage it, plus modules for the Nepal Dairy Project.",
    tech: ["React", "Tailwind CSS", "Next.js"],
    primaryTech: ["React"],
    url: "https://gallimaps.com/",
    linkLabel: "Visit site",
    displayUrl: "gallimaps.com",
    media: { type: "scroll", image: galli, alt: "Galli Maps website" },
  },
  {
    slug: "meromenu",
    title: "meromenu.com",
    kind: "client",
    status: "live",
    myPart: "Solo Vue 2 → Vue 3 migration",
    description:
      "A restaurant management system. I moved the whole app to Vue 3 and Nuxt 3 on my own.",
    tech: ["Vue 3", "Nuxt 3"],
    url: "https://www.meromenu.com/",
    linkLabel: "Visit site",
    displayUrl: "meromenu.com",
    media: {
      type: "scroll",
      image: meromenu,
      alt: "meromenu.com restaurant management system",
      badge: "vue 2 → vue 3 · nuxt 2 → nuxt 3",
    },
  },
  // TODO: replace this card with your unlaunched client projects. Copy one of
  // the entries above and set status: "in-progress" (media can stay
  // { type: "placeholder" } until you have a screenshot).
  {
    slug: "more-client-work",
    title: "More client work",
    kind: "client",
    status: "in-progress",
    placeholder: true,
    myPart: "Frontend development",
    description:
      "A few more client projects I've built are waiting to launch. They'll appear here once they're live.",
    tech: [],
    displayUrl: "launching soon…",
    media: { type: "placeholder" },
  },
  {
    slug: "devevents",
    title: "DevEvents",
    kind: "personal",
    status: "demo",
    myPart: "Personal build, solo",
    description:
      "A developer event listing platform with dynamic routing and API integration.",
    learned: "Full-stack Next.js: dynamic routes, API routes and MongoDB.",
    tech: ["Next.js", "Tailwind CSS", "MongoDB"],
    primaryTech: ["Next.js"],
    // url: "https://devevents-sooty-iota.vercel.app/",
    url: "https://devevents.nirmal-maharjan.com.np/",
    linkLabel: "Live demo",
    displayUrl: "devevents-sooty-iota.vercel.app",
    media: { type: "image", image: devevents, alt: "DevEvents homepage" },
  },
  {
    slug: "macbook-m4-clone",
    title: "MacBook M4 Clone",
    kind: "personal",
    status: "demo",
    myPart: "Personal build, solo",
    description:
      "An Apple-style product page with animations that play as you scroll.",
    learned: "Scroll-triggered animation with GSAP and ScrollTrigger.",
    tech: ["React", "Tailwind CSS", "GSAP"],
    // url: "https://macbookm4gsapclone.vercel.app/",
    url: "https://macbookm4.nirmal-maharjan.com.np/",
    linkLabel: "Live demo",
    displayUrl: "macbookm4gsapclone.vercel.app",
    media: {
      type: "image",
      image: macbook,
      alt: "MacBook M4 product page clone",
    },
  },
  {
    slug: "zentry-clone",
    title: "Zentry Clone",
    kind: "personal",
    status: "demo",
    myPart: "Personal build, solo",
    description:
      "A futuristic gaming landing page with an immersive layout and motion.",
    learned: "Complex, layered layouts and motion that stays smooth.",
    tech: ["React", "Tailwind CSS"],
    // url: "https://zentryclone-six.vercel.app/",
    url: "https://zentry.nirmal-maharjan.com.np/",
    linkLabel: "Live demo",
    displayUrl: "zentryclone-six.vercel.app",
    media: { type: "image", image: zentry, alt: "Zentry landing page clone" },
  },
  {
    slug: "amazon-clone",
    title: "Amazon Clone",
    kind: "personal",
    status: "demo",
    // Hidden because the live demo returned a 500 error on 2026-09-28.
    // Once it works again, remove `hidden` and add a screenshot.
    hidden: true,
    myPart: "Personal build, solo",
    description:
      "An e-commerce storefront inspired by Amazon, built with Next.js.",
    // TODO: add `learned` (what this project taught you) and the full tech list.
    tech: ["Next.js"],
    // url: "https://nextjs-amazon-clone-dun.vercel.app/",
    url: "https://amazon.nirmal-maharjan.com.np/",
    linkLabel: "Live demo",
    // displayUrl: "nextjs-amazon-clone-dun.vercel.app",
    displayUrl: "amazon.nirmal-maharjan.com.np",
    media: { type: "placeholder" },
  },
];

const visible = projects.filter((p) => !p.hidden);

/** Client work, featured project first. */
export const workProjects = visible.filter((p) => p.kind === "client");

/** Personal projects built to learn new tools. */
export const learningProjects = visible.filter((p) => p.kind === "personal");
