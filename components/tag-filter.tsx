import Link from "next/link";
import { getAllTags, tagSlug } from "@/lib/posts";
import { cn } from "@/lib/utils";

export function TagFilter({ activeTag }: { activeTag?: string }) {
  const tags = getAllTags();
  if (tags.length === 0) return null;

  const normalizedActive = activeTag?.toLowerCase();

  const base =
    "border px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-widest transition-colors";
  const on = "border-foreground bg-foreground text-background";
  const off =
    "border-border text-muted hover:border-foreground hover:text-foreground";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Link href="/blog" className={cn(base, !normalizedActive ? on : off)}>
        All
      </Link>
      {tags.map(({ tag, count }) => {
        const active = normalizedActive === tag.toLowerCase();
        return (
          <Link
            key={tag}
            href={`/blog/tag/${tagSlug(tag)}`}
            className={cn(base, active ? on : off)}
          >
            {tag}
            <span className="ml-2 opacity-50">{count}</span>
          </Link>
        );
      })}
    </div>
  );
}
