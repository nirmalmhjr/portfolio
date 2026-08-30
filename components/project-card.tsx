import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="hover:bg-muted flex flex-col rounded-lg border p-5 transition-colors">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-semibold">{project.title}</h3>
        <span className="text-muted shrink-0 text-xs">{project.year}</span>
      </div>

      <p className="text-muted mt-2 text-sm">{project.description}</p>

      <ul className="mt-4 flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <li
            key={t}
            className="text-muted rounded border px-1.5 py-0.5 text-xs"
          >
            {t}
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center gap-4 text-sm">
        {project.demoUrl ? (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:underline"
          >
            <ExternalLink className="h-3.5 w-3.5" /> Live demo
          </a>
        ) : null}
        {project.repoUrl ? (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:underline"
          >
            <Github className="h-3.5 w-3.5" /> Code
          </a>
        ) : null}
      </div>
    </article>
  );
}
