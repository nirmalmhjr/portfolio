import type { Metadata } from "next";
import { Download } from "lucide-react";
import type { ReactNode } from "react";
import { buttonClass } from "@/components/button";
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

export const metadata: Metadata = {
  title: "Résumé",
  description: `Résumé of ${siteConfig.name}, ${siteConfig.title} in ${siteConfig.location}. Next.js, TypeScript, React and Tailwind CSS.`,
  alternates: { canonical: "/resume" },
};

/** Only show the portfolio address once a real domain is configured. */
const portfolioUrl = siteConfig.url.includes("example.com")
  ? null
  : siteConfig.url.replace(/^https?:\/\//, "");

const summary = `Frontend developer with ${siteConfig.experienceYears} years of experience shipping production websites, e-commerce features and admin dashboards in Next.js, TypeScript, React and Tailwind CSS. Switched to code in 2023 after eight years in finance and pharmaceutical sales, and brings that client communication and deadline discipline to every project.`;

const statusNote: Partial<Record<Project["status"], string>> = {
  "launching-soon": "preview",
  "in-progress": "in progress",
};

const projectsBySlug = new Map(projects.map((p) => [p.slug, p]));

/** "Master of Business Studies (MBS)" -> "MBS" */
function shortTitle(title: string): string {
  return title.match(/\(([^)]+)\)$/)?.[1] ?? title;
}

const ink = "text-[#111216]";
const muted = "text-[#5b606b]";
const link =
  "underline decoration-[#c4c8d0] underline-offset-2 hover:decoration-current";

function Heading({ children }: { children: ReactNode }) {
  return (
    <h2
      className={`mb-2 mt-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.14em] ${ink} print:mb-1 print:mt-3`}
    >
      {children}
      <span aria-hidden className="h-px flex-1 bg-[#dfe1e6]" />
    </h2>
  );
}

/** A label/value row, used for skills, education and training. */
function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex gap-3">
      <dt className={`w-[112px] flex-none font-semibold ${ink}`}>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

