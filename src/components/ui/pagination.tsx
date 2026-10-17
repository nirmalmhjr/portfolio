import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  readonly currentPage: number;
  /** Builds the link for a page number, e.g. ROUTES.blogPage. */
  readonly pageHref: (page: number) => string;
  readonly totalPages: number;
}

export function Pagination({
  currentPage,
  totalPages,
  pageHref,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="Pagination"
      className="mt-12 flex items-center justify-between text-sm"
    >
      <PageLink
        disabled={currentPage <= 1}
        href={pageHref(currentPage - 1)}
        rel="prev"
      >
        ← Newer
      </PageLink>
      <span className="font-mono text-faint text-xs">
        Page {currentPage} of {totalPages}
      </span>
      <PageLink
        disabled={currentPage >= totalPages}
        href={pageHref(currentPage + 1)}
        rel="next"
      >
        Older →
      </PageLink>
    </nav>
  );
}

interface PageLinkProps {
  readonly children: ReactNode;
  readonly disabled: boolean;
  readonly href: string;
  readonly rel: "prev" | "next";
}

function PageLink({ href, disabled, rel, children }: PageLinkProps) {
  const className = cn(
    "rounded-full border border-line-strong px-4 py-2 font-medium transition-colors",
    disabled ? "pointer-events-none opacity-40" : "hover:bg-raised"
  );

  if (disabled) {
    return (
      <span aria-disabled className={className}>
        {children}
      </span>
    );
  }

  return (
    <Link className={className} href={href} rel={rel}>
      {children}
    </Link>
  );
}
