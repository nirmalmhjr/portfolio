import type { Metadata } from "next";
import { ContactCard } from "@/components/contact-card";
import { PageHeader, Section } from "@/components/container";
import {
  LearningGrid,
  SmallBuildsPath,
  WorkGrid,
} from "@/components/project-showcase";
import { SectionHeading } from "@/components/section-heading";
import {
  learningProjects,
  smallBuilds,
  smallBuildSteps,
  workProjects,
} from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Every project Nirmal Maharjan has built: client websites, landing pages and CMS dashboards in Next.js, TypeScript and React, plus learning builds and early JavaScript apps.",
  alternates: { canonical: "/projects" },
};

const sections = [
  {
    id: "client-work",
    label: "Client work",
    count: workProjects.filter((p) => !p.placeholder).length,
  },
  { id: "playground", label: "Learning builds", count: learningProjects.length },
  { id: "small-builds", label: "First steps", count: smallBuilds.length },
];

export default function ProjectsPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Projects"
        watermark="Work"
        title="Everything I've built"
        description="Client work from my jobs, projects I built to learn new tools, and the small apps where it all started."
      >
        <nav aria-label="Project sections" className="mt-8 flex flex-wrap gap-2">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface/60 px-4 py-2 text-sm text-fg transition-colors hover:bg-raised"
            >
              {section.label}
              <span className="font-mono text-[12px] tabular-nums text-faint">
                {section.count}
              </span>
            </a>
          ))}
        </nav>
      </PageHeader>

      <Section id="client-work">
        <SectionHeading
          watermark="Client"
          eyebrow="Client work"
          title="Work from my jobs"
          description="Each card says exactly which part I built."
        />
        <WorkGrid projects={workProjects} />
      </Section>

      <Section id="playground">
        <SectionHeading
          watermark="Playground"
          eyebrow="Learning builds"
          title="Things I built to learn"
          description="Personal projects and clones where I practised new tools on my own time."
        />
        <LearningGrid projects={learningProjects} />
      </Section>

      <Section id="small-builds">
        <SectionHeading
          watermark="Start"
          eyebrow="Where it started"
          title="The small steps first"
          description="Before my first job, I taught myself by building small things: first in plain JavaScript, then React and Vue. Simple apps, each one a step."
        />
        <SmallBuildsPath steps={smallBuildSteps} />
      </Section>

      <Section>
        <ContactCard title="Like what you see? Let's talk." />
      </Section>
    </main>
  );
}
