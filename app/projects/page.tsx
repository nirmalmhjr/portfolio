import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/container";
import { ProjectCard } from "@/components/project-card";
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
    <Container as="main">
      <PageHeader
        label={`Projects · ${sorted.length}`}
        title="Things I've designed, built, and shipped."
        description="A mix of client work, side projects, and open source. A few more live on my GitHub."
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {sorted.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </Container>
  );
}
