import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  const primaryHref = project.demoUrl ?? project.repoUrl ?? undefined;

  return (
    <article className="card card-hover group relative flex flex-col p-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-bold leading-snug">
          {primaryHref ? (
            <a
              href={primaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="after:absolute after:inset-0"
            >
              {project.title}
            </a>
          ) : (
            project.title
          )}
        </h3>
        <ArrowUpRight className="text-muted h-4 w-4 shrink-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
      </div>

      <p className="text-muted mt-2 flex-1 text-sm leading-relaxed">
        {project.description}
      </p>

      <ul className="mt-4 flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <li
            key={t}
            className="bg-muted text-muted rounded-md px-2 py-0.5 text-xs font-medium"
          >
            {t}
          </li>
        ))}
      </ul>

      {(project.demoUrl || project.repoUrl) && (
        <div className="mt-4 flex items-center gap-4 border-t border-border pt-3 text-sm">
          {project.demoUrl ? (
            <span className="text-muted inline-flex items-center gap-1 transition-colors group-hover:text-foreground">
              <ArrowUpRight className="h-3.5 w-3.5" /> Demo
            </span>
          ) : null}
          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted relative z-10 inline-flex items-center gap-1 transition-colors hover:text-accent"
            >
              <Github className="h-3.5 w-3.5" /> Code
            </a>
          ) : null}
          <span className="text-muted ml-auto text-xs">{project.year}</span>
        </div>
      )}
    </article>
  );
}
