import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Post } from "@/lib/posts";
import { formatDate } from "@/lib/utils";

export function PostCard({ post }: { post: Post }) {
  const { slug, frontmatter, readingTimeMinutes } = post;

  return (
    <Link
      href={`/blog/${slug}`}
      className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-x-5 gap-y-2 border-b border-border py-7 transition-colors hover:bg-surface sm:gap-x-8 sm:py-8"
    >
      <span className="label whitespace-nowrap pt-1">
        {formatDate(frontmatter.date)}
      </span>

      <div className="min-w-0">
        <h3 className="display flex items-center gap-3 text-[clamp(1.35rem,2.6vw,2rem)] transition-transform duration-300 group-hover:translate-x-2">
          {frontmatter.title}
          {frontmatter.draft ? (
            <span className="rounded-sm bg-accent/15 px-1.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider text-accent">
              Draft
            </span>
          ) : null}
        </h3>
        <p className="text-muted mt-2 max-w-xl text-sm leading-relaxed">
          {frontmatter.description}
        </p>
        {frontmatter.tags.length > 0 ? (
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
            {frontmatter.tags.map((tag) => (
              <li
                key={tag}
                className="text-muted font-mono text-[0.7rem] uppercase tracking-wider"
              >
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <span className="label hidden whitespace-nowrap pt-1 text-right sm:flex sm:items-center sm:gap-2">
        {readingTimeMinutes} min
        <ArrowUpRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
      </span>
    </Link>
  );
}
