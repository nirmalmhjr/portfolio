import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  ChevronsLeftRight,
} from "lucide-react";
import {
  FeaturedProjectCard,
  ProjectCard,
  ProjectLink,
} from "@/components/project-card";
import { buttonClass } from "@/components/button";
import { TechPills } from "@/components/pills";
import type { Project, SmallBuild, SmallBuildStep } from "@/lib/projects";
import { experience } from "@/lib/resume";

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
            <FeaturedProjectCard
              key={project.slug}
              project={project}
              reverse={
                projects.filter((p) => p.featured).indexOf(project) % 2 === 1
              }
            />
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
    <div className="mt-12 grid gap-4 sm:grid-cols-2">
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
                  sizes="(min-width: 1024px) 600px, (min-width: 640px) 50vw, 100vw"
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

function SmallBuildCard({ build }: { build: SmallBuild }) {
  return (
    <a
      href={build.url}
      target="_blank"
      rel="noopener noreferrer"
      className="project card spot group flex h-full flex-col"
    >
      <div className="p-2.5 pb-0">
        <div className="shot shot-zoom rounded-[8px] border border-line">
          <Image
            src={build.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
            placeholder="blur"
            className="object-cover object-top"
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 px-4 pb-4 pt-3.5">
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-[15px] font-semibold tracking-[-0.01em]">
            {build.title}
          </h4>
          <span className="pill">{build.tech}</span>
        </div>
        <p className="text-sm text-muted">{build.learned}</p>
        <p className="mt-auto inline-flex items-center gap-1 pt-1.5 font-mono text-[12px] text-faint transition-colors group-hover:text-ink">
          {new URL(build.url).host}
          <ArrowUpRight aria-hidden className="h-3 w-3" />
        </p>
      </div>
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

/** Early builds as steps on a path that ends at the first job. */
export function SmallBuildsPath({ steps }: { steps: SmallBuildStep[] }) {
  const firstJob = experience[experience.length - 1];

  return (
    <ol className="timeline timeline-rise mt-12 !gap-12">
      {steps.map((step, index) => (
        <li key={step.title} className="relative">
          <span aria-hidden className="timeline-node" />
          <p className="font-mono text-[11px] font-medium uppercase leading-none tracking-[0.08em] text-faint">
            Step {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-2 text-[19px] font-semibold tracking-[-0.015em]">
            {step.title}
          </h3>
          <p className="mt-1 text-[15px] text-muted">{step.note}</p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {step.builds.map((build) => (
              <li key={build.title}>
                <SmallBuildCard build={build} />
              </li>
            ))}
          </ul>
        </li>
      ))}
      <li className="relative">
        <span aria-hidden className="timeline-node timeline-node-current" />
        <p className="font-mono text-[11px] font-medium uppercase leading-none tracking-[0.08em] text-ink">
          {firstJob.start}
        </p>
        <h3 className="mt-2 text-[19px] font-semibold tracking-[-0.015em]">
          First job
        </h3>
        <p className="mt-1 text-[15px] text-muted">
          {firstJob.role} at {firstJob.company}.{" "}
          <Link
            href="/#experience"
            className="inline-flex items-center gap-1 text-ink hover:underline hover:underline-offset-[3px]"
          >
            See my experience
            <ArrowRight aria-hidden className="h-3.5 w-3.5" />
          </Link>
        </p>
      </li>
    </ol>
  );
}

/** Closes the homepage's short project list with a way to see everything. */
export function AllProjectsCta({
  // count,
  previews,
}: {
  count?: number;
  previews: { title: string; image: StaticImageData }[];
}) {
  return (
    <div className="card mt-6 flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <span aria-hidden className="flex flex-none pl-3">
          {previews.map((preview) => (
            <span
              key={preview.title}
              className="relative -ml-3 h-10 w-16 overflow-hidden rounded-md border border-line-strong bg-raised shadow-sm ring-2 ring-surface"
            >
              <Image
                src={preview.image}
                alt=""
                fill
                sizes="64px"
                className="object-cover object-top"
              />
            </span>
          ))}
        </span>
        <p className="max-w-[52ch] text-[15px] text-muted">
          <span className="font-medium text-fg">More projects</span>{" "}
          on the projects page: the rest of my client work, things I built to
          learn, and the small apps where I started.
        </p>
      </div>
      <Link
        href="/projects"
        className={buttonClass("primary", "flex-none self-start sm:self-auto")}
      >
        View all projects
        <ArrowRight aria-hidden />
      </Link>
    </div>
  );
}
