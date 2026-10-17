import type { ReactNode } from "react";
import type { ResumeRow } from "@/features/resume/types/resume.types";
import { RESUME_DOC } from "@/features/resume/utils/resume-document";
import { cn } from "@/lib/utils";

/**
 * The résumé as a light "paper" sheet, in both themes, laid out like the PDF.
 * Used by the /resume page and the résumé dialog opened from the header.
 */

const INK_CLASS = "text-[#111216]";
/** Amber accent, kept in sync with `COLOR` in ResumePdf.tsx. */
const ACCENT_CLASS = "text-[#b45309]";
const MUTED_CLASS = "text-[#5b606b]";
const LINK_CLASS =
  "underline decoration-[#e9bf94] underline-offset-2 hover:decoration-current";

interface HeadingProps {
  readonly children: ReactNode;
}

function Heading({ children }: HeadingProps) {
  return (
    <h2
      className={`mt-5 mb-2 flex items-center gap-3 font-bold text-[11px] uppercase tracking-[0.14em] ${ACCENT_CLASS} print:mt-3 print:mb-1`}
    >
      {children}
      <span aria-hidden className="h-px flex-1 bg-[#f1dfca]" />
    </h2>
  );
}

interface RowsProps {
  readonly rows: ResumeRow[];
}

/** Label/value rows, used for skills, education and training. */
function Rows({ rows }: RowsProps) {
  return (
    <dl className="grid gap-0.5">
      {rows.map((row) => (
        <div className="flex gap-3" key={row.label}>
          <dt className={`w-[112px] flex-none font-semibold ${INK_CLASS}`}>
            {row.label}
          </dt>
          <dd>{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

interface ResumeSheetProps {
  readonly className?: string;
  /** id for the name heading, so a dialog can use it as its label. */
  readonly titleId?: string;
}

export function ResumeSheet({ className, titleId }: ResumeSheetProps) {
  return (
    <article
      className={cn(
        "mx-auto max-w-[210mm] rounded-lg bg-white px-5 py-8 text-[#2b2d33] text-[13px] leading-[1.5] shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:px-[13mm] sm:py-[12mm] print:max-w-none print:rounded-none print:p-0 print:text-[9pt] print:leading-[1.4] print:shadow-none",
        className
      )}
    >
      <header className="border-[#b45309] border-b-2 pb-3 print:pb-2">
        <h1
          className={`font-bold text-[30px] leading-none tracking-[-0.025em] print:text-[26px] ${INK_CLASS}`}
          id={titleId}
        >
          {RESUME_DOC.name}
        </h1>
        <p className={`mt-2 font-semibold text-[15px] ${INK_CLASS}`}>
          {RESUME_DOC.title}
          <span className={`font-normal ${MUTED_CLASS}`}>
            {" "}
            · {RESUME_DOC.tagline}
          </span>
        </p>
        <ul
          className={`mt-1.5 flex flex-wrap items-center gap-x-2.5 text-[12px] ${MUTED_CLASS}`}
        >
          {RESUME_DOC.contacts.map((c, i) => (
            <li className="flex items-center gap-x-2.5" key={c.href}>
              {i > 0 ? (
                <span
                  aria-hidden
                  className="hidden h-3 w-px bg-[#c4c8d0] sm:block print:block"
                />
              ) : null}
              <a className="inline-block py-1 print:py-0" href={c.href}>
                {c.label}
              </a>
            </li>
          ))}
        </ul>
      </header>

      <p className="mt-3 print:mt-2">{RESUME_DOC.summary}</p>

      <Heading>Skills</Heading>
      <Rows rows={RESUME_DOC.skills} />

      <Heading>Experience</Heading>
      <div className="grid gap-3.5 print:gap-2">
        {RESUME_DOC.jobs.map((job) => (
          <section className="break-inside-avoid" key={job.key}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <h3 className={`font-semibold ${INK_CLASS}`}>
                {job.role}
                <span className={`font-normal ${MUTED_CLASS}`}> · </span>
                {job.company}
              </h3>
              <p className={`text-[12px] tabular-nums ${MUTED_CLASS}`}>
                {job.dates}
              </p>
            </div>
            <ul className="mt-1 list-disc pl-4 marker:text-[#d97706]">
              {job.highlights.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            {job.sites.length > 0 ? (
              <p className={`mt-1 pl-4 text-[12px] ${MUTED_CLASS}`}>
                <span className={`font-medium ${INK_CLASS}`}>
                  {job.sites.length > 1 ? "Sites" : "Site"}:
                </span>{" "}
                {job.sites.map((site, i) => (
                  <span key={site.href}>
                    {i > 0 ? " · " : ""}
                    <a
                      className={`inline-block py-1 print:py-0 ${LINK_CLASS}`}
                      href={site.href}
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
          <span className={`font-semibold ${INK_CLASS}`}>
            {RESUME_DOC.beforeTech.label}
          </span>{" "}
          {RESUME_DOC.beforeTech.value}
        </p>
      </div>

      <Heading>Personal projects</Heading>
      <ul className="grid gap-1.5 print:gap-0.5">
        {RESUME_DOC.projects.map((project) => (
          <li className="break-inside-avoid" key={project.key}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <p>
                <span className={`font-semibold ${INK_CLASS}`}>
                  {project.title}
                </span>
                <span className={MUTED_CLASS}> · {project.tech}</span>
              </p>
              {project.link ? (
                <a
                  className={`inline-block py-1 text-[12px] print:py-0 ${MUTED_CLASS} ${LINK_CLASS}`}
                  href={project.link.href}
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
      <Rows rows={RESUME_DOC.education} />
    </article>
  );
}
