import type { StaticImageData } from "next/image";
import amazon from "@/public/projects/amazon-clone.png";
import devevents from "@/public/projects/devevents.jpg";
import galli from "@/public/projects/galli.jpg";
import luxe from "@/public/projects/luxe.jpg";
import macbook from "@/public/projects/macbook.jpg";
import meromenu from "@/public/projects/meromenu.jpg";
import paradiseHills from "@/public/projects/paradise-hills.jpg";
import plexbitAfter from "@/public/projects/plexbit-after.jpg";
import plexbitBefore from "@/public/projects/plexbit-before.jpg";
import plexlerAfter from "@/public/projects/plexler-after.jpg";
import plexlerBefore from "@/public/projects/plexler-before.jpg";
import prabhu from "@/public/projects/prabhu.jpg";
import sierra from "@/public/projects/sierra.jpg";
import beatboxShot from "@/public/projects/small/beatbox.jpg";
import blackJackShot from "@/public/projects/small/black-jack.jpg";
import netflixShot from "@/public/projects/small/netflix.jpg";
import rpsShot from "@/public/projects/small/rps.jpg";
import tenziesShot from "@/public/projects/small/tenzies.jpg";
import zentry from "@/public/projects/zentry.jpg";

/**
 * Projects shown on the homepage and /projects, in display order.
 * Screenshots live in public/projects/.
 *
 * Client work ("client") appears under Work. Learning builds ("personal")
 * appear in their own "Things I built to learn" section.
 */

export type ProjectKind = "client" | "personal";
export type ProjectStatus =
  | "live"
  | "demo"
  | "launching-soon"
  | "in-progress"
  | "shipped";

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
  /** Share of the work, shown as meters on the featured card. */
  contribution?: { label: string; value: number; display: string }[];
  description: string;
  /** Address shown in the browser frame. */
  displayUrl: string;
  featured?: boolean;
  /** Keep the entry but leave it off the site (e.g. while a demo is down). */
  hidden?: boolean;
  kind: ProjectKind;
  /** For learning builds: what the project taught me. */
  learned?: string;
  linkLabel?: string;
  media: ProjectMedia;
  /** What Nirmal personally built. */
  myPart: string;
  /** Placeholder cards (e.g. unlaunched work) have no link or "my part". */
  placeholder?: boolean;
  primaryTech?: string[];
  slug: string;
  status: ProjectStatus;
  /** Overrides the default status text, e.g. "Shipped 2025". */
  statusLabel?: string;
  tech: string[];
  title: string;
  /** Public link, if the project can be visited. */
  url?: string;
}

