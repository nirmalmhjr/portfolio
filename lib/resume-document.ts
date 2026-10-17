import { learningProjects, type Project, projects } from "@/lib/projects";
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
  href: string;
  label: string;
  /** Shown after the link, e.g. "preview". */
  note?: string;
}

export interface ResumeRow {
  label: string;
  value: string;
}

export interface ResumeJob {
  company: string;
  dates: string;
  highlights: string[];
  key: string;
  role: string;
  sites: ResumeLink[];
}

export interface ResumeProject {
  description: string;
  key: string;
  link?: ResumeLink;
  tech: string;
  title: string;
}

const statusNote: Partial<Record<Project["status"], string>> = {
  "in-progress": "in progress",
  "launching-soon": "preview",
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
  { href: socialLinks.email, label: siteConfig.author.email },
  ...(portfolioUrl ? [{ href: siteConfig.url, label: portfolioUrl }] : []),
  ...(socialLinks.linkedin
    ? [
        {
          href: socialLinks.linkedin,
          label: `linkedin.com/in/${siteConfig.author.linkedin}`,
        },
      ]
    : []),
  {
    href: socialLinks.github,
    label: `github.com/${siteConfig.author.github}`,
  },
];

/**
 * PDF only. Kept here, not in site.config.ts, because site config is bundled
 * into client JavaScript and the phone would end up on every page.
 */
const phone = "+977 9841684197";

/** The PDF's contact line: the phone goes right after the email. */
export const pdfContacts: ResumeLink[] = [
  contacts[0],
  { href: `tel:${phone.replace(/[^\d+]/g, "")}`, label: phone },
  ...contacts.slice(1),
];

const jobs: ResumeJob[] = experience.map((job) => ({
  company: job.company,
  dates: job.start ? `${job.start} – ${job.end}` : job.end,
  highlights: job.highlights,
  key: `${job.company}-${job.role}-${job.start}`,
  role: job.role,
  sites: (job.projects ?? []).flatMap((slug) => {
    const p = projectsBySlug.get(slug);
    return p?.url && !p.hidden
      ? [{ href: p.url, label: p.displayUrl, note: statusNote[p.status] }]
      : [];
  }),
}));

export const resumeDoc = {
  beforeTech: {
    label: "Before tech, 2014–2022:",
    value: beforeCode.map((row) => `${row.role}, ${row.company}`).join(" · "),
  },
  contacts,
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
  jobs,
  name: siteConfig.name,
  projects: learningProjects.map(
    (p): ResumeProject => ({
      description: p.description,
      key: p.slug,
      link: p.url ? { href: p.url, label: bareUrl(p.url) } : undefined,
      tech: p.tech.join(", "),
      title: p.title,
    })
  ),
  skills: [
    ...skills.map((group) => ({
      label: group.category,
      value: group.items
        .map((item) => (item.note ? `${item.name} (${item.note})` : item.name))
        .join(", "),
    })),
    { label: "Spoken", value: languages.join(", ") },
  ] satisfies ResumeRow[],
  summary: `Frontend developer with ${siteConfig.experienceYears} years of experience shipping production websites, e-commerce features and admin dashboards in Next.js, TypeScript, React and Tailwind CSS. Switched to code in 2023 after eight years in finance and pharmaceutical sales, and brings that client communication and deadline discipline to every project.`,
  tagline: `Next.js · TypeScript · React · ${siteConfig.location}`,
  title: siteConfig.title,
};
