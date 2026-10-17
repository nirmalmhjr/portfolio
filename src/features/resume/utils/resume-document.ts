import { SITE_CONFIG, SOCIAL_LINKS } from "@/configs/site";
import {
  BEFORE_CODE,
  EDUCATION,
  EXPERIENCE,
  LANGUAGES,
  SKILLS,
  TRAINING,
} from "@/features/profile/constants/profile";
import {
  LEARNING_PROJECTS,
  PROJECTS,
} from "@/features/projects/constants/projects";
import type { Project } from "@/features/projects/types/project.types";
import type {
  ResumeJob,
  ResumeLink,
  ResumeProject,
  ResumeRow,
} from "@/features/resume/types/resume.types";

/**
 * The résumé as one model. The /resume page and the downloadable /resume.pdf
 * (app/resume.pdf/route.ts) both render from this, so they always match the
 * rest of the site: edit the profile and projects constants, never the PDF.
 */

const URL_DECORATION = /^https?:\/\/|\/$/g;
const PARENTHESIZED_SUFFIX = /\(([^)]+)\)$/;
const NON_DIAL_CHARACTERS = /[^\d+]/g;
/** CI builds with an example.com URL; the PDF leaves the address out then. */
const PLACEHOLDER_DOMAIN = "example.com";

const STATUS_NOTE: Partial<Record<Project["status"], string>> = {
  "in-progress": "in progress",
  "launching-soon": "preview",
};

const PROJECTS_BY_SLUG = new Map(PROJECTS.map((p) => [p.slug, p]));

/** "https://www.example.com/" -> "www.example.com" */
function bareUrl(url: string): string {
  return url.replace(URL_DECORATION, "");
}

/** "Master of Business Studies (MBS)" -> "MBS" */
function shortTitle(title: string): string {
  return title.match(PARENTHESIZED_SUFFIX)?.[1] ?? title;
}

/** Only show the portfolio address once a real domain is configured. */
const PORTFOLIO_URL = SITE_CONFIG.url.includes(PLACEHOLDER_DOMAIN)
  ? null
  : bareUrl(SITE_CONFIG.url);

const CONTACTS: ResumeLink[] = [
  { href: SOCIAL_LINKS.email, label: SITE_CONFIG.author.email },
  ...(PORTFOLIO_URL ? [{ href: SITE_CONFIG.url, label: PORTFOLIO_URL }] : []),
  ...(SOCIAL_LINKS.linkedin
    ? [
        {
          href: SOCIAL_LINKS.linkedin,
          label: `linkedin.com/in/${SITE_CONFIG.author.linkedin}`,
        },
      ]
    : []),
  {
    href: SOCIAL_LINKS.github,
    label: `github.com/${SITE_CONFIG.author.github}`,
  },
];

/**
 * PDF only. Kept here, not in configs/site.ts, because site config is bundled
 * into client JavaScript and the phone would end up on every page.
 */
const PHONE = "+977 9841684197";

/** The PDF's contact line: the phone goes right after the email. */
export const PDF_CONTACTS: ResumeLink[] = [
  CONTACTS[0],
  { href: `tel:${PHONE.replace(NON_DIAL_CHARACTERS, "")}`, label: PHONE },
  ...CONTACTS.slice(1),
];

const JOBS: ResumeJob[] = EXPERIENCE.map((job) => ({
  company: job.company,
  dates: job.start ? `${job.start} – ${job.end}` : job.end,
  highlights: job.highlights,
  key: `${job.company}-${job.role}-${job.start}`,
  role: job.role,
  sites: (job.projects ?? []).flatMap((slug) => {
    const p = PROJECTS_BY_SLUG.get(slug);
    return p?.url && !p.hidden
      ? [{ href: p.url, label: p.displayUrl, note: STATUS_NOTE[p.status] }]
      : [];
  }),
}));

export const RESUME_DOC = {
  beforeTech: {
    label: "Before tech, 2014–2022:",
    value: BEFORE_CODE.map((row) => `${row.role}, ${row.company}`).join(" · "),
  },
  contacts: CONTACTS,
  education: [
    {
      label: "Education",
      value: EDUCATION.map(
        (row) => `${shortTitle(row.title)}, ${row.place} (${row.year})`
      ).join(" · "),
    },
    {
      label: "Training",
      value: TRAINING.map((t) => `${t.title} (${t.place})`).join(" · "),
    },
  ] satisfies ResumeRow[],
  jobs: JOBS,
  name: SITE_CONFIG.name,
  projects: LEARNING_PROJECTS.map(
    (p): ResumeProject => ({
      description: p.description,
      key: p.slug,
      link: p.url ? { href: p.url, label: bareUrl(p.url) } : undefined,
      tech: p.tech.join(", "),
      title: p.title,
    })
  ),
  skills: [
    ...SKILLS.map((group) => ({
      label: group.category,
      value: group.items
        .map((item) => (item.note ? `${item.name} (${item.note})` : item.name))
        .join(", "),
    })),
    { label: "Spoken", value: LANGUAGES.join(", ") },
  ] satisfies ResumeRow[],
  summary: `Frontend developer with ${SITE_CONFIG.experienceYears} years of experience shipping production websites, e-commerce features and admin dashboards in Next.js, TypeScript, React and Tailwind CSS. Switched to code in 2023 after eight years in finance and pharmaceutical sales, and brings that client communication and deadline discipline to every project.`,
  tagline: `Next.js · TypeScript · React · ${SITE_CONFIG.location}`,
  title: SITE_CONFIG.title,
};
