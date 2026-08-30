import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "main" | "section" | "article";
}) {
  return (
    <Tag className={cn("mx-auto w-full max-w-3xl px-4", className)}>
      {children}
    </Tag>
  );
}

export function PageHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-12">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      {description ? (
        <p className="text-muted mt-3 text-lg">{description}</p>
      ) : null}
    </div>
  );
}
