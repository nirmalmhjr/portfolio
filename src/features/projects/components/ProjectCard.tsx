import { ArrowRight, ArrowUpRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { TechPills } from "@/components/ui/pills";
import { ROUTES } from "@/configs/routes";
import { notesUrl } from "@/configs/site";
import { getPostsByProject } from "@/features/blog/utils/posts";
import { BeforeAfter } from "@/features/projects/components/BeforeAfter";
import { BrowserFrame } from "@/features/projects/components/BrowserFrame";
import { StatusBadge } from "@/features/projects/components/StatusBadge";
import type { Project } from "@/features/projects/types/project.types";
import { cn } from "@/lib/utils";

interface MyPartProps {
  readonly children: ReactNode;
}

function MyPart({ children }: MyPartProps) {
  return (
    <p className="flex items-baseline gap-2 text-fg text-sm">
      <span className="flex-none rounded-[5px] bg-a1/10 px-1.5 py-1 font-medium font-mono text-[11px] text-ink uppercase leading-none tracking-[0.06em]">
        My part
      </span>
      {children}
    </p>
  );
}

// Above the card's spotlight rim (z-3), like ProjectLink. py-1 grows the tap target.
const WRITING_LINK_CLASS =
  "group/post relative z-[4] -mx-1 flex items-start gap-1.5 rounded-md px-1 py-1 text-fg text-sm leading-snug transition-colors hover:text-ink";
const WRITING_LABEL_CLASS =
  "font-medium font-mono text-[11px] text-faint uppercase leading-none tracking-[0.08em]";

interface ProjectWritingProps {
  readonly project: Project;
}

/**
 * Blog posts (frontmatter `project`) and notes-site pages (`project.notes`)
 * about this project, so a reader looking at the work can go straight to how
 * it was built. Renders nothing when there are neither.
 */
function ProjectWriting({ project }: ProjectWritingProps) {
  const posts = getPostsByProject(project.slug);
  const notes = project.notes ?? [];
  if (posts.length === 0 && notes.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-3 border-line border-t pt-3">
      {posts.length > 0 ? (
        <div className="grid gap-2">
          <h4 className={WRITING_LABEL_CLASS}>From the blog</h4>
          <ul className="grid gap-1">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  className={WRITING_LINK_CLASS}
                  href={ROUTES.blogPost(post.slug)}
                >
                  <span className="text-pretty">{post.frontmatter.title}</span>
                  <ArrowRight
                    aria-hidden
                    className="mt-[3px] h-3.5 w-3.5 flex-none text-ink transition-transform group-hover/post:translate-x-[3px]"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {notes.length > 0 ? (
        <div className="grid gap-2">
          <h4 className={WRITING_LABEL_CLASS}>From my notes</h4>
          <ul className="grid gap-1">
            {notes.map((note) => (
              <li key={note.path}>
                <a className={WRITING_LINK_CLASS} href={notesUrl(note.path)}>
                  <span className="text-pretty">{note.title}</span>
                  <ArrowUpRight
                    aria-hidden
                    className="mt-[3px] h-3.5 w-3.5 flex-none text-ink transition-transform group-hover/post:translate-x-[2px] group-hover/post:-translate-y-[2px]"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

interface ProjectLinkProps {
  readonly project: Project;
}

export function ProjectLink({ project }: ProjectLinkProps) {
  if (!project.url) {
    return null;
  }
  return (
    <a
      // The negative margin grows the tap target to ~36px without moving the layout.
      className="relative z-[4] -my-2 inline-flex w-fit items-center gap-1 py-2 text-ink text-sm hover:underline hover:underline-offset-[3px]"
      href={project.url}
      rel="noopener noreferrer"
      target="_blank"
    >
      {project.linkLabel ?? "Visit site"}
      <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
      <span className="sr-only">: {project.title} (opens in a new tab)</span>
    </a>
  );
}

interface ProjectMediaProps {
  readonly project: Project;
  readonly sizes: string;
}

function ProjectMedia({ project, sizes }: ProjectMediaProps) {
  const { media } = project;

  switch (media.type) {
    case "compare":
      return (
        <BeforeAfter
          after={media.after}
          afterAlt={media.afterAlt}
          afterLabel={media.afterLabel}
          before={media.before}
          beforeAlt={media.beforeAlt}
          label={`Compare the old and new ${project.title} design`}
          sizes={sizes}
          start={media.start}
        />
      );
    case "scroll":
      return (
        <div className="shot shot-scroll">
          <Image
            alt={media.alt}
            className="object-cover object-top"
            fill
            placeholder="blur"
            sizes={sizes}
            src={media.image}
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
            alt={media.alt}
            className="object-cover object-top"
            fill
            placeholder="blur"
            sizes={sizes}
            src={media.image}
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
    default:
      return null;
  }
}

interface ProjectCardProps {
  readonly project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article
      className={cn(
        "project card spot flex flex-col",
        project.placeholder &&
          "border-line-strong border-dashed bg-transparent shadow-none"
      )}
    >
      <div className={cn("project-media", project.placeholder && "bg-none")}>
        <BrowserFrame secure={Boolean(project.url)} url={project.displayUrl}>
          <ProjectMedia
            project={project}
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
          />
        </BrowserFrame>
      </div>
      <div className="flex flex-1 flex-col gap-2.5 px-5 pt-[18px] pb-6">
        <div className="flex items-center justify-between gap-2.5">
          <h3 className="font-semibold text-[19px] tracking-[-0.02em]">
            {project.title}
          </h3>
          <StatusBadge label={project.statusLabel} status={project.status} />
        </div>
        {project.placeholder ? null : <MyPart>{project.myPart}</MyPart>}
        <p className="text-[15px] text-muted">{project.description}</p>
        <ProjectWriting project={project} />
        {/* mt-auto pins pills and link to the bottom, so links line up across a row (as in LearningGrid). */}
        <TechPills
          className="mt-auto pt-1"
          primary={project.primaryTech}
          tech={project.tech}
        />
        <ProjectLink project={project} />
      </div>
    </article>
  );
}

interface FeaturedProjectCardProps {
  readonly project: Project;
  /** Put the screenshot on the right (alternates between featured cards). */
  readonly reverse?: boolean;
}

/** Full-width card for the headline project, with contribution meters. */
export function FeaturedProjectCard({
  project,
  reverse = false,
}: FeaturedProjectCardProps) {
  return (
    <article
      className={cn(
        // minmax(0, …) tracks: a long address in the browser bar truncates
        // instead of widening the card past the screen on phones.
        "project card spot grid grid-cols-[minmax(0,1fr)] sm:col-span-2 lg:col-span-3",
        reverse
          ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]"
          : "lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]"
      )}
    >
      <div
        className={cn(
          "project-media p-3.5 pb-0 sm:p-[22px] sm:pb-0 lg:grid lg:content-center lg:pb-[22px]",
          reverse && "lg:order-2"
        )}
      >
        <BrowserFrame
          className="rounded-[14px] shadow-[0_24px_60px_rgba(0,0,0,0.28)]"
          secure={Boolean(project.url)}
          url={project.displayUrl}
        >
          <ProjectMedia
            project={project}
            sizes="(min-width: 1024px) 640px, 100vw"
          />
        </BrowserFrame>
      </div>
      <div
        className={cn(
          "grid content-center gap-3.5 px-5 pt-5 pb-6 sm:px-6 lg:py-[30px]",
          reverse ? "lg:pr-3 lg:pl-[30px]" : "lg:pr-[30px] lg:pl-3"
        )}
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="pill pill-hot">
            <Star aria-hidden className="h-3 w-3" />
            Featured
          </span>
          <StatusBadge label={project.statusLabel} status={project.status} />
        </div>
        <h3 className="font-bold text-[clamp(1.6rem,3vw,2.1rem)] leading-[1.1] tracking-[-0.035em]">
          {project.title}
        </h3>
        <MyPart>{project.myPart}</MyPart>
        <p className="text-muted">{project.description}</p>

        {project.contribution ? (
          <div className="grid gap-2.5 rounded-xl border border-line bg-canvas/45 p-4">
            <h4 className="font-medium font-mono text-[11px] text-faint uppercase leading-none tracking-[0.08em]">
              My contribution
            </h4>
            {project.contribution.map((item) => (
              <div className="grid gap-1.5" key={item.label}>
                <div className="flex justify-between gap-3 text-sm">
                  <span>{item.label}</span>
                  <span className="font-medium font-mono text-ink">
                    {item.display}
                  </span>
                </div>
                {/* biome-ignore lint/a11y/useSemanticElements: a native <meter> can't take the gradient bar styling. */}
                <div
                  aria-label={item.label}
                  aria-valuemax={100}
                  aria-valuemin={0}
                  aria-valuenow={item.value}
                  aria-valuetext={item.display}
                  className="h-2 overflow-hidden rounded bg-raised"
                  role="meter"
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

        <ProjectWriting project={project} />
        <TechPills primary={project.primaryTech} tech={project.tech} />
        <ProjectLink project={project} />
      </div>
    </article>
  );
}
