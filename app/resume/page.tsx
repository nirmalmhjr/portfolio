import type { Metadata } from "next";
import { Download } from "lucide-react";
import type { ReactNode } from "react";
import { buttonClass } from "@/components/button";
import { projects } from "@/lib/projects";
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

const summary = `Frontend developer with ${siteConfig.experienceYears} years of experience building production websites, landing pages and CMS dashboards in Next.js, TypeScript, React and Tailwind CSS. Built a complete CMS admin dashboard and redesigned landing pages for several client products. Spent eight years in finance and pharmaceutical sales before switching to code in 2023, which brings strong client communication and a deadline-driven way of working.`;

/** "Master of Business Studies (MBS)" -> "MBS" */
function shortTitle(title: string): string {
  return title.match(/\(([^)]+)\)$/)?.[1] ?? title;
}

function Heading({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-2 mt-5 border-b border-[#d9dbe1] pb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#4f46e5] print:mb-1.5 print:mt-3">
      {children}
    </h2>
  );
}

export default function ResumePage() {
  const shown = projects.filter((p) => !p.placeholder);
  const clientProjects = shown.filter((p) => p.kind === "client");
  const personalProjects = shown.filter((p) => p.kind === "personal");

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
      <article className="mx-auto max-w-[210mm] rounded-lg bg-white px-[12mm] py-[11mm] text-[13px] leading-[1.5] text-[#2b2d33] shadow-[0_30px_80px_rgba(0,0,0,0.35)] print:max-w-none print:rounded-none print:p-0 print:text-[9.25pt] print:leading-[1.42] print:shadow-none">
        <header>
          <h1 className="text-[28px] font-bold leading-tight tracking-[-0.02em] text-[#111216]">
            {siteConfig.name}
          </h1>
          <p className="mt-0.5 text-[15px] font-medium text-[#111216]">
            {siteConfig.title} · Next.js, TypeScript, React
          </p>
          <p className="mt-2 flex flex-wrap gap-x-3 gap-y-0.5 text-[12px] text-[#555a64]">
            <a href={`mailto:${siteConfig.author.email}`}>
              {siteConfig.author.email}
            </a>
            <span aria-hidden>·</span>
            <a href={socialLinks.github}>
              github.com/{siteConfig.author.github}
            </a>
            {socialLinks.linkedin ? (
              <>
                <span aria-hidden>·</span>
                <a href={socialLinks.linkedin}>
                  linkedin.com/in/{siteConfig.author.linkedin}
                </a>
              </>
            ) : null}
            {portfolioUrl ? (
              <>
                <span aria-hidden>·</span>
                <a href={siteConfig.url}>{portfolioUrl}</a>
              </>
            ) : null}
            <span aria-hidden>·</span>
            <span>{siteConfig.location}</span>
          </p>
        </header>

        <Heading>Summary</Heading>
        <p>{summary}</p>

        <Heading>Skills</Heading>
        <dl className="grid gap-0.5">
          {skills.map((group) => (
            <div key={group.category} className="flex gap-2">
              <dt className="w-[118px] flex-none font-semibold text-[#111216]">
                {group.category}
              </dt>
              <dd>
                {group.items
                  .map((item) =>
                    item.note ? `${item.name} (${item.note})` : item.name
                  )
                  .join(", ")}
              </dd>
            </div>
          ))}
          <div className="flex gap-2">
            <dt className="w-[118px] flex-none font-semibold text-[#111216]">
              Spoken
            </dt>
            <dd>{languages.join(", ")}</dd>
          </div>
        </dl>

        <Heading>Experience</Heading>
        <div className="grid gap-3 print:gap-2">
          {experience.map((job) => (
            <section
              key={`${job.company}-${job.role}-${job.start}`}
              className="break-inside-avoid"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <h3 className="font-semibold text-[#111216]">
                  {job.role}, {job.company}
                </h3>
                <p className="text-[12px] text-[#555a64]">
                  {job.start ? `${job.start} – ${job.end}` : job.end}
                </p>
              </div>
              <ul className="mt-1 list-disc pl-4 marker:text-[#9a9ea8]">
                {job.highlights.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </section>
          ))}
          <p className="break-inside-avoid">
            <span className="font-semibold text-[#111216]">
              Earlier career (2014–2022)
            </span>
            :{" "}
            {beforeCode
              .map((row) => `${row.role}, ${row.company}`)
              .reverse()
              .join(" · ")}
          </p>
        </div>

        <Heading>Selected projects</Heading>
        <ul className="grid gap-0.5">
          {clientProjects.map((project) => (
            <li key={project.slug} className="flex justify-between gap-3">
              <span>
                <span className="font-semibold text-[#111216]">
                  {project.title}
                </span>
                : {project.myPart}
              </span>
              {project.url ? (
                <a
                  href={project.url}
                  className="inline-block whitespace-nowrap py-1 text-[12px] text-[#4f46e5] print:py-0"
                >
                  {project.displayUrl}
                  {project.status === "launching-soon" ? " (preview)" : ""}
                </a>
              ) : null}
            </li>
          ))}
          <li>
            <span className="font-semibold text-[#111216]">Personal</span>:{" "}
            {personalProjects.map((project, i) => (
              <span key={project.slug}>
                {i > 0 ? ", " : ""}
                {project.url ? (
                  <a
                    href={project.url}
                    className="inline-block py-1 text-[#4f46e5] underline underline-offset-2 print:py-0"
                  >
                    {project.title}
                  </a>
                ) : (
                  project.title
                )}{" "}
                ({project.tech.slice(0, 2).join(", ")})
              </span>
            ))}
          </li>
        </ul>

        <Heading>Education & training</Heading>
        <p>
          <span className="font-semibold text-[#111216]">Education</span>:{" "}
          {education
            .map(
              (row) => `${shortTitle(row.title)}, ${row.place} (${row.year})`
            )
            .join(" · ")}
        </p>
        <p className="mt-0.5">
          <span className="font-semibold text-[#111216]">Training</span>:{" "}
          {training.map((t) => `${t.title} (${t.place})`).join(" · ")}
        </p>
      </article>
    </main>
  );
}
