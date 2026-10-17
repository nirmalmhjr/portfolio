import type { Metadata } from "next";
import { ContactCard } from "@/components/contact-card";
import { PageHeader, Section } from "@/components/container";
import {
  LearningGrid,
  SmallBuildsPath,
  WorkGrid,
} from "@/components/project-showcase";
import { SectionHeading } from "@/components/section-heading";
import { SectionLink } from "@/components/section-link";
import {
  learningProjects,
  smallBuildSteps,
  smallBuilds,
  workProjects,
} from "@/lib/projects";

export const metadata: Metadata = {
  alternates: { canonical: "/projects" },
  description:
    "Every project Nirmal Maharjan has built: client websites, landing pages and CMS dashboards in Next.js, TypeScript and React, plus learning builds and early JavaScript apps.",
  title: "Projects",
};

const sections = [
  {
    count: workProjects.filter((p) => !p.placeholder).length,
    id: "client-work",
    label: "Client work",
  },
  {
    count: learningProjects.length,
    id: "playground",
    label: "Learning builds",
  },
  { count: smallBuilds.length, id: "small-builds", label: "First steps" },
];

export default function ProjectsPage() {
  return (
    <main>
      <PageHeader
        description="Client work from my jobs, projects I built to learn new tools, and the small apps where it all started."
        eyebrow="Projects"
        title="Everything I've built"
        watermark="Work"
      >
        <nav
          aria-label="Project sections"
          className="mt-8 flex flex-wrap gap-2"
        >
          {sections.map((section) => (
            <SectionLink
              className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface/60 px-4 py-2 text-fg text-sm transition-colors hover:bg-raised"
              href={`#${section.id}`}
              key={section.id}
            >
              {section.label}
              <span className="font-mono text-[12px] text-faint tabular-nums">
                {section.count}
              </span>
            </SectionLink>
          ))}
        </nav>
      </PageHeader>

      <Section id="client-work">
        <SectionHeading
          description="Each card says exactly which part I built."
          eyebrow="Client work"
          title="Work from my jobs"
          watermark="Client"
        />
        <WorkGrid projects={workProjects} />
      </Section>

      <Section id="playground">
        <SectionHeading
          description="Personal projects and clones where I practised new tools on my own time."
          eyebrow="Learning builds"
          title="Things I built to learn"
          watermark="Playground"
        />
        <LearningGrid projects={learningProjects} />
      </Section>

      <Section id="small-builds">
        <SectionHeading
          description="Before my first job, I taught myself by building small things: first in plain JavaScript, then React and Vue. Simple apps, each one a step."
          eyebrow="Where it started"
          title="The small steps first"
          watermark="Start"
        />
        <SmallBuildsPath steps={smallBuildSteps} />
      </Section>

      <Section>
        <ContactCard title="Like what you see? Let's talk." />
      </Section>
    </main>
  );
}
