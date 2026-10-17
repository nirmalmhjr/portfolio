import { PulseDot } from "@/components/available-badge";
import { TechPills } from "@/components/pills";
import type { ExperienceItem } from "@/lib/resume";
import { cn } from "@/lib/utils";

export function ExperienceTimeline({ items }: { items: ExperienceItem[] }) {
  return (
    <ol className="timeline mt-12">
      {items.map((job) => (
        <li
          className="card relative p-5 sm:px-[26px] sm:py-6"
          key={`${job.company}-${job.role}-${job.start}`}
        >
          <span
            aria-hidden
            className={cn(
              "timeline-node",
              job.current && "timeline-node-current"
            )}
          />
          {job.current ? (
            <p className="mb-2.5 inline-flex items-center gap-2 font-medium font-mono text-[11px] text-ok uppercase leading-none tracking-[0.08em]">
              <PulseDot />
              Current role
            </p>
          ) : null}
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <h3 className="font-semibold text-[19px] tracking-[-0.015em]">
              {job.role}{" "}
              <span className="font-normal text-muted">
                ·{" "}
                {job.companyUrl ? (
                  <a
                    className="underline decoration-line-strong underline-offset-[3px] hover:text-fg"
                    href={job.companyUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {job.company}
                  </a>
                ) : (
                  job.company
                )}
              </span>
            </h3>
            <p className="whitespace-nowrap font-mono text-[13px] text-faint tabular-nums">
              {job.start ? `${job.start} – ${job.end}` : job.end}
            </p>
          </div>
          <ul className="dash-list mt-3.5 text-[15px] text-muted">
            {job.highlights.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <TechPills
            className="mt-4"
            primary={job.primaryTech}
            tech={job.tech}
          />
        </li>
      ))}
    </ol>
  );
}
