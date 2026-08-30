import Link from "next/link";
import { getAllTags, tagSlug } from "@/lib/posts";
import { cn } from "@/lib/utils";

export function TagFilter({ activeTag }: { activeTag?: string }) {
  const tags = getAllTags();
  if (tags.length === 0) return null;

  const normalizedActive = activeTag?.toLowerCase();

  return (
    <div className="mb-8 flex flex-wrap gap-2">
      <Link
        href="/blog"
        className={cn(
          "hover:bg-muted rounded-full border px-3 py-1 text-xs transition-colors",
          !normalizedActive && "bg-muted font-medium"
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
              "hover:bg-muted rounded-full border px-3 py-1 text-xs transition-colors",
              active && "bg-muted font-medium"
            )}
          >
            {tag}
            <span className="text-muted ml-1">{count}</span>
          </Link>
        );
      })}
    </div>
  );
}
