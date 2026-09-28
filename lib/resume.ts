import { siteConfig } from "@/lib/site.config";

/**
 * Profile content: story, experience, skills, education and strengths.
 * Based on Nirmal's résumé (Nov 2025) plus the current role.
 */

/** Short intro used on the homepage About section. */
export const story = [
  "I started my career in accounting, then spent years in pharmaceutical sales, meeting clients every day and working to targets. Along the way I kept noticing how much good software shaped the work.",
  "In 2023 I made the switch. I taught myself JavaScript, React and Vue, joined Miracle Yard as an intern, and migrated a live restaurant platform on my own within a year. At Galli Maps I built the public website and the admin dashboard behind it.",
  "Today I work mainly in Next.js and TypeScript, building company websites, landing pages and CMS dashboards. My business background helps me ask the right questions before I write code.",
];

export const languages = ["Nepali", "Newari", "English", "Hindi"];
export const hobbies = ["⚽ Futsal", "♫ Music"];

/** The four figures under the hero. Keep each one verifiable. */
export const facts = [
  {
    value: `${siteConfig.experienceYears} yrs`,
    label: "building production frontends",
  },
  { value: "8+", label: "client projects built" },
  { value: "3", label: "admin dashboards built end to end" },
  { value: "8 yrs", label: "client-facing work before code" },
];

export interface ExperienceItem {
  role: string;
  company: string;
  companyUrl?: string;
  /** e.g. "Dec 2024". Leave empty to show only the end label. */
  start: string;
  end: string;
  current?: boolean;
  highlights: string[];
  tech: string[];
  /** Tech that gets the accent highlight. */
  primaryTech?: string[];
}

export const experience: ExperienceItem[] = [
  {
    role: "Frontend Developer",
    company: "Plex Bit Infosystems",
    companyUrl: "https://pbinfosystems.com",
    // TODO: add your start month, e.g. "Jul 2025".
    start: "",
    end: "Present",
    current: true,
    highlights: [
      "Built the Paradise Hills Resort website and its admin dashboard entirely on my own (launching soon).",
      "Built the entire CMS admin dashboard that powers the company's new website, and about half of the site's frontend.",
      "Redesigned the landing pages for Plexler (an AI learning platform), Sierra Adventurer and Prabhu Adventure, plus reusable inner-page components for Prabhu.",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    primaryTech: ["Next.js", "TypeScript"],
  },
  {
    role: "Frontend Developer",
    company: "Galli Maps",
    companyUrl: "https://gallimaps.com",
    start: "Dec 2024",
    end: "Jun 2025",
    highlights: [
      "Built the redesigned public website for Galli Maps, a Nepali maps app with 200K+ downloads.",
      "Built the internal admin dashboard the team uses to manage the website, in React and Tailwind CSS.",
      "Built Product Management, Order Processing and Bulk Message modules for the Nepal Dairy Project in Next.js.",
      "Worked closely with the backend team to integrate REST APIs.",
    ],
    tech: ["React", "Next.js", "Tailwind CSS", "REST APIs"],
    primaryTech: ["React", "Next.js"],
  },
  {
    role: "Frontend Developer",
    company: "Miracle Yard",
    start: "Jun 2024",
    end: "Sep 2024",
    highlights: [
      "Migrated meromenu.com, a live restaurant management system, from Vue 2/Nuxt 2 to Vue 3/Nuxt 3 on my own, within my first year as a developer.",
      "Modernized the codebase for better performance and easier long-term maintenance.",
    ],
    tech: ["Vue 3", "Nuxt 3"],
  },
  {
    role: "Frontend Intern",
    company: "Miracle Yard",
    start: "Nov 2023",
    end: "Feb 2024",
    highlights: [
      "Supported senior developers in the early stages of a Vue 2 to Vue 3 migration.",
      "Learned component structure, routing and Git workflows on internal projects.",
    ],
    tech: ["Vue", "Nuxt", "Git"],
  },
];

/** Career before code, shown as a small ledger. */
export const beforeCode = [
  {
    period: "2022",
    role: "Territory Executive",
    company: "Shree Om Brothers (Pfizer India)",
    carried: "Clear communication with clients",
  },
  {
    period: "2017–22",
    role: "Medical Sales Officer",
    company: "Omnica Laboratories",
    carried: "Understanding what users actually need",
  },
  {
    period: "2014–17",
    role: "Account Officer",
    company: "Max International",
    carried: "Accuracy, records and deadlines",
  },
];

export const education = [
  {
    title: "Master of Business Studies (MBS)",
    place: "Shankar Dev Campus",
    year: "2019",
  },
  {
    title: "Bachelor of Business Studies (BBS)",
    place: "Public Youth Campus",
    year: "2011",
  },
  { title: "CA Foundation", place: "ICAN", year: "2009" },
];

export const training = [
  {
    title: "UI/UX Design crash course",
    place: "Deerwalk Training Center",
    year: "Course",
  },
  { title: "JavaScript and React", place: "freeCodeCamp", year: "Self-study" },
  { title: "Vue.js", place: "The Net Ninja", year: "Self-study" },
];

export interface SkillGroup {
  category: string;
  items: { name: string; primary?: boolean; note?: string }[];
}

export const skills: SkillGroup[] = [
  {
    category: "Languages",
    items: [
      { name: "TypeScript", primary: true },
      { name: "JavaScript", primary: true },
      { name: "HTML" },
      { name: "CSS" },
    ],
  },
  {
    category: "Frameworks",
    items: [
      { name: "Next.js", primary: true },
      { name: "React", primary: true },
      { name: "Vue 3", note: "earlier" },
      { name: "Nuxt 3", note: "earlier" },
    ],
  },
  {
    category: "Styling & motion",
    items: [
      { name: "Tailwind CSS", primary: true },
      { name: "GSAP" },
      { name: "Responsive design" },
      { name: "Figma" },
    ],
  },
  {
    category: "Data & tools",
    items: [
      { name: "REST APIs" },
      { name: "Node.js" },
      { name: "MongoDB" },
      { name: "Git & GitHub" },
      { name: "Vercel" },
    ],
  },
];

export type StrengthIcon = "code" | "dashboard" | "migrate" | "business";

/** "What I bring": each point is backed by a project or role on the page. */
export const strengths: {
  title: string;
  description: string;
  icon: StrengthIcon;
}[] = [
  {
    title: "Production Next.js & TypeScript",
    description:
      "I build and ship client websites and landing pages at Plex Bit, from design to production.",
    icon: "code",
  },
  {
    title: "Dashboards end to end",
    description:
      "I built the admin dashboards for Paradise Hills Resort (solo), the new Plex Bit website and Galli Maps.",
    icon: "dashboard",
  },
  {
    title: "Learns fast, owns the work",
    description:
      "Within my first year as a developer, I migrated a live product from Vue 2 to Vue 3 on my own.",
    icon: "migrate",
  },
  {
    title: "Business and client sense",
    description:
      "Eight years in finance and sales taught me to understand requirements, talk to clients and hit deadlines.",
    icon: "business",
  },
];