export const projects: Project[] = [
  {
    contribution: [
      { display: "~50%", label: "Website frontend", value: 50 },
      { display: "100%", label: "CMS admin dashboard", value: 100 },
    ],
    description:
      "The new website for an AI-first technology company. Every page is dynamic and managed through a custom CMS.",
    displayUrl: "v2.pbinfosystems.com",
    featured: true,
    kind: "client",
    linkLabel: "View v2 preview",
    media: {
      after: plexbitAfter,
      afterAlt: "New Plex Bit homepage (v2)",
      afterLabel: "After · v2",
      before: plexbitBefore,
      beforeAlt: "Previous Plex Bit homepage",
      type: "compare",
    },
    myPart: "Company website + CMS dashboard",
    primaryTech: ["Next.js", "TypeScript", "TanStack Query"],
    slug: "plex-bit",
    status: "launching-soon",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "TanStack Query"],
    title: "Plex Bit Infosystems",
    // After launch: set status to "live", url to https://pbinfosystems.com/,
    // linkLabel to "Visit site" and displayUrl to "pbinfosystems.com".
    url: "https://v2.pbinfosystems.com/",
  },
  {
    contribution: [
      { display: "100%", label: "Website frontend", value: 100 },
      { display: "100%", label: "Admin dashboard", value: 100 },
    ],
    description:
      "The website for a nature retreat resort, with an availability search for bookings, rooms, events and a gallery, plus the admin dashboard that manages it all.",
    displayUrl: "paradisehills.pbinfosystems.com",
    featured: true,
    kind: "client",
    linkLabel: "View preview",
    media: {
      alt: "Paradise Hills Resort website",
      image: paradiseHills,
      type: "scroll",
    },
    myPart: "Website + admin dashboard, built solo",
    primaryTech: ["Next.js", "TypeScript", "TanStack Query"],
    slug: "paradise-hills",
    status: "launching-soon",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "TanStack Query"],
    title: "Paradise Hills Resort",
    // After launch: set status to "live" and point url/displayUrl at the live domain.
    url: "https://paradisehills.pbinfosystems.com/",
  },
  {
    description:
      "A multi-vendor e-commerce platform currently in development. Contributed to the development of various frontend features and core functionality across the platform as part of the development team.",
    displayUrl: "luxe.pbinfosystems.com",
    kind: "client",
    linkLabel: "View work in progress",
    media: { alt: "Luxe e-commerce storefront", image: luxe, type: "scroll" },
    // Team project; covers only Nirmal's commits (Apr 16 – Jun 8, 2026).
    myPart: "Account & order pages, product search, blog, brand and sale pages",
    primaryTech: ["Next.js", "TypeScript", "TanStack Query"],
    slug: "luxe",
    status: "in-progress",
    statusLabel: "Work in progress",
    tech: ["Next.js", "TypeScript", "TanStack Query", "Tailwind CSS"],
    title: "Luxe",
    url: "https://luxe.pbinfosystems.com/",
  },
  {
    description:
      "An AI-powered learning platform for schools, colleges, coaching centers and consultancies in Nepal.",
    displayUrl: "v2.plexler.com",
    kind: "client",
    linkLabel: "View v2 preview",
    media: {
      after: plexlerAfter,
      afterAlt: "Redesigned Plexler landing page",
      before: plexlerBefore,
      beforeAlt: "Previous Plexler landing page",
      type: "compare",
    },
    myPart: "Landing page redesign",
    primaryTech: ["Next.js", "TypeScript"],
    slug: "plexler",
    status: "launching-soon",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    title: "Plexler",
    // After launch: same as Plex Bit above, with plexler.com.
    url: "https://v2.plexler.com/",
  },
  {
    description:
      "A Nepal travel company offering guided treks, tours and adventures across the Himalayas.",
    displayUrl: "sierraadventurer.com",
    kind: "client",
    linkLabel: "Visit site",
    media: {
      alt: "Sierra Adventurer landing page",
      image: sierra,
      type: "scroll",
    },
    myPart: "Landing page redesign",
    primaryTech: ["Next.js", "TypeScript"],
    slug: "sierra-adventurer",
    status: "live",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    title: "Sierra Adventurer",
    url: "https://www.sierraadventurer.com/",
  },
  {
    description:
      "Expert-guided Himalayan treks and travel packages, with trek search, destinations and reviews.",
    displayUrl: "prabhuadventure.com",
    kind: "client",
    linkLabel: "Visit site",
    media: {
      alt: "Prabhu Adventure landing page",
      image: prabhu,
      type: "scroll",
    },
    myPart: "Landing page + inner page components",
    primaryTech: ["Next.js", "TypeScript"],
    slug: "prabhu-adventure",
    status: "live",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    title: "Prabhu Adventure",
    url: "https://prabhuadventure.com/",
  },
  {
    description:
      "A Nepali maps and navigation platform. I built its public website and the internal dashboard used to manage it, plus modules for the Nepal Dairy Project.",
    displayUrl: "gallimaps.com",
    kind: "client",
    linkLabel: "Visit site",
    media: { alt: "Galli Maps website", image: galli, type: "scroll" },
    myPart: "Website + admin dashboard, Nepal Dairy modules",
    primaryTech: ["React"],
    slug: "galli-maps",
    status: "live",
    tech: ["React", "Tailwind CSS", "Next.js"],
    title: "Galli Maps",
    url: "https://gallimaps.com/",
  },
  {
    description:
      "A restaurant management system. I moved the whole app to Vue 3 and Nuxt 3 on my own.",
    displayUrl: "meromenu.com",
    kind: "client",
    linkLabel: "Visit site",
    media: {
      alt: "meromenu.com restaurant management system",
      badge: "vue 2 → vue 3 · nuxt 2 → nuxt 3",
      image: meromenu,
      type: "scroll",
    },
    myPart: "Solo Vue 2 → Vue 3 migration",
    slug: "meromenu",
    status: "live",
    tech: ["Vue 3", "Nuxt 3"],
    title: "meromenu.com",
    url: "https://www.meromenu.com/",
  },
  // TODO: replace this card with your unlaunched client projects. Copy one of
  // the entries above and set status: "in-progress" (media can stay
  // { type: "placeholder" } until you have a screenshot).
  {
    description:
      "A few more client projects I've built are waiting to launch. They'll appear here once they're live.",
    displayUrl: "launching soon…",
    kind: "client",
    media: { type: "placeholder" },
    myPart: "Frontend development",
    placeholder: true,
    slug: "more-client-work",
    status: "in-progress",
    tech: [],
    title: "More client work",
  },
  {
    description:
      "A developer event listing platform with dynamic routing and API integration.",
    displayUrl: "devevents-sooty-iota.vercel.app",
    kind: "personal",
    learned: "Full-stack Next.js: dynamic routes, API routes and MongoDB.",
    linkLabel: "Live demo",
    media: { alt: "DevEvents homepage", image: devevents, type: "image" },
    myPart: "Personal build, solo",
    primaryTech: ["Next.js"],
    slug: "devevents",
    status: "demo",
    tech: ["Next.js", "Tailwind CSS", "MongoDB"],
    title: "DevEvents",
    // url: "https://devevents-sooty-iota.vercel.app/",
    url: "https://devevents.nirmal-maharjan.com.np/",
  },
  {
    description:
      "An Apple-style product page with animations that play as you scroll.",
    displayUrl: "macbookm4gsapclone.vercel.app",
    kind: "personal",
    learned: "Scroll-triggered animation with GSAP and ScrollTrigger.",
    linkLabel: "Live demo",
    media: {
      alt: "MacBook M4 product page clone",
      image: macbook,
      type: "image",
    },
    myPart: "Personal build, solo",
    slug: "macbook-m4-clone",
    status: "demo",
    tech: ["React", "Tailwind CSS", "GSAP"],
    title: "MacBook M4 Clone",
    // url: "https://macbookm4gsapclone.vercel.app/",
    url: "https://macbookm4.nirmal-maharjan.com.np/",
  },
  {
    description:
      "A futuristic gaming landing page with an immersive layout and motion.",
    displayUrl: "zentryclone-six.vercel.app",
    kind: "personal",
    learned: "Complex, layered layouts and motion that stays smooth.",
    linkLabel: "Live demo",
    media: { alt: "Zentry landing page clone", image: zentry, type: "image" },
    myPart: "Personal build, solo",
    slug: "zentry-clone",
    status: "demo",
    tech: ["React", "Tailwind CSS"],
    title: "Zentry Clone",
    // url: "https://zentryclone-six.vercel.app/",
    url: "https://zentry.nirmal-maharjan.com.np/",
  },
  {
    description:
      "An e-commerce storefront inspired by Amazon, built with Next.js.",
    // displayUrl: "nextjs-amazon-clone-dun.vercel.app",
    displayUrl: "amazon.nirmal-maharjan.com.np",
    kind: "personal",
    learned:
      "Full-stack e-commerce: auth, cart and checkout with Stripe, backed by a MongoDB product catalog.",
    linkLabel: "Live demo",
    media: { alt: "Amazon Clone", image: amazon, type: "image" },
    myPart: "Personal build, solo",
    primaryTech: ["Next.js", "MongoDB"],
    slug: "amazon-clone",
    status: "demo",
    tech: ["Next.js", "MongoDB", "Stripe", "NextAuth", "Tailwind CSS"],
    title: "Amazon Clone",
    // url: "https://nextjs-amazon-clone-dun.vercel.app/",
    url: "https://amazon.nirmal-maharjan.com.np/",
  },
];

