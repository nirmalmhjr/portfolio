import type { Metadata } from "next";
import { ContactCard } from "@/components/contact-card";
import { Container, PageHeader, Section } from "@/components/container";
import { LearningGrid, WorkGrid } from "@/components/project-showcase";
import { SectionHeading } from "@/components/section-heading";
import { learningProjects, workProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Client websites, landing pages and CMS dashboards built with Next.js, TypeScript and React, plus personal projects.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Projects"
        watermark="Work"
        title="Work I've built"
        description="Client projects from my jobs, each with exactly which part I built, plus the projects I built to learn."
      />
      <Container className="pb-24">
        <h2 className="sr-only">Client work</h2>
        <WorkGrid projects={workProjects} />
      </Container>
      <Section id="playground">
        <SectionHeading
          watermark="Playground"
          eyebrow="Learning builds"
          title="Things I built to learn"
          description="Personal projects and clones where I practised new tools on my own time."
        />
        <LearningGrid projects={learningProjects} />
      </Section>
      <Section>
        <ContactCard title="Like what you see? Let's talk." />
      </Section>
    </main>
  );
}
