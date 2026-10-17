import { cn } from "@/lib/utils";

interface TechPillsProps {
  readonly className?: string;
  /** Items that get the accent style. */
  readonly primary?: readonly string[];
  readonly tech: readonly string[];
}

/** Tech tags; items in `primary` get the accent style. */
export function TechPills({ tech, primary = [], className }: TechPillsProps) {
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
