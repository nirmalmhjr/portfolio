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
    <div className="mb-12 border-t border-border pt-4">
      <div className="flex items-start justify-between gap-6">
        <span className="label mt-2">
          ({index}) {" — "} {title}
        </span>
        {link ? (
          <Link
            href={link.href}
            className="text-muted group mt-2 inline-flex shrink-0 items-center gap-1 font-mono text-[0.7rem] uppercase tracking-widest transition-colors hover:text-foreground"
          >
            {link.label}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        ) : null}
      </div>
      <h2 className="display mt-4 text-display-sm">{title}</h2>
    </div>
  );
}
