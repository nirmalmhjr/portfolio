import Link from "next/link";
import type { Post } from "@/lib/posts";
import { tagSlug } from "@/lib/posts";
import { formatDate } from "@/lib/utils";

export function PostCard({ post }: { post: Post }) {
  const { slug, frontmatter, readingTimeText } = post;

  return (
    <article className="group border-b py-6 first:pt-0 last:border-b-0">
      <div className="text-muted flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
        <time dateTime={frontmatter.date}>{formatDate(frontmatter.date)}</time>
        <span aria-hidden>·</span>
        <span>{readingTimeText}</span>
        {frontmatter.draft ? (
          <span className="bg-muted rounded px-1.5 py-0.5 font-medium uppercase tracking-wide">
            Draft
          </span>
        ) : null}
      </div>

      <h2 className="mt-2 text-xl font-semibold tracking-tight">
        <Link href={`/blog/${slug}`} className="hover:underline">
          {frontmatter.title}
        </Link>
      </h2>

      <p className="text-muted mt-2 text-sm">{frontmatter.description}</p>

      {frontmatter.tags.length > 0 ? (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {frontmatter.tags.map((tag) => (
            <li key={tag}>
              <Link
                href={`/blog/tag/${tagSlug(tag)}`}
                className="text-muted hover:bg-muted rounded border px-1.5 py-0.5 text-xs"
              >
                #{tag}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
