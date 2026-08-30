import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { bio, education, experience, skills } from "@/lib/resume";
import { siteConfig } from "@/lib/site.config";

export const metadata: Metadata = {
  title: "About",
  description:
    "Background, skills, experience, and education. Full-stack engineer focused on the frontend.",
  alternates: { canonical: "/about" },
};

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-4 border-b border-border py-12 lg:grid-cols-[12rem_1fr] lg:gap-12">
      <h2 className="label pt-1">{label}</h2>
      <div>{children}</div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <Container as="main">
      <PageHeader label="(About)" title={`I'm ${siteConfig.name}`} />

      <Reveal>
        <p className="max-w-3xl py-12 font-display text-2xl leading-tight tracking-tight sm:text-3xl">
          {bio[0]}
        </p>
      </Reveal>

      <Row label="Bio">
        <div className="text-muted max-w-2xl space-y-4 text-[15px] leading-7">
          {bio.slice(1).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </Row>

      <Row label="Skills">
        <dl className="space-y-6">
          {skills.map((group) => (
            <div key={group.category}>
              <dt className="label">{group.category}</dt>
              <dd className="mt-2 font-display text-lg tracking-tight sm:text-xl">
                {group.items.join(", ")}
              </dd>
            </div>
          ))}
        </dl>
      </Row>

      <Row label="Experience">
        <div className="space-y-12">
          {experience.map((job) => (
            <article key={`${job.company}-${job.start}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="display text-[clamp(1.5rem,3vw,2rem)]">
                  {job.role}
                </h3>
                <span className="label">
                  {job.start} — {job.end}
                </span>
              </div>
              <p className="text-muted mt-1 font-mono text-xs uppercase tracking-wider">
                {job.company} · {job.location}
              </p>
              <p className="text-muted mt-4 max-w-xl text-[15px]">
                {job.summary}
              </p>
              <ul className="mt-4 space-y-2">
                {job.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="text-muted relative max-w-xl pl-6 text-[15px] before:absolute before:left-0 before:text-accent before:content-['→']"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Row>

      <Row label="Education">
        <div className="space-y-6">
          {education.map((ed) => (
            <div
              key={ed.school}
              className="flex flex-wrap items-baseline justify-between gap-x-4"
            >
              <div>
                <p className="font-display text-lg tracking-tight sm:text-xl">
                  {ed.degree}
                </p>
                <p className="text-muted mt-1 font-mono text-xs uppercase tracking-wider">
                  {ed.school} · {ed.location}
                </p>
              </div>
              <span className="label">{ed.year}</span>
            </div>
          ))}
        </div>
      </Row>
    </Container>
  );
}
