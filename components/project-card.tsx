import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const primaryHref = project.demoUrl ?? project.repoUrl ?? undefined;

  return (
    <article
      className={cn(
        "group relative flex flex-col rounded-xl border border-border bg-surface p-6 transition-all duration-300",
        "hover:-translate-y-1 hover:border-accent/50 hover:shadow-card"
      )}
    >
      <div className="flex items-center justify-between">
        <span className="label tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="label">{project.year}</span>
      </div>

      <h3 className="mt-5 font-display text-2xl leading-tight">
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

      <p className="text-muted mt-2.5 flex-1 text-sm leading-relaxed">
        {project.description}
      </p>

      <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-1">
        {project.tech.map((t) => (
          <li key={t} className="text-muted font-mono text-xs">
            {t}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-center gap-4 border-t border-border/70 pt-4 text-sm">
        {project.demoUrl ? (
          <span className="text-muted relative z-10 inline-flex items-center gap-1 transition-colors group-hover:text-foreground">
            Live <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        ) : null}
        {project.repoUrl ? (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted relative z-10 inline-flex items-center gap-1 transition-colors hover:text-foreground"
          >
            <Github className="h-3.5 w-3.5" /> Code
          </a>
        ) : null}
        <ArrowUpRight className="text-muted ml-auto h-5 w-5 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
      </div>
    </article>
  );
}
