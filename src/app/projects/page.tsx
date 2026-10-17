import { PageHeader, Section } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SectionLink } from "@/components/shared/SectionLink";
import { ROUTES } from "@/configs/routes";
import { ContactCard } from "@/features/contact/components/ContactCard";
import {
  LearningGrid,
  SmallBuildsPath,
  WorkGrid,
} from "@/features/projects/components/ProjectShowcase";
import {
  LEARNING_PROJECTS,
  SMALL_BUILD_STEPS,
  SMALL_BUILDS,
  WORK_PROJECTS,
} from "@/features/projects/constants/projects";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  description:
    "Every project Nirmal Maharjan has built: client websites, landing pages and CMS dashboards in Next.js, TypeScript and React, plus learning builds and early JavaScript apps.",
  path: ROUTES.projects,
  title: "Projects",
});

const SECTION_IDS = {
  clientWork: "client-work",
  playground: "playground",
  smallBuilds: "small-builds",
} as const;

const sections = [
  {
    count: WORK_PROJECTS.filter((p) => !p.placeholder).length,
    id: SECTION_IDS.clientWork,
    label: "Client work",
  },
  {
    count: LEARNING_PROJECTS.length,
    id: SECTION_IDS.playground,
    label: "Learning builds",
  },
  {
    count: SMALL_BUILDS.length,
    id: SECTION_IDS.smallBuilds,
    label: "First steps",
  },
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

      <Section id={SECTION_IDS.clientWork}>
        <SectionHeading
          description="Each card says exactly which part I built."
          eyebrow="Client work"
          title="Work from my jobs"
          watermark="Client"
        />
        <WorkGrid projects={WORK_PROJECTS} />
      </Section>

      <Section id={SECTION_IDS.playground}>
        <SectionHeading
          description="Personal projects and clones where I practised new tools on my own time."
          eyebrow="Learning builds"
          title="Things I built to learn"
          watermark="Playground"
        />
        <LearningGrid projects={LEARNING_PROJECTS} />
      </Section>

      <Section id={SECTION_IDS.smallBuilds}>
        <SectionHeading
          description="Before my first job, I taught myself by building small things: first in plain JavaScript, then React and Vue. Simple apps, each one a step."
          eyebrow="Where it started"
          title="The small steps first"
          watermark="Start"
        />
        <SmallBuildsPath steps={SMALL_BUILD_STEPS} />
      </Section>

      <Section>
        <ContactCard title="Like what you see? Let's talk." />
      </Section>
    </main>
  );
}
