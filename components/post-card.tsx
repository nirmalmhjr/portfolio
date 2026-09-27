import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Post } from "@/lib/posts";
import { formatDate } from "@/lib/utils";

export function PostCard({ post }: { post: Post }) {
  const { title, description, date, tags } = post.frontmatter;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="card spot group grid content-start gap-3 p-6"
    >
      <p className="flex flex-wrap gap-2.5 font-mono text-xs text-faint">
        <time dateTime={date}>{formatDate(date, "short")}</time>
        <span aria-hidden>·</span>
        <span>{post.readingTimeMinutes} min read</span>
      </p>
      <h3 className="text-lg font-semibold leading-snug tracking-[-0.015em]">
        {title}
      </h3>
      <p className="text-[15px] text-muted">{description}</p>
      {tags.length > 0 ? (
        <ul className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <li key={tag} className="pill">
              {tag}
            </li>
          ))}
        </ul>
      ) : null}
      <span className="mt-1 inline-flex items-center gap-1.5 text-sm text-ink">
        Read article
        <ArrowRight
          aria-hidden
          className="h-3.5 w-3.5 transition-transform group-hover:translate-x-[3px]"
        />
      </span>
    </Link>
  );
}
