import Image from "next/image";
import { ArrowDown, ChevronsLeftRight } from "lucide-react";
import {
  FeaturedProjectCard,
  ProjectCard,
  ProjectLink,
} from "@/components/project-card";
import { TechPills } from "@/components/pills";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

/** Client work: the featured project first, then a grid. */
export function WorkGrid({ projects }: { projects: Project[] }) {
  const hasCompare = projects.some((p) => p.media.type === "compare");

  return (
    <div>
      <p className="mt-8 flex flex-wrap gap-4 text-[13px] text-muted">
        {hasCompare ? (
          <span className="inline-flex items-center gap-1.5">
            <ChevronsLeftRight aria-hidden className="h-3.5 w-3.5" />
            Drag to compare a redesign with the old site
          </span>
        ) : null}
        <span className="hidden items-center gap-1.5 [@media(hover:hover)]:inline-flex">
          <ArrowDown aria-hidden className="h-3.5 w-3.5" />
          Hover a site to scroll through it
        </span>
      </p>

      <div className="mt-5 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) =>
          project.featured ? (
            <FeaturedProjectCard key={project.slug} project={project} />
          ) : (
            <ProjectCard key={project.slug} project={project} />
          )
        )}
      </div>
    </div>
  );
}

/** Smaller cards for personal projects built to learn new tools. */
export function LearningGrid({ projects }: { projects: Project[] }) {
  return (
    <div
      className={cn(
        "mt-12 grid gap-4 sm:grid-cols-2",
        // Four across only when the row fills up; otherwise three.
        projects.length % 4 === 0 ? "lg:grid-cols-4" : "lg:grid-cols-3"
      )}
    >
      {projects.map((project) => (
        <article key={project.slug} className="project card spot flex flex-col">
          <div className="p-3 pb-0">
            <div className="shot shot-zoom rounded-[10px] border border-line">
              {project.media.type === "image" ||
              project.media.type === "scroll" ? (
                <Image
                  src={project.media.image}
                  alt={project.media.alt}
                  fill
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                  placeholder="blur"
                  className="object-cover object-top"
                />
              ) : null}
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-2.5 px-4 pb-5 pt-4">
            <h3 className="text-[17px] font-semibold tracking-[-0.015em]">
              {project.title}
            </h3>
            <p className="text-sm text-muted">{project.description}</p>
            {project.learned ? (
              <p className="text-sm text-fg">
                <span className="mr-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-ink">
                  Learned
                </span>
                {project.learned}
              </p>
            ) : null}
            <TechPills
              tech={project.tech}
              primary={project.primaryTech}
              className="mt-auto pt-1"
            />
            <ProjectLink project={project} />
          </div>
        </article>
      ))}
    </div>
  );
}
