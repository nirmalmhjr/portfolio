import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/container";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected projects — web apps, developer tools, and open-source work.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const sorted = [...projects].sort((a, b) => b.year - a.year);

  return (
    <Container as="main" size="wide">
      <PageHeader
        eyebrow="Projects"
        title="Things I've built"
        description="A mix of client work, side projects, and open source. A few more live on my GitHub."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {sorted.map((project) => (
          <Reveal key={project.title}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
