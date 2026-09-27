import type { ElementType, ReactNode } from "react";
import { GlowBackdrop } from "@/components/glow-backdrop";
import { cn } from "@/lib/utils";

export function Container({
  as: Tag = "div",
  className,
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-site px-6 sm:px-10 lg:px-16",
        className
      )}
    >
      {children}
    </Tag>
  );
}

/** A full-width band with a top rule. Every homepage section uses one. */
export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative isolate overflow-hidden border-t border-line py-[76px] sm:py-[104px]",
        className
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}

/** Top of an inner page (About, Projects, Blog...). */
export function PageHeader({
  eyebrow,
  title,
  description,
  watermark,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  watermark?: string;
  children?: ReactNode;
}) {
  return (
    <header className="relative isolate overflow-hidden pb-14 pt-[132px] sm:pb-16 sm:pt-[168px]">
      <GlowBackdrop />
      <Container className="relative">
        {watermark ? (
          <span aria-hidden className="watermark">
            {watermark}
          </span>
        ) : null}
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 max-w-[22ch] text-[clamp(2.5rem,6vw,4.25rem)] font-bold leading-[1.02] tracking-[-0.045em]">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-[60ch] text-[17px] leading-relaxed text-muted">
            {description}
          </p>
        ) : null}
        {children}
      </Container>
    </header>
  );
}
