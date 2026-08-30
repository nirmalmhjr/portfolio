import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Post } from "@/lib/posts";
import { tagSlug } from "@/lib/posts";
import { formatDate } from "@/lib/utils";

export function PostCard({ post }: { post: Post }) {
  const { slug, frontmatter, readingTimeMinutes } = post;

  return (
    <article className="group relative border-b border-border/70 py-8 transition-colors first:pt-0">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-baseline">
        <div className="text-muted flex shrink-0 items-center gap-3 font-mono text-xs uppercase tracking-wider sm:w-40 sm:flex-col sm:items-start sm:gap-1">
          <time dateTime={frontmatter.date}>
            {formatDate(frontmatter.date)}
          </time>
          <span className="sm:text-muted">{readingTimeMinutes} min read</span>
          {frontmatter.draft ? (
            <span className="rounded bg-accent/15 px-1.5 py-0.5 text-accent">
              Draft
            </span>
          ) : null}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="font-display text-2xl leading-snug transition-colors group-hover:text-accent">
            <Link
              href={`/blog/${slug}`}
              className="after:absolute after:inset-0"
            >
              {frontmatter.title}
            </Link>
          </h3>
          <p className="text-muted mt-2 text-[15px] leading-relaxed">
            {frontmatter.description}
          </p>
          {frontmatter.tags.length > 0 ? (
            <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
              {frontmatter.tags.map((tag) => (
                <li key={tag}>
                  <Link
                    href={`/blog/tag/${tagSlug(tag)}`}
                    className="text-muted relative z-10 font-mono text-xs hover:text-foreground"
                  >
                    #{tag}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <ArrowUpRight className="text-muted hidden h-5 w-5 shrink-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent sm:block" />
      </div>
    </article>
  );
}
