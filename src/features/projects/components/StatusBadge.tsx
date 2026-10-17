import type { ProjectStatus } from "@/features/projects/types/project.types";

const STATUS_STYLES: Record<
  ProjectStatus,
  { readonly className: string; readonly label: string }
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

interface StatusBadgeProps {
  /** Overrides the default text for the status. */
  readonly label?: string;
  readonly status: ProjectStatus;
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const style = STATUS_STYLES[status];
  return <span className={style.className}>{label ?? style.label}</span>;
}
