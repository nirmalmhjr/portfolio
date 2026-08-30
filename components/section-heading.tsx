import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function SectionHeading({
  index,
  title,
  link,
}: {
  index: string;
  title: string;
  link?: { href: string; label: string };
}) {
  return (
    <div className="mb-10 flex items-end justify-between gap-6 border-b border-border/70 pb-4">
      <div className="flex items-baseline gap-4">
        <span className="label tabular-nums">{index}</span>
        <h2 className="font-display text-2xl sm:text-3xl">{title}</h2>
      </div>
      {link ? (
        <Link
          href={link.href}
          className="text-muted group inline-flex shrink-0 items-center gap-1 text-sm transition-colors hover:text-foreground"
        >
          {link.label}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      ) : null}
    </div>
  );
}
