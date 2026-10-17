import type { ProjectStatus } from "@/lib/projects";
import { cn } from "@/lib/utils";

const statusStyles: Record<
  ProjectStatus,
  { className: string; label: string }
> = {
  demo: { className: "status status-live", label: "Live demo" },
  "in-progress": { className: "status status-soon", label: "In progress" },
  "launching-soon": {
    className: "status status-soon",
    label: "Launching soon",
  },
  live: { className: "status status-live", label: "Live" },
  shipped: { className: "status status-done", label: "Shipped" },
};

export function StatusBadge({
  status,
  label,
}: {
  status: ProjectStatus;
  label?: string;
}) {
  const style = statusStyles[status];
  return <span className={style.className}>{label ?? style.label}</span>;
}

/** Tech tags; items in `primary` get the accent style. */
export function TechPills({
  tech,
  primary = [],
  className,
}: {
  tech: string[];
  primary?: string[];
  className?: string;
}) {
  if (tech.length === 0) {
    return null;
  }
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)}>
      {tech.map((t) => (
        <li className={cn("pill", primary.includes(t) && "pill-hot")} key={t}>
          {t}
        </li>
      ))}
    </ul>
  );
}
