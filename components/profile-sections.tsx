import {
  Code,
  LayoutDashboard,
  LayoutTemplate,
  RefreshCw,
  type LucideIcon,
} from "lucide-react";
import {
  education,
  hobbies,
  languages,
  services,
  skills,
  training,
  type ServiceIcon,
} from "@/lib/resume";
import { testimonials } from "@/lib/testimonials";
import { cn } from "@/lib/utils";

const serviceIcons: Record<ServiceIcon, LucideIcon> = {
  landing: LayoutTemplate,
  dashboard: LayoutDashboard,
  code: Code,
  migrate: RefreshCw,
};

export function ServicesGrid() {
  return (
    <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((service) => {
        const Icon = serviceIcons[service.icon];
        return (
          <article
            key={service.title}
            className="card spot grid content-start gap-3 p-6"
          >
            <span
              aria-hidden
              className="grid h-[42px] w-[42px] place-items-center rounded-xl border border-a1/35 bg-a1/10 text-ink"
            >
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="mt-1.5 text-[17px] font-semibold tracking-[-0.015em]">
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
          key={group.category}
          className="card grid content-start gap-3.5 p-[22px]"
        >
          <h3 className="font-mono text-xs font-medium uppercase leading-none tracking-[0.08em] text-faint">
            {group.category}
          </h3>
          <ul className="flex flex-wrap gap-1.5">
            {group.items.map((item) => (
              <li
                key={item.name}
                className={cn(
                  "pill h-[30px] px-3 font-sans text-[13px]",
                  item.primary && "pill-hot"
                )}
              >
                {item.name}
                {item.note ? (
                  <small className="font-mono text-[10px] uppercase tracking-[0.04em] text-faint">
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
      <h3 className="mb-2 text-[15px] font-semibold">{title}</h3>
      <ul>
        {rows.map((row) => (
          <li
            key={row.title}
            className="flex justify-between gap-4 border-t border-line py-3 text-[15px] first:border-t-0"
          >
            <span>
              {row.title}
              <small className="block text-[13px] text-muted">
                {row.place}
              </small>
            </span>
            <span className="whitespace-nowrap font-mono text-[13px] leading-relaxed text-faint">
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
      <RecordList title="Education" rows={education} />
      <RecordList title="Training" rows={training} />
    </div>
  );
}

export function BeyondCode() {
  const rows = [
    { label: "Speaks", items: languages },
    { label: "Off-screen", items: hobbies },
  ];
  return (
    <dl className="mt-7 grid gap-3">
      {rows.map((row) => (
        <div key={row.label} className="flex flex-wrap items-center gap-3">
          <dt className="w-[88px] font-mono text-xs font-medium uppercase tracking-[0.06em] text-faint">
            {row.label}
          </dt>
          <dd>
            <ul className="flex flex-wrap gap-1.5">
              {row.items.map((item) => (
                <li key={item} className="pill">
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
  if (testimonials.length === 0) return null;
  return (
    <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((t) => (
        <figure
          key={`${t.name}-${t.quote.slice(0, 20)}`}
          className="card spot grid gap-5 p-6"
        >
          <blockquote className="text-[17px] leading-relaxed text-fg">
            “{t.quote}”
          </blockquote>
          <figcaption className="text-sm text-muted">
            <b className="block font-semibold text-fg">{t.name}</b>
            {t.role}
            {t.company ? `, ${t.company}` : ""}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
