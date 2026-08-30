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
    <Container as="main" className="py-12">
      <PageHeader
        title="Projects"
        description="Things I've designed, built, and shipped. A few more live on my GitHub."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {sorted.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </Container>
  );
}
