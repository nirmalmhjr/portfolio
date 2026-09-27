import { PulseDot } from "@/components/available-badge";
import { TechPills } from "@/components/pills";
import type { ExperienceItem } from "@/lib/resume";
import { cn } from "@/lib/utils";

export function ExperienceTimeline({ items }: { items: ExperienceItem[] }) {
  return (
    <ol className="timeline mt-12">
      {items.map((job) => (
        <li
          key={`${job.company}-${job.role}-${job.start}`}
          className="card relative p-5 sm:px-[26px] sm:py-6"
        >
          <span
            aria-hidden
            className={cn(
              "timeline-node",
              job.current && "timeline-node-current"
            )}
          />
          {job.current ? (
            <p className="mb-2.5 inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase leading-none tracking-[0.08em] text-ok">
              <PulseDot />
              Current role
            </p>
          ) : null}
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <h3 className="text-[19px] font-semibold tracking-[-0.015em]">
              {job.role}{" "}
              <span className="font-normal text-muted">
                ·{" "}
                {job.companyUrl ? (
                  <a
                    href={job.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-line-strong underline-offset-[3px] hover:text-fg"
                  >
                    {job.company}
                  </a>
                ) : (
                  job.company
                )}
              </span>
            </h3>
            <p className="whitespace-nowrap font-mono text-[13px] tabular-nums text-faint">
              {job.start ? `${job.start} – ${job.end}` : job.end}
            </p>
          </div>
          <ul className="dash-list mt-3.5 text-[15px] text-muted">
            {job.highlights.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <TechPills
            tech={job.tech}
            primary={job.primaryTech}
            className="mt-4"
          />
        </li>
      ))}
    </ol>
  );
}
