import {
  Code,
  Handshake,
  LayoutDashboard,
  type LucideIcon,
  RefreshCw,
} from "lucide-react";
import {
  education,
  hobbies,
  languages,
  type StrengthIcon,
  skills,
  strengths,
  training,
} from "@/lib/resume";
import { testimonials } from "@/lib/testimonials";
import { cn } from "@/lib/utils";

const strengthIcons: Record<StrengthIcon, LucideIcon> = {
  business: Handshake,
  code: Code,
  dashboard: LayoutDashboard,
  migrate: RefreshCw,
};

export function StrengthsGrid() {
  return (
    <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {strengths.map((service) => {
        const Icon = strengthIcons[service.icon];
        return (
          <article
            className="card spot grid content-start gap-3 p-6"
            key={service.title}
          >
            <span
              aria-hidden
              className="grid h-[42px] w-[42px] place-items-center rounded-xl border border-a1/35 bg-a1/10 text-ink"
            >
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="mt-1.5 font-semibold text-[17px] tracking-[-0.015em]">
              {service.title}
            </h3>
            <p className="text-[15px] text-muted">{service.description}</p>
          </article>
        );
      })}
    </div>
  );
}

export function SkillsGrid() {
  return (
    <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {skills.map((group) => (
        <div
          className="card grid content-start gap-3.5 p-[22px]"
          key={group.category}
        >
          <h3 className="font-medium font-mono text-faint text-xs uppercase leading-none tracking-[0.08em]">
            {group.category}
          </h3>
          <ul className="flex flex-wrap gap-1.5">
            {group.items.map((item) => (
              <li
                className={cn(
                  "pill h-[30px] px-3 font-sans text-[13px]",
                  item.primary && "pill-hot"
                )}
                key={item.name}
              >
                {item.name}
                {item.note ? (
                  <small className="font-mono text-[10px] text-faint uppercase tracking-[0.04em]">
                    {item.note}
                  </small>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function RecordList({
  title,
  rows,
}: {
  title: string;
  rows: { title: string; place: string; year: string }[];
}) {
  return (
    <div className="card p-6">
      <h3 className="mb-2 font-semibold text-[15px]">{title}</h3>
      <ul>
        {rows.map((row) => (
          <li
            className="flex justify-between gap-4 border-line border-t py-3 text-[15px] first:border-t-0"
            key={row.title}
          >
            <span>
              {row.title}
              <small className="block text-[13px] text-muted">
                {row.place}
              </small>
            </span>
            <span className="whitespace-nowrap font-mono text-[13px] text-faint leading-relaxed">
              {row.year}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function EducationGrid() {
  return (
    <div className="mt-12 grid gap-4 md:grid-cols-2">
      <RecordList rows={education} title="Education" />
      <RecordList rows={training} title="Training" />
    </div>
  );
}

export function BeyondCode() {
  const rows = [
    { items: languages, label: "Speaks" },
    { items: hobbies, label: "Off-screen" },
  ];
  return (
    <dl className="mt-7 grid gap-3">
      {rows.map((row) => (
        <div className="flex flex-wrap items-center gap-3" key={row.label}>
          <dt className="w-[88px] font-medium font-mono text-faint text-xs uppercase tracking-[0.06em]">
            {row.label}
          </dt>
          <dd>
            <ul className="flex flex-wrap gap-1.5">
              {row.items.map((item) => (
                <li className="pill" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Renders nothing until lib/testimonials.ts has entries. */
export function TestimonialsGrid() {
  if (testimonials.length === 0) {
    return null;
  }
  return (
    <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((t) => (
        <figure
          className="card spot grid gap-5 p-6"
          key={`${t.name}-${t.quote.slice(0, 20)}`}
        >
          <blockquote className="text-[17px] text-fg leading-relaxed">
            “{t.quote}”
          </blockquote>
          <figcaption className="text-muted text-sm">
            <b className="block font-semibold text-fg">{t.name}</b>
            {t.role}
            {t.company ? `, ${t.company}` : ""}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
