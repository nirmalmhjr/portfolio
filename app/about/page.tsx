import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/container";
import { bio, education, experience, skills } from "@/lib/resume";

export const metadata: Metadata = {
  title: "About",
  description:
    "Background, skills, experience, and education. Full-stack engineer focused on the frontend.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <Container as="main" className="py-12">
      <PageHeader title="About" />

      <section className="text-muted space-y-4 text-[15px] leading-7">
        {bio.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </section>

      <section className="mt-14">
        <h2 className="text-lg font-semibold tracking-tight">Skills</h2>
        <dl className="mt-4 space-y-4">
          {skills.map((group) => (
            <div
              key={group.category}
              className="grid gap-1 sm:grid-cols-[10rem_1fr]"
            >
              <dt className="text-sm font-medium">{group.category}</dt>
              <dd className="text-muted text-sm">{group.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-14">
        <h2 className="text-lg font-semibold tracking-tight">Experience</h2>
        <div className="mt-4 space-y-8">
          {experience.map((job) => (
            <article key={`${job.company}-${job.start}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <h3 className="font-medium">
                  {job.role} · {job.company}
                </h3>
                <span className="text-muted text-xs">
                  {job.start} – {job.end}
                </span>
              </div>
              <p className="text-muted text-xs">{job.location}</p>
              <p className="text-muted mt-2 text-sm">{job.summary}</p>
              <ul className="text-muted mt-2 list-disc space-y-1 pl-5 text-sm">
                {job.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-lg font-semibold tracking-tight">Education</h2>
        <div className="mt-4 space-y-4">
          {education.map((ed) => (
            <div
              key={ed.school}
              className="flex flex-wrap items-baseline justify-between gap-x-3"
            >
              <div>
                <p className="font-medium">{ed.degree}</p>
                <p className="text-muted text-sm">
                  {ed.school} · {ed.location}
                </p>
              </div>
              <span className="text-muted text-xs">{ed.year}</span>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
