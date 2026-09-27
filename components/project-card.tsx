import Image from "next/image";
import { ArrowUpRight, Star } from "lucide-react";
import type { ReactNode } from "react";
import { BeforeAfter } from "@/components/before-after";
import { BrowserFrame } from "@/components/browser-frame";
import { StatusBadge, TechPills } from "@/components/pills";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

function MyPart({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-baseline gap-2 text-sm text-fg">
      <span className="flex-none rounded-[5px] bg-a1/10 px-1.5 py-1 font-mono text-[10px] font-medium uppercase leading-none tracking-[0.08em] text-ink">
        My part
      </span>
      {children}
    </p>
  );
}

function ProjectLink({ project }: { project: Project }) {
  if (!project.url) return null;
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative z-[4] inline-flex w-fit items-center gap-1 text-sm text-ink hover:underline hover:underline-offset-[3px]"
    >
      {project.linkLabel ?? "Visit site"}
      <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
      <span className="sr-only">: {project.title} (opens in a new tab)</span>
    </a>
  );
}

function ProjectMedia({ project, sizes }: { project: Project; sizes: string }) {
  const { media } = project;

  switch (media.type) {
    case "compare":
      return (
        <BeforeAfter
          before={media.before}
          after={media.after}
          beforeAlt={media.beforeAlt}
          afterAlt={media.afterAlt}
          afterLabel={media.afterLabel}
          label={`Compare the old and new ${project.title} design`}
          sizes={sizes}
        />
      );
    case "scroll":
      return (
        <div className="shot shot-scroll">
          <Image
            src={media.image}
            alt={media.alt}
            fill
            sizes={sizes}
            placeholder="blur"
            className="object-cover object-top"
          />
          {media.badge ? (
            <span aria-hidden className="diff-badge">
              {media.badge}
            </span>
          ) : (
            <span aria-hidden className="shot-hint">
              Hover to scroll ↓
            </span>
          )}
        </div>
      );
    case "image":
      return (
        <div className="shot shot-zoom">
          <Image
            src={media.image}
            alt={media.alt}
            fill
            sizes={sizes}
            placeholder="blur"
            className="object-cover object-top"
          />
        </div>
      );
    case "placeholder":
      return (
        <div aria-hidden className="shot">
          <div className="absolute inset-0 grid grid-rows-[auto_auto_1fr] gap-2.5 p-3.5">
            <i className="skeleton-bar h-4 w-3/5" />
            <i className="skeleton-bar h-2.5 w-4/5" />
            <div className="grid grid-cols-3 gap-2">
              <i className="skeleton-bar min-h-[40px]" />
              <i className="skeleton-bar min-h-[40px]" />
              <i className="skeleton-bar min-h-[40px]" />
            </div>
          </div>
        </div>
      );
  }
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      className={cn(
        "project card spot flex flex-col",
        project.placeholder &&
          "border-dashed border-line-strong bg-transparent shadow-none"
      )}
    >
      <div className={cn("project-media", project.placeholder && "bg-none")}>
        <BrowserFrame url={project.displayUrl} secure={Boolean(project.url)}>
          <ProjectMedia
            project={project}
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
          />
        </BrowserFrame>
      </div>
      <div className="flex flex-1 flex-col gap-2.5 px-5 pb-6 pt-[18px]">
        <div className="flex items-center justify-between gap-2.5">
          <h3 className="text-[19px] font-semibold tracking-[-0.02em]">
            {project.title}
          </h3>
          <StatusBadge status={project.status} label={project.statusLabel} />
        </div>
        {project.placeholder ? null : <MyPart>{project.myPart}</MyPart>}
        <p className="text-[15px] text-muted">{project.description}</p>
        <TechPills tech={project.tech} primary={project.primaryTech} />
        <ProjectLink project={project} />
      </div>
    </article>
  );
}

/** Full-width card for the headline project, with contribution meters. */
export function FeaturedProjectCard({ project }: { project: Project }) {
  return (
    <article className="project card spot grid sm:col-span-2 lg:col-span-3 lg:grid-cols-[1.35fr_1fr]">
      <div className="project-media p-3.5 pb-0 sm:p-[22px] sm:pb-0 lg:grid lg:content-center lg:pb-[22px]">
        <BrowserFrame
          url={project.displayUrl}
          secure={Boolean(project.url)}
          className="rounded-[14px] shadow-[0_24px_60px_rgba(0,0,0,0.28)]"
        >
          <ProjectMedia
            project={project}
            sizes="(min-width: 1024px) 640px, 100vw"
          />
        </BrowserFrame>
      </div>
      <div className="grid content-center gap-3.5 px-5 pb-6 pt-5 sm:px-6 lg:py-[30px] lg:pl-3 lg:pr-[30px]">
        <div className="flex flex-wrap items-center gap-2">
          <span className="pill pill-hot">
            <Star aria-hidden className="h-3 w-3" />
            Featured
          </span>
          <StatusBadge status={project.status} label={project.statusLabel} />
        </div>
        <h3 className="text-[clamp(1.6rem,3vw,2.1rem)] font-bold leading-[1.1] tracking-[-0.035em]">
          {project.title}
        </h3>
        <MyPart>{project.myPart}</MyPart>
        <p className="text-muted">{project.description}</p>

        {project.contribution ? (
          <div className="grid gap-2.5 rounded-xl border border-line bg-canvas/45 p-4">
            <h4 className="font-mono text-[11px] font-medium uppercase leading-none tracking-[0.08em] text-faint">
              My contribution
            </h4>
            {project.contribution.map((item) => (
              <div key={item.label} className="grid gap-1.5">
                <div className="flex justify-between gap-3 text-sm">
                  <span>{item.label}</span>
                  <span className="font-mono font-medium text-ink">
                    {item.display}
                  </span>
                </div>
                <div
                  role="meter"
                  aria-label={item.label}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={item.value}
                  aria-valuetext={item.display}
                  className="h-2 overflow-hidden rounded bg-raised"
                >
                  <div
                    className="h-full rounded bg-gradient-to-r from-a1 to-a2"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : null}

        <TechPills tech={project.tech} primary={project.primaryTech} />
        <ProjectLink project={project} />
      </div>
    </article>
  );
}
