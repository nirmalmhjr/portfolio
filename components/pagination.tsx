import Link from "next/link";
import { cn } from "@/lib/utils";

export function Pagination({
  currentPage,
  totalPages,
  basePath,
}: {
  currentPage: number;
  totalPages: number;
  /** e.g. "/blog" or "/blog/tag/react" — page is added as ?page=N */
  basePath: string;
}) {
  if (totalPages <= 1) return null;

  const href = (page: number) =>
    page <= 1 ? basePath : `${basePath}?page=${page}`;

  const prevDisabled = currentPage <= 1;
  const nextDisabled = currentPage >= totalPages;

  return (
    <nav
      className="mt-14 flex items-center justify-between border-t border-border pt-6 text-sm"
      aria-label="Pagination"
    >
      <PageLink href={href(currentPage - 1)} disabled={prevDisabled} rel="prev">
        ← Newer
      </PageLink>

      <span className="text-muted font-mono text-xs uppercase tracking-wider">
        {String(currentPage).padStart(2, "0")} /{" "}
        {String(totalPages).padStart(2, "0")}
      </span>

      <PageLink href={href(currentPage + 1)} disabled={nextDisabled} rel="next">
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
  children: React.ReactNode;
}) {
  const className = cn(
    "rounded-full border border-border px-4 py-1.5 transition-colors",
    disabled
      ? "pointer-events-none opacity-40"
      : "hover:border-foreground hover:text-accent"
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