const visible = projects.filter((p) => !p.hidden);

/** Client work, featured project first. */
export const workProjects = visible.filter((p) => p.kind === "client");

/** Personal projects built to learn new tools. */
export const learningProjects = visible.filter((p) => p.kind === "personal");

/** The homepage shows featured work plus the next few; /projects shows all. */
export const homeWorkProjects = [
  ...workProjects.filter((p) => p.featured),
  ...workProjects.filter((p) => !(p.featured || p.placeholder)).slice(0, 3),
];

/** A small early build, shown on the "Where it started" path. */
export interface SmallBuild {
  image: StaticImageData;
  /** One plain line on what building it taught me. */
  learned: string;
  tech: string;
  title: string;
  url: string;
}

export interface SmallBuildStep {
  builds: SmallBuild[];
  note: string;
  title: string;
}

/** Built while teaching myself (late 2022 to mid 2023), before my first job. */
export const smallBuildSteps: SmallBuildStep[] = [
  {
    builds: [
      {
        image: rpsShot,
        learned: "Functions, conditionals and updating the page from code.",
        tech: "JavaScript",
        title: "Rock Paper Scissors",
        url: "https://rps.nirmal-maharjan.com.np/",
      },
      {
        image: blackJackShot,
        learned: "Keeping game state in arrays, and playing sounds.",
        tech: "JavaScript",
        title: "Blackjack",
        url: "https://black-jack.nirmal-maharjan.com.np/",
      },
      {
        image: beatboxShot,
        learned: "Classes, keyboard events and the Audio API.",
        tech: "JavaScript",
        title: "Beat Box",
        url: "https://beatbox.nirmal-maharjan.com.np/",
      },
    ],
    note: "No framework yet. Just the DOM, events and a bit of game logic.",
    title: "Plain JavaScript",
  },
  {
    builds: [
      {
        image: tenziesShot,
        learned: "Components, useState, and effects for the timer.",
        tech: "React",
        title: "Tenzies",
        url: "https://tenzies.nirmal-maharjan.com.np/",
      },
      {
        image: netflixShot,
        learned: "Vue components, shared state with Pinia, and carousels.",
        tech: "Vue 3",
        title: "Netflix Clone",
        url: "https://netflix.nirmal-maharjan.com.np/",
      },
    ],
    note: "Learning to think in components and state.",
    title: "React, then Vue",
  },
];

export const smallBuilds = smallBuildSteps.flatMap((step) => step.builds);

const onHome = new Set(homeWorkProjects.map((p) => p.slug));
const notOnHome = [
  ...workProjects.filter((p) => !(p.placeholder || onHome.has(p.slug))),
  ...learningProjects,
];

/** What the homepage leaves out, for its "View all projects" prompt. */
export const moreProjects = {
  count: notOnHome.length + smallBuilds.length,
  previews: [
    ...notOnHome.flatMap((p) =>
      p.media.type === "image" || p.media.type === "scroll"
        ? [{ image: p.media.image, title: p.title }]
        : []
    ),
    ...smallBuilds,
  ].slice(0, 5),
};
