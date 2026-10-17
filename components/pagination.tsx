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
  /** e.g. "/blog". Later pages live at `${basePath}/page/N`. */
  basePath: string;
}) {
  if (totalPages <= 1) {
    return null;
  }

  const href = (page: number) =>
    page <= 1 ? basePath : `${basePath}/page/${page}`;

  return (
    <nav
      aria-label="Pagination"
      className="mt-12 flex items-center justify-between text-sm"
    >
      <PageLink
        disabled={currentPage <= 1}
        href={href(currentPage - 1)}
        rel="prev"
      >
        ← Newer
      </PageLink>
      <span className="font-mono text-faint text-xs">
        Page {currentPage} of {totalPages}
      </span>
      <PageLink
        disabled={currentPage >= totalPages}
        href={href(currentPage + 1)}
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
