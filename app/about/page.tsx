import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/container";
import { bio, education, experience, skills } from "@/lib/resume";

export const metadata: Metadata = {
  title: "About",
  description:
    "Background, skills, experience, and education. Full-stack engineer focused on the frontend.",
  alternates: { canonical: "/about" },
};

function SectionLabel({ children }: { children: string }) {
  return (
    <h2 className="label sticky top-20 hidden pt-1 lg:block">{children}</h2>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-4 border-t border-border/70 py-10 first:border-t-0 lg:grid-cols-[10rem_1fr]">
      {children}
    </div>
  );
}

export default function AboutPage() {
  return (
    <Container as="main">
      <PageHeader
        label="About"
        title="Building for the web, close to the product."
        description={bio[0]}
      />

      <div className="mt-4">
        <Row>
          <SectionLabel>Bio</SectionLabel>
          <div className="text-muted space-y-4 text-[15px] leading-7 lg:text-base">
            {bio.slice(1).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </Row>

        <Row>
          <SectionLabel>Skills</SectionLabel>
          <dl className="space-y-5">
            {skills.map((group) => (
              <div key={group.category}>
                <dt className="text-muted font-mono text-xs uppercase tracking-wider">
                  {group.category}
                </dt>
                <dd className="mt-1.5 text-[15px]">
                  {group.items.join(" · ")}
                </dd>
              </div>
            ))}
          </dl>
        </Row>

        <Row>
          <SectionLabel>Experience</SectionLabel>
          <div className="space-y-10">
            {experience.map((job) => (
              <article key={`${job.company}-${job.start}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <h3 className="font-display text-xl">
                    {job.role}{" "}
                    <span className="text-muted">· {job.company}</span>
                  </h3>
                  <span className="text-muted font-mono text-xs">
                    {job.start} – {job.end}
                  </span>
                </div>
                <p className="text-muted mt-0.5 font-mono text-xs">
                  {job.location}
                </p>
                <p className="text-muted mt-3 text-[15px]">{job.summary}</p>
                <ul className="mt-3 space-y-1.5">
                  {job.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="text-muted relative pl-5 text-[15px] before:absolute before:left-0 before:text-accent before:content-['—']"
                    >
                      {h}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Row>

        <Row>
          <SectionLabel>Education</SectionLabel>
          <div className="space-y-4">
            {education.map((ed) => (
              <div
                key={ed.school}
                className="flex flex-wrap items-baseline justify-between gap-x-3"
              >
                <div>
                  <p className="font-display text-lg">{ed.degree}</p>
                  <p className="text-muted text-sm">
                    {ed.school} · {ed.location}
                  </p>
                </div>
                <span className="text-muted font-mono text-xs">{ed.year}</span>
              </div>
            ))}
          </div>
        </Row>
      </div>
    </Container>
  );
}
