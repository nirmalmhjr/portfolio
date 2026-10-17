import Link from "next/link";
import { ROUTES } from "@/configs/routes";
import { getAllTags, tagSlug } from "@/features/blog/utils/posts";
import { cn } from "@/lib/utils";

const BASE_CLASS =
  "inline-flex h-9 items-center gap-2 rounded-full px-3.5 text-sm font-medium transition-colors";
const ACTIVE_CLASS = "bg-fg text-canvas";
const INACTIVE_CLASS = "border border-line text-muted hover:text-fg";

interface TagFilterProps {
  /** The tag being shown; "All" is active when this is empty. */
  readonly activeTag?: string;
}

export function TagFilter({ activeTag }: TagFilterProps) {
  const tags = getAllTags();
  if (tags.length === 0) {
    return null;
  }

  const active = activeTag?.toLowerCase();
  return (
    <nav aria-label="Filter posts by tag" className="flex flex-wrap gap-2">
      <Link
        aria-current={active ? undefined : "page"}
        className={cn(BASE_CLASS, active ? INACTIVE_CLASS : ACTIVE_CLASS)}
        href={ROUTES.blog}
      >
        All
      </Link>
      {tags.map(({ tag, count }) => {
        const isActive = active === tag.toLowerCase();
        return (
          <Link
            aria-current={isActive ? "page" : undefined}
            className={cn(BASE_CLASS, isActive ? ACTIVE_CLASS : INACTIVE_CLASS)}
            href={ROUTES.blogTag(tagSlug(tag))}
            key={tag}
          >
            {tag}
            <span className="font-mono text-[11px] opacity-60">{count}</span>
          </Link>
        );
      })}
    </nav>
  );
}
