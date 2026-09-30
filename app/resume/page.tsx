import type { Metadata } from "next";
import { Download } from "lucide-react";
import type { ReactNode } from "react";
import { buttonClass } from "@/components/button";
import { resumeDoc, type ResumeRow } from "@/lib/resume-document";
import { siteConfig } from "@/lib/site.config";

export const metadata: Metadata = {
  title: "Résumé",
  description: `Résumé of ${siteConfig.name}, ${siteConfig.title} in ${siteConfig.location}. Next.js, TypeScript, React and Tailwind CSS.`,
  alternates: { canonical: "/resume" },
};

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

/** Label/value rows, used for skills, education and training. */
function Rows({ rows }: { rows: ResumeRow[] }) {
  return (
    <dl className="grid gap-0.5">
      {rows.map((row) => (
        <div key={row.label} className="flex gap-3">
          <dt className={`w-[112px] flex-none font-semibold ${ink}`}>
            {row.label}
          </dt>
          <dd>{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function ResumePage() {
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

      {/* A light "paper" sheet in both themes, laid out like the PDF. */}
      <article className="mx-auto max-w-[210mm] rounded-lg bg-white px-5 py-8 text-[13px] leading-[1.5] text-[#2b2d33] shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:px-[13mm] sm:py-[12mm] print:max-w-none print:rounded-none print:p-0 print:text-[9pt] print:leading-[1.4] print:shadow-none">
        <header className="border-b-2 border-[#111216] pb-3 print:pb-2">
          <h1
            className={`text-[30px] font-bold leading-none tracking-[-0.025em] print:text-[26px] ${ink}`}
          >
            {resumeDoc.name}
          </h1>
          <p className={`mt-2 text-[15px] font-semibold ${ink}`}>
            {resumeDoc.title}
            <span className={`font-normal ${muted}`}>
              {" "}
              · {resumeDoc.tagline}
            </span>
          </p>
          <ul
            className={`mt-1.5 flex flex-wrap items-center gap-x-2.5 text-[12px] ${muted}`}
          >
            {resumeDoc.contacts.map((c, i) => (
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

        <p className="mt-3 print:mt-2">{resumeDoc.summary}</p>

        <Heading>Skills</Heading>
        <Rows rows={resumeDoc.skills} />

        <Heading>Experience</Heading>
        <div className="grid gap-3.5 print:gap-2">
          {resumeDoc.jobs.map((job) => (
            <section key={job.key} className="break-inside-avoid">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <h3 className={`font-semibold ${ink}`}>
                  {job.role}
                  <span className={`font-normal ${muted}`}> · </span>
                  {job.company}
                </h3>
                <p className={`text-[12px] tabular-nums ${muted}`}>
                  {job.dates}
                </p>
              </div>
              <ul className="mt-1 list-disc pl-4 marker:text-[#9a9ea8]">
                {job.highlights.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              {job.sites.length > 0 ? (
                <p className={`mt-1 pl-4 text-[12px] ${muted}`}>
                  <span className={`font-medium ${ink}`}>
                    {job.sites.length > 1 ? "Sites" : "Site"}:
                  </span>{" "}
                  {job.sites.map((site, i) => (
                    <span key={site.href}>
                      {i > 0 ? " · " : ""}
                      <a
                        href={site.href}
                        className={`inline-block py-1 print:py-0 ${link}`}
                      >
                        {site.label}
                      </a>
                      {site.note ? ` (${site.note})` : ""}
                    </span>
                  ))}
                </p>
              ) : null}
            </section>
          ))}
          <p className="break-inside-avoid">
            <span className={`font-semibold ${ink}`}>
              {resumeDoc.beforeTech.label}
            </span>{" "}
            {resumeDoc.beforeTech.value}
          </p>
        </div>

        <Heading>Personal projects</Heading>
        <ul className="grid gap-1.5 print:gap-0.5">
          {resumeDoc.projects.map((project) => (
            <li key={project.key} className="break-inside-avoid">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <p>
                  <span className={`font-semibold ${ink}`}>
                    {project.title}
                  </span>
                  <span className={muted}> · {project.tech}</span>
                </p>
                {project.link ? (
                  <a
                    href={project.link.href}
                    className={`inline-block py-1 text-[12px] print:py-0 ${muted} ${link}`}
                  >
                    {project.link.label}
                  </a>
                ) : null}
              </div>
              <p>{project.description}</p>
            </li>
          ))}
        </ul>

        <Heading>Education & training</Heading>
        <Rows rows={resumeDoc.education} />
      </article>
    </main>
  );
}
