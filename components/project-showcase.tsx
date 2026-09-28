"use client";

import { ArrowDown, ChevronsLeftRight } from "lucide-react";
import { useState } from "react";
import { FeaturedProjectCard, ProjectCard } from "@/components/project-card";
import type { Project, ProjectKind } from "@/lib/projects";
import { cn } from "@/lib/utils";

type Filter = "all" | ProjectKind;

const filters: { value: Filter; label: string; short: string }[] = [
  { value: "all", label: "All", short: "All" },
  { value: "client", label: "Client work", short: "Client" },
  { value: "personal", label: "Personal", short: "Personal" },
];

/** Filter tabs plus the project grid (featured card first). */
export function ProjectShowcase({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const counted = projects.filter((p) => !p.placeholder);
  const count = (f: Filter) =>
    f === "all" ? counted.length : counted.filter((p) => p.kind === f).length;
  const visible = projects.filter((p) => filter === "all" || p.kind === filter);

  const hasCompare = projects.some((p) => p.media.type === "compare");
  const hasScroll = projects.some((p) => p.media.type === "scroll");

  return (
    <div>
      <div className="mt-9 flex flex-wrap items-center justify-between gap-x-5 gap-y-3">
        <div
          role="group"
          aria-label="Filter projects"
          className="flex w-full gap-1 rounded-full border border-line bg-surface p-1 shadow-[var(--card-shadow)] sm:w-auto"
        >
          {filters.map((f) => {
            const active = filter === f.value;
            return (
              <button
                key={f.value}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(f.value)}
                className={cn(
                  "inline-flex h-9 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full px-3 text-sm font-medium transition-colors sm:flex-none sm:px-3.5",
                  active ? "bg-fg text-canvas" : "text-muted hover:text-fg"
                )}
              >
                <span className="sm:hidden">{f.short}</span>
                <span className="hidden sm:inline">{f.label}</span>
                <span
                  className={cn(
                    "rounded-full px-1.5 py-1 font-mono text-[11px] leading-none",
                    active ? "bg-canvas/20 text-canvas" : "bg-raised text-faint"
                  )}
                >
                  {count(f.value)}
                </span>
              </button>
            );
          })}
        </div>

        <p className="flex flex-wrap gap-4 text-[13px] text-muted">
          {hasCompare ? (
            <span className="inline-flex items-center gap-1.5">
              <ChevronsLeftRight aria-hidden className="h-3.5 w-3.5" />
              Drag to compare redesigns
            </span>
          ) : null}
          {hasScroll ? (
            <span className="hidden items-center gap-1.5 [@media(hover:hover)]:inline-flex">
              <ArrowDown aria-hidden className="h-3.5 w-3.5" />
              Hover a site to scroll it
            </span>
          ) : null}
        </p>
      </div>

      <div className="mt-5 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project) =>
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
