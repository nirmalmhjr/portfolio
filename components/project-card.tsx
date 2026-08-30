import type { ElementType } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const href = project.demoUrl ?? project.repoUrl ?? undefined;
  const Wrapper: ElementType = href ? "a" : "div";

  return (
    <Wrapper
      {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-x-5 gap-y-3 border-b border-border py-8 transition-colors hover:bg-surface sm:gap-x-8 sm:py-10"
    >
      <span className="label pt-1 sm:pt-2">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="min-w-0">
        <h3 className="display flex items-center gap-3 text-[clamp(1.75rem,4vw,3rem)] transition-transform duration-300 group-hover:translate-x-2">
          {project.title}
          <ArrowUpRight className="hidden h-6 w-6 shrink-0 -translate-x-2 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block" />
        </h3>
        <p className="text-muted mt-3 max-w-xl text-sm leading-relaxed">
          {project.description}
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
          {project.tech.map((t) => (
            <li
              key={t}
              className="text-muted font-mono text-[0.7rem] uppercase tracking-wider"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>

      <span className="label pt-1 text-right sm:pt-2">{project.year}</span>
    </Wrapper>
  );
}
