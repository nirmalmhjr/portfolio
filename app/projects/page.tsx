import type { Metadata } from "next";
import { ContactCard } from "@/components/contact-card";
import { Container, PageHeader, Section } from "@/components/container";
import { ProjectShowcase } from "@/components/project-showcase";
import { projects } from "@/lib/projects";

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
        title="Work I've shipped"
        description="Client projects from my jobs, plus a few personal builds. Each card says exactly which part I built. Drag the sliders to compare redesigns with the old sites."
      />
      <Container className="pb-24">
        <ProjectShowcase projects={projects} />
      </Container>
      <Section>
        <ContactCard title="Have a project in mind?" />
      </Section>
    </main>
  );
}
