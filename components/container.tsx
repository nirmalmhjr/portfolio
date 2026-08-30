import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  as: Tag = "div",
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  size?: "default" | "wide";
}) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-5 sm:px-6",
        size === "default" && "max-w-2xl",
        size === "wide" && "max-w-4xl",
        className
      )}
    >
      {children}
    </Tag>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="pb-10 pt-6 sm:pt-10">
      {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
      <h1 className="text-balance text-3xl sm:text-4xl">{title}</h1>
      {description ? (
        <p className="pretty text-muted mt-4 text-lg">{description}</p>
      ) : null}
    </header>
  );
}
