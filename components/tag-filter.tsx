import Link from "next/link";
import { getAllTags, tagSlug } from "@/lib/posts";
import { cn } from "@/lib/utils";

export function TagFilter({ activeTag }: { activeTag?: string }) {
  const tags = getAllTags();
  if (tags.length === 0) return null;

  const normalizedActive = activeTag?.toLowerCase();

  const pill =
    "rounded-full border px-3 py-1 font-mono text-xs transition-colors";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Link
        href="/blog"
        className={cn(
          pill,
          !normalizedActive
            ? "border-foreground bg-foreground text-background"
            : "text-muted border-border hover:border-foreground hover:text-foreground"
        )}
      >
        All
      </Link>
      {tags.map(({ tag, count }) => {
        const active = normalizedActive === tag.toLowerCase();
        return (
          <Link
            key={tag}
            href={`/blog/tag/${tagSlug(tag)}`}
            className={cn(
              pill,
              active
                ? "border-foreground bg-foreground text-background"
                : "text-muted border-border hover:border-foreground hover:text-foreground"
            )}
          >
            {tag}
            <span
              className={active ? "ml-1.5 opacity-60" : "ml-1.5 opacity-50"}
            >
              {count}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
