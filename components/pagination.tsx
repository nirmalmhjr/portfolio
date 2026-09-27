import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Pagination({
  currentPage,
  totalPages,
  basePath,
}: {
  currentPage: number;
  totalPages: number;
  /** e.g. "/blog" or "/blog/tag/react". The page is added as ?page=N. */
  basePath: string;
}) {
  if (totalPages <= 1) return null;

  const href = (page: number) =>
    page <= 1 ? basePath : `${basePath}?page=${page}`;

  return (
    <nav
      aria-label="Pagination"
      className="mt-12 flex items-center justify-between text-sm"
    >
      <PageLink
        href={href(currentPage - 1)}
        disabled={currentPage <= 1}
        rel="prev"
      >
        ← Newer
      </PageLink>
      <span className="font-mono text-xs text-faint">
        Page {currentPage} of {totalPages}
      </span>
      <PageLink
        href={href(currentPage + 1)}
        disabled={currentPage >= totalPages}
        rel="next"
      >
        Older →
      </PageLink>
    </nav>
  );
}

function PageLink({
  href,
  disabled,
  rel,
  children,
}: {
  href: string;
  disabled: boolean;
  rel: "prev" | "next";
  children: ReactNode;
}) {
  const className = cn(
    "rounded-full border border-line-strong px-4 py-2 font-medium transition-colors",
    disabled ? "pointer-events-none opacity-40" : "hover:bg-raised"
  );

  if (disabled) {
    return (
      <span className={className} aria-disabled>
        {children}
      </span>
    );
  }

  return (
    <Link href={href} rel={rel} className={className}>
      {children}
    </Link>
  );
}
