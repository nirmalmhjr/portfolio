/**
 * Profile content: story, experience, skills, education and services.
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

export const facts = [
  { value: "1.5+ yrs", label: "building production frontends" },
  { value: "8+", label: "client projects delivered" },
  { value: "8 yrs", label: "in finance and sales before code" },
  { value: "4", label: "languages spoken" },
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
      "Built around half of the frontend and the entire CMS dashboard for the company's new website.",
      "Redesigned the landing pages for Plexler, Sierra Adventurer and Prabhu Adventure, plus inner page components for Prabhu Adventure.",
      "Work mainly in Next.js, TypeScript and Tailwind CSS.",
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
      "Built the redesigned gallimaps.com website with better responsiveness and user experience.",
      "Built the internal admin dashboard for managing the website, using React and Tailwind CSS.",
      "Built Product Management, Order Processing and Bulk Message modules for the Nepal Dairy Project in Next.js.",
      "Worked with the backend team to integrate APIs.",
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
      "Migrated meromenu.com, a restaurant management system, from Vue 2/Nuxt 2 to Vue 3/Nuxt 3 on my own.",
      "Modernized the codebase for better performance and long-term maintenance.",
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

export type ServiceIcon = "landing" | "dashboard" | "code" | "migrate";

export const services: {
  title: string;
  description: string;
  icon: ServiceIcon;
}[] = [
  {
    title: "Landing pages & redesigns",
    description:
      "Modern, responsive landing pages, like my redesigns for Plexler, Sierra Adventurer and Prabhu Adventure.",
    icon: "landing",
  },
  {
    title: "CMS & admin dashboards",
    description:
      "Dashboards that let teams manage their own content and data, like the Plex Bit CMS.",
    icon: "dashboard",
  },
  {
    title: "Next.js web apps",
    description:
      "Fast, SEO-friendly apps built with the App Router, TypeScript and Tailwind CSS.",
    icon: "code",
  },
  {
    title: "Upgrades & migrations",
    description:
      "Modernizing older codebases, like moving meromenu.com from Vue 2 to Vue 3.",
    icon: "migrate",
  },
];
