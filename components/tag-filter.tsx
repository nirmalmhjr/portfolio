import Link from "next/link";
import { getAllTags, tagSlug } from "@/lib/posts";
import { cn } from "@/lib/utils";

export function TagFilter({ activeTag }: { activeTag?: string }) {
  const tags = getAllTags();
  if (tags.length === 0) return null;

  const active = activeTag?.toLowerCase();
  const base =
    "inline-flex h-9 items-center gap-2 rounded-full px-3.5 text-sm font-medium transition-colors";
  const on = "bg-fg text-canvas";
  const off = "border border-line text-muted hover:text-fg";

  return (
    <nav aria-label="Filter posts by tag" className="flex flex-wrap gap-2">
      <Link
        href="/blog"
        aria-current={!active ? "page" : undefined}
        className={cn(base, !active ? on : off)}
      >
        All
      </Link>
      {tags.map(({ tag, count }) => {
        const isActive = active === tag.toLowerCase();
        return (
          <Link
            key={tag}
            href={`/blog/tag/${tagSlug(tag)}`}
            aria-current={isActive ? "page" : undefined}
            className={cn(base, isActive ? on : off)}
          >
            {tag}
            <span className="font-mono text-[11px] opacity-60">{count}</span>
          </Link>
        );
      })}
    </nav>
  );
}
