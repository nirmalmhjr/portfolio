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
  size?: "default" | "prose";
}) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-5 sm:px-8",
        size === "default" && "max-w-[92rem]",
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
    <header className="border-b border-border py-10 sm:py-14">
      {label ? <p className="label mb-6">{label}</p> : null}
      <h1 className="display text-display-md">{title}</h1>
      {description ? (
        <p className="text-muted mt-6 max-w-2xl text-lg leading-relaxed">
          {description}
        </p>
      ) : null}
    </header>
  );
}
