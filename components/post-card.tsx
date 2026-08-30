import Link from "next/link";
import type { Post } from "@/lib/posts";
import { formatDate } from "@/lib/utils";

export function PostCard({ post }: { post: Post }) {
  const { slug, frontmatter, readingTimeMinutes } = post;

  return (
    <Link
      href={`/blog/${slug}`}
      className="hover:bg-muted group -mx-3 block rounded-xl px-3 py-4 transition-colors"
    >
      <div className="flex items-baseline gap-3">
        <h3 className="font-bold leading-snug transition-colors group-hover:text-accent">
          {frontmatter.title}
        </h3>
        {frontmatter.draft ? (
          <span className="rounded-md bg-accent-soft px-1.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-accent">
            Draft
          </span>
        ) : null}
      </div>

      <p className="text-muted mt-1.5 text-sm leading-relaxed">
        {frontmatter.description}
      </p>

      <p className="text-muted mt-2 flex items-center gap-2 text-xs">
        <time dateTime={frontmatter.date}>{formatDate(frontmatter.date)}</time>
        <span aria-hidden>·</span>
        <span>{readingTimeMinutes} min read</span>
        {frontmatter.tags.length > 0 ? (
          <>
            <span aria-hidden>·</span>
            <span>{frontmatter.tags.join(", ")}</span>
          </>
        ) : null}
      </p>
    </Link>
  );
}
