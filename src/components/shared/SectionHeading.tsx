import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

interface SectionHeadingProps {
  readonly description?: ReactNode;
  readonly eyebrow: string;
  readonly link?: { readonly href: string; readonly label: string };
  readonly title: ReactNode;
  /** Large faded word behind the heading. */
  readonly watermark?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  watermark,
  link,
}: SectionHeadingProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6">
      <div className="relative">
        {watermark ? (
          <span aria-hidden className="watermark" data-text={watermark} />
        ) : null}
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-3.5 font-bold text-[clamp(2rem,4.5vw,3rem)] leading-[1.05] tracking-[-0.04em]">
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
          className="inline-flex items-center gap-1.5 text-ink text-sm hover:underline hover:underline-offset-[3px]"
          href={link.href}
        >
          {link.label}
          <ArrowRight aria-hidden className="h-3.5 w-3.5" />
        </Link>
      ) : null}
    </div>
  );
}
