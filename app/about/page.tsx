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
    <Container as="main">
      <PageHeader eyebrow="About" title="A bit about me" />

      <div className="text-muted space-y-4 text-[1.0625rem] leading-relaxed">
        {bio.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-bold">Skills</h2>
        <dl className="mt-4 space-y-4">
          {skills.map((group) => (
            <div key={group.category} className="sm:flex sm:gap-6">
              <dt className="text-muted w-40 shrink-0 text-sm font-semibold">
                {group.category}
              </dt>
              <dd className="mt-1 flex flex-wrap gap-1.5 sm:mt-0">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="bg-muted rounded-md px-2 py-0.5 text-sm"
                  >
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold">Experience</h2>
        <div className="mt-4 space-y-8">
          {experience.map((job) => (
            <article key={`${job.company}-${job.start}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <h3 className="font-bold">
                  {job.role}{" "}
                  <span className="text-muted font-normal">
                    · {job.company}
                  </span>
                </h3>
                <span className="text-muted text-xs">
                  {job.start} – {job.end}
                </span>
              </div>
              <p className="text-muted mt-0.5 text-xs">{job.location}</p>
              <p className="text-muted mt-2 text-sm">{job.summary}</p>
              <ul className="mt-2 space-y-1.5">
                {job.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="text-muted relative pl-5 text-sm before:absolute before:left-0 before:text-accent before:content-['–']"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold">Education</h2>
        <div className="mt-4 space-y-3">
          {education.map((ed) => (
            <div
              key={ed.school}
              className="flex flex-wrap items-baseline justify-between gap-x-3"
            >
              <div>
                <p className="font-semibold">{ed.degree}</p>
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
