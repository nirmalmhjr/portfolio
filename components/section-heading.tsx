import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  watermark,
  link,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  /** Large faded word behind the heading. */
  watermark?: string;
  link?: { href: string; label: string };
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6">
      <div className="relative">
        {watermark ? (
          <span aria-hidden className="watermark" data-text={watermark} />
        ) : null}
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-3.5 text-[clamp(2rem,4.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.04em]">
          {title}
        </h2>
        {description ? (
          <p className="mt-3.5 max-w-[60ch] text-[17px] text-muted">
            {description}
          </p>
        ) : null}
      </div>
      {link ? (
        <Link
          href={link.href}
          className="inline-flex items-center gap-1.5 text-sm text-ink hover:underline hover:underline-offset-[3px]"
        >
          {link.label}
          <ArrowRight aria-hidden className="h-3.5 w-3.5" />
        </Link>
      ) : null}
    </div>
  );
}
