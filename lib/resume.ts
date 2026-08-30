/**
 * Content for the About page. Replace with your real CV once provided —
 * the structure is designed to map cleanly onto a standard resume.
 */

export const bio = [
  "I'm a full-stack engineer with around eight years of experience building web applications, with the last four focused heavily on the frontend and design systems.",
  "I like working close to the product: talking to users, shipping small changes often, and paying down complexity before it compounds. Most of my work lives in the React/Next.js ecosystem, but I'm comfortable across the stack — Node services, Postgres, and the occasional Go binary.",
  "Outside of work I write about JavaScript fundamentals and maintain a few open-source tools.",
];

export interface SkillGroup {
  category: string;
  items: string[];
}

export const skills: SkillGroup[] = [
  {
    category: "Languages",
    items: ["TypeScript", "JavaScript (ES2023)", "HTML", "CSS", "SQL", "Go"],
  },
  {
    category: "Frameworks & Libraries",
    items: [
      "React",
      "Next.js",
      "Remix",
      "Node.js",
      "Express",
      "Vitest",
      "Playwright",
    ],
  },
  {
    category: "Styling & Design",
    items: [
      "Tailwind CSS",
      "CSS Modules",
      "Radix UI",
      "Figma",
      "Design systems",
    ],
  },
  {
    category: "Infrastructure",
    items: [
      "Vercel",
      "AWS (ECS, Lambda, RDS)",
      "Docker",
      "GitHub Actions",
      "Turborepo",
    ],
  },
  {
    category: "Data",
    items: ["PostgreSQL", "Prisma", "Redis", "SQLite", "GraphQL"],
  },
];

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  start: string;
  end: string;
  summary: string;
  highlights: string[];
}

export const experience: ExperienceItem[] = [
  {
    role: "Senior Frontend Engineer",
    company: "Northwind Labs",
    location: "Remote",
    start: "2022",
    end: "Present",
    summary:
      "Lead frontend for a B2B analytics platform used by ~40k weekly active users.",
    highlights: [
      "Migrated a legacy CRA app to Next.js App Router, cutting Largest Contentful Paint by 45%.",
      "Built and documented a 60-component design system adopted by four product teams.",
      "Introduced visual regression testing in CI, catching an average of three UI regressions per week before release.",
    ],
  },
  {
    role: "Full-Stack Engineer",
    company: "Harbor & Co.",
    location: "Berlin, DE",
    start: "2019",
    end: "2022",
    summary:
      "Worked across a Rails + React e-commerce codebase serving 2M monthly visitors.",
    highlights: [
      "Owned the checkout rewrite that lifted conversion by 8%.",
      "Reduced p95 API latency from 800ms to 220ms by adding read replicas and query caching.",
    ],
  },
  {
    role: "Frontend Developer",
    company: "Bright Digital",
    location: "Kathmandu, NP",
    start: "2017",
    end: "2019",
    summary:
      "Agency work: built marketing sites and web apps for a dozen clients.",
    highlights: [
      "Shipped 15+ production sites on tight timelines.",
      "Standardized the team's starter template, halving project setup time.",
    ],
  },
];

export interface EducationItem {
  degree: string;
  school: string;
  location: string;
  year: string;
}

export const education: EducationItem[] = [
  {
    degree: "B.Sc. in Computer Science",
    school: "Tribhuvan University",
    location: "Kathmandu, NP",
    year: "2016",
  },
];
