import { learningProjects, projects, type Project } from "@/lib/projects";
import {
  beforeCode,
  education,
  experience,
  languages,
  skills,
  training,
} from "@/lib/resume";
import { siteConfig, socialLinks } from "@/lib/site.config";

/**
 * The résumé as one model. The /resume page and the downloadable /resume.pdf
 * (app/resume.pdf/route.ts) both render from this, so they always match the
 * rest of the site: edit lib/resume.ts or lib/projects.ts, never the PDF.
 */

export interface ResumeLink {
  label: string;
  href: string;
  /** Shown after the link, e.g. "preview". */
  note?: string;
}

export interface ResumeRow {
  label: string;
  value: string;
}

export interface ResumeJob {
  key: string;
  role: string;
  company: string;
  dates: string;
  highlights: string[];
  sites: ResumeLink[];
}

export interface ResumeProject {
  key: string;
  title: string;
  tech: string;
  description: string;
  link?: ResumeLink;
}

const statusNote: Partial<Record<Project["status"], string>> = {
  "launching-soon": "preview",
  "in-progress": "in progress",
};

const projectsBySlug = new Map(projects.map((p) => [p.slug, p]));

/** "https://www.example.com/" -> "www.example.com" */
function bareUrl(url: string): string {
  return url.replace(/^https?:\/\/|\/$/g, "");
}

/** "Master of Business Studies (MBS)" -> "MBS" */
function shortTitle(title: string): string {
  return title.match(/\(([^)]+)\)$/)?.[1] ?? title;
}

/** Only show the portfolio address once a real domain is configured. */
const portfolioUrl = siteConfig.url.includes("example.com")
  ? null
  : bareUrl(siteConfig.url);

const contacts: ResumeLink[] = [
  { label: siteConfig.author.email, href: socialLinks.email },
  ...(portfolioUrl ? [{ label: portfolioUrl, href: siteConfig.url }] : []),
  ...(socialLinks.linkedin
    ? [
        {
          label: `linkedin.com/in/${siteConfig.author.linkedin}`,
          href: socialLinks.linkedin,
        },
      ]
    : []),
  {
    label: `github.com/${siteConfig.author.github}`,
    href: socialLinks.github,
  },
];

const jobs: ResumeJob[] = experience.map((job) => ({
  key: `${job.company}-${job.role}-${job.start}`,
  role: job.role,
  company: job.company,
  dates: job.start ? `${job.start} – ${job.end}` : job.end,
  highlights: job.highlights,
  sites: (job.projects ?? []).flatMap((slug) => {
    const p = projectsBySlug.get(slug);
    return p?.url && !p.hidden
      ? [{ label: p.displayUrl, href: p.url, note: statusNote[p.status] }]
      : [];
  }),
}));

export const resumeDoc = {
  name: siteConfig.name,
  title: siteConfig.title,
  tagline: `Next.js · TypeScript · React · ${siteConfig.location}`,
  contacts,
  summary: `Frontend developer with ${siteConfig.experienceYears} years of experience shipping production websites, e-commerce features and admin dashboards in Next.js, TypeScript, React and Tailwind CSS. Switched to code in 2023 after eight years in finance and pharmaceutical sales, and brings that client communication and deadline discipline to every project.`,
  skills: [
    ...skills.map((group) => ({
      label: group.category,
      value: group.items
        .map((item) => (item.note ? `${item.name} (${item.note})` : item.name))
        .join(", "),
    })),
    { label: "Spoken", value: languages.join(", ") },
  ] satisfies ResumeRow[],
  jobs,
  beforeTech: {
    label: "Before tech, 2014–2022:",
    value: beforeCode.map((row) => `${row.role}, ${row.company}`).join(" · "),
  },
  projects: learningProjects.map((p): ResumeProject => ({
    key: p.slug,
    title: p.title,
    tech: p.tech.join(", "),
    description: p.description,
    link: p.url ? { label: bareUrl(p.url), href: p.url } : undefined,
  })),
  education: [
    {
      label: "Education",
      value: education
        .map((row) => `${shortTitle(row.title)}, ${row.place} (${row.year})`)
        .join(" · "),
    },
    {
      label: "Training",
      value: training.map((t) => `${t.title} (${t.place})`).join(" · "),
    },
  ] satisfies ResumeRow[],
};
