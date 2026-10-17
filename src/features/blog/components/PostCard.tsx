import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/configs/routes";
import type { Post } from "@/features/blog/types/post.types";
import { formatDate } from "@/lib/utils";

interface PostCardProps {
  readonly post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const { title, description, date, tags } = post.frontmatter;

  return (
    <Link
      className="card spot group grid content-start gap-3 p-6"
      href={ROUTES.blogPost(post.slug)}
    >
      <p className="flex flex-wrap gap-2.5 font-mono text-faint text-xs">
        <time dateTime={date}>{formatDate(date, "short")}</time>
        <span aria-hidden>·</span>
        <span>{post.readingTimeMinutes} min read</span>
      </p>
      <h3 className="font-semibold text-lg leading-snug tracking-[-0.015em]">
        {title}
      </h3>
      <p className="text-[15px] text-muted">{description}</p>
      {tags.length > 0 ? (
        <ul className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <li className="pill" key={tag}>
              {tag}
            </li>
          ))}
        </ul>
      ) : null}
      <span className="mt-1 inline-flex items-center gap-1.5 text-ink text-sm">
        Read article
        <ArrowRight
          aria-hidden
          className="h-3.5 w-3.5 transition-transform group-hover:translate-x-[3px]"
        />
      </span>
    </Link>
  );
}
