import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function SectionHeading({
  title,
  link,
}: {
  title: string;
  link?: { href: string; label: string };
}) {
  return (
    <div className="mb-6 flex items-baseline justify-between gap-4">
      <h2 className="text-xl font-bold tracking-tight sm:text-2xl">{title}</h2>
      {link ? (
        <Link
          href={link.href}
          className="text-muted group inline-flex shrink-0 items-center gap-1 text-sm font-medium transition-colors hover:text-accent"
        >
          {link.label}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      ) : null}
    </div>
  );
}
