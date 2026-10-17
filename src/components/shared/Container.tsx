import type { ElementType, ReactNode } from "react";
import { GlowBackdrop } from "@/components/ui/glow-backdrop";
import { cn } from "@/lib/utils";

interface ContainerProps {
  readonly as?: ElementType;
  readonly children: ReactNode;
  readonly className?: string;
}

export function Container({
  as: Tag = "div",
  className,
  children,
}: ContainerProps) {
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
interface SectionProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly id?: string;
}

export function Section({ id, className, children }: SectionProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden border-line border-t py-[76px] sm:py-[104px]",
        className
      )}
      id={id}
    >
      <Container>{children}</Container>
    </section>
  );
}

/** Top of an inner page (About, Projects, Blog...). */
interface PageHeaderProps {
  readonly children?: ReactNode;
  readonly description?: ReactNode;
  readonly eyebrow: string;
  readonly title: ReactNode;
  readonly watermark?: string;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  watermark,
  children,
}: PageHeaderProps) {
  return (
    <header className="relative isolate overflow-hidden pt-[132px] pb-14 sm:pt-[168px] sm:pb-16">
      <GlowBackdrop />
      <Container className="relative">
        {watermark ? (
          <span aria-hidden className="watermark" data-text={watermark} />
        ) : null}
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 max-w-[22ch] font-bold text-[clamp(2.5rem,6vw,4.25rem)] leading-[1.02] tracking-[-0.045em]">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-[60ch] text-[17px] text-muted leading-relaxed">
            {description}
          </p>
        ) : null}
        {children}
      </Container>
    </header>
  );
}