export default function ResumePage() {
  const contacts = [
    { label: siteConfig.author.email, href: socialLinks.email },
    portfolioUrl ? { label: portfolioUrl, href: siteConfig.url } : null,
    socialLinks.linkedin
      ? {
          label: `linkedin.com/in/${siteConfig.author.linkedin}`,
          href: socialLinks.linkedin,
        }
      : null,
    {
      label: `github.com/${siteConfig.author.github}`,
      href: socialLinks.github,
    },
  ].filter((c) => c !== null);

  return (
    <main className="px-4 pb-24 pt-[112px] sm:pt-[132px] print:p-0">
      <div className="mx-auto mb-6 flex max-w-[210mm] flex-wrap items-center justify-between gap-3 print:hidden">
        <div>
          <p className="eyebrow">Résumé</p>
          <p className="mt-2 text-sm text-muted">
            Same content as the PDF, always up to date.
          </p>
        </div>
        <a
          href={siteConfig.resumeUrl}
          download={siteConfig.resumeFileName}
          className={buttonClass("primary")}
        >
          <Download aria-hidden />
          Download PDF
        </a>
      </div>

      {/* A light "paper" sheet in both themes, so it prints the same way it looks. */}
      <article className="mx-auto max-w-[210mm] rounded-lg bg-white px-5 py-8 text-[13px] leading-[1.5] text-[#2b2d33] shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:px-[13mm] sm:py-[12mm] print:max-w-none print:rounded-none print:p-0 print:text-[9pt] print:leading-[1.4] print:shadow-none">
        <header className="border-b-2 border-[#111216] pb-3 print:pb-2">
          <h1
            className={`text-[30px] font-bold leading-none tracking-[-0.025em] print:text-[26px] ${ink}`}
          >
            {siteConfig.name}
          </h1>
          <p className={`mt-2 text-[15px] font-semibold ${ink}`}>
            {siteConfig.title}
            <span className={`font-normal ${muted}`}>
              {" "}
              · Next.js · TypeScript · React · {siteConfig.location}
            </span>
          </p>
          <ul
            className={`mt-1.5 flex flex-wrap items-center gap-x-2.5 text-[12px] ${muted}`}
          >
            {contacts.map((c, i) => (
              <li key={c.href} className="flex items-center gap-x-2.5">
                {i > 0 ? (
                  <span
                    aria-hidden
                    className="hidden h-3 w-px bg-[#c4c8d0] sm:block print:block"
                  />
                ) : null}
                <a href={c.href} className="inline-block py-1 print:py-0">
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </header>

        <p className="mt-3 print:mt-2">{summary}</p>

        <Heading>Skills</Heading>
        <dl className="grid gap-0.5">
          {skills.map((group) => (
            <Row key={group.category} label={group.category}>
              {group.items
                .map((item) =>
                  item.note ? `${item.name} (${item.note})` : item.name
                )
                .join(", ")}
            </Row>
          ))}
          <Row label="Spoken">{languages.join(", ")}</Row>
        </dl>

        <Heading>Experience</Heading>
        <div className="grid gap-3.5 print:gap-2">
          {experience.map((job) => {
            const sites = (job.projects ?? [])
              .map((slug) => projectsBySlug.get(slug))
              .filter((p): p is Project => Boolean(p?.url && !p.hidden));

            return (
              <section
                key={`${job.company}-${job.role}-${job.start}`}
                className="break-inside-avoid"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <h3 className={`font-semibold ${ink}`}>
                    {job.role}
                    <span className={`font-normal ${muted}`}> · </span>
                    {job.company}
                  </h3>
                  <p className={`text-[12px] tabular-nums ${muted}`}>
                    {job.start ? `${job.start} – ${job.end}` : job.end}
                  </p>
                </div>
                <ul className="mt-1 list-disc pl-4 marker:text-[#9a9ea8]">
                  {job.highlights.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                {sites.length > 0 ? (
                  <p className={`mt-1 pl-4 text-[12px] ${muted}`}>
                    <span className={`font-medium ${ink}`}>
                      {sites.length > 1 ? "Sites" : "Site"}:
                    </span>{" "}
                    {sites.map((p, i) => (
                      <span key={p.slug}>
                        {i > 0 ? " · " : ""}
                        <a
                          href={p.url}
                          className={`inline-block py-1 print:py-0 ${link}`}
                        >
                          {p.displayUrl}
                        </a>
                        {statusNote[p.status]
                          ? ` (${statusNote[p.status]})`
                          : ""}
                      </span>
                    ))}
                  </p>
                ) : null}
              </section>
            );
          })}
          <p className="break-inside-avoid">
            <span className={`font-semibold ${ink}`}>
              Before tech, 2014–2022:
            </span>{" "}
            {beforeCode.map((row) => `${row.role}, ${row.company}`).join(" · ")}
          </p>
        </div>

        <Heading>Personal projects</Heading>
        <ul className="grid gap-1.5 print:gap-0.5">
          {learningProjects.map((project) => (
            <li key={project.slug} className="break-inside-avoid">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <p>
                  <span className={`font-semibold ${ink}`}>
                    {project.title}
                  </span>
                  <span className={muted}> · {project.tech.join(", ")}</span>
                </p>
                {project.url ? (
                  <a
                    href={project.url}
                    className={`inline-block py-1 text-[12px] print:py-0 ${muted} ${link}`}
                  >
                    {project.url.replace(/^https?:\/\/|\/$/g, "")}
                  </a>
                ) : null}
              </div>
              <p>{project.description}</p>
            </li>
          ))}
        </ul>

        <Heading>Education & training</Heading>
        <dl className="grid gap-0.5">
          <Row label="Education">
            {education
              .map(
                (row) => `${shortTitle(row.title)}, ${row.place} (${row.year})`
              )
              .join(" · ")}
          </Row>
          <Row label="Training">
            {training.map((t) => `${t.title} (${t.place})`).join(" · ")}
          </Row>
        </dl>
      </article>
    </main>
  );
}
