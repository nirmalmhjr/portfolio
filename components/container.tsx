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
  size?: "default" | "wide" | "prose";
}) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-5 sm:px-8",
        size === "default" && "max-w-5xl",
        size === "wide" && "max-w-6xl",
        size === "prose" && "max-w-3xl",
        className
      )}
    >
      {children}
    </Tag>
  );
}

export function PageHeader({
  label,
  title,
  description,
}: {
  label?: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="border-b border-border/70 pb-10 pt-4">
      {label ? <p className="label mb-4">{label}</p> : null}
      <h1 className="text-balance font-display text-4xl leading-[1.05] sm:text-6xl">
        {title}
      </h1>
      {description ? (
        <p className="text-muted mt-5 max-w-2xl text-lg leading-relaxed">
          {description}
        </p>
      ) : null}
    </header>
  );
}
