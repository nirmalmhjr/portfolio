import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Children, type ReactNode } from "react";
import { ROUTES } from "@/configs/routes";
import type { Post } from "@/features/blog/types/post.types";
import { cn, formatDate } from "@/lib/utils";

/** Keeps a version number on the same line as its name ("Vue 3", "Nuxt 3"). */
function keepVersionsTogether(text: string) {
  return text.replace(/ (?=\d)/g, " ");
}

interface PostCardProps {
  /** h2 where the page has no section heading above the cards (/blog, tag pages). */
  readonly headingLevel?: "h2" | "h3";
  readonly post: Post;
}

/**
 * A block card, laid out like the project cards: an optional 16:10 cover on
 * top, then meta, title and description, with tags and the link pinned to the
 * bottom so they line up across a row.
 */
export function PostCard({ post, headingLevel = "h3" }: PostCardProps) {
  const { title, description, date, tags, image } = post.frontmatter;
  const Heading = headingLevel;
  const titleId = `post-${post.slug}-title`;

  return (
    // Named by the title alone, so screen readers don't read the whole card as the link.
    <Link
      aria-labelledby={titleId}
      className="card spot project group flex h-full flex-col"
      href={ROUTES.blogPost(post.slug)}
    >
      {image ? (
        <div className="p-3 pb-0">
          <div className="shot shot-zoom rounded-[10px] border border-line">
            <Image
              alt=""
              className="object-cover object-top"
              fill
              sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
              src={image}
            />
          </div>
        </div>
      ) : null}
      <div className="flex flex-1 flex-col gap-2.5 p-5 sm:p-6">
        <p className="flex flex-wrap gap-x-2.5 font-mono text-faint text-xs">
          <time dateTime={date}>{formatDate(date, "short")}</time>
          <span aria-hidden>·</span>
          <span>{post.readingTimeMinutes} min read</span>
        </p>
        <Heading
          className="text-balance font-semibold text-[19px] leading-[1.25] tracking-[-0.02em]"
          id={titleId}
        >
          {keepVersionsTogether(title)}
        </Heading>
        <p className="text-[15px] text-muted">
          {keepVersionsTogether(description)}
        </p>
        {tags.length > 0 ? (
          <ul className="mt-auto flex flex-wrap gap-1.5 pt-2">
            {tags.map((tag) => (
              <li className="pill" key={tag}>
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
        <span
          className={cn(
            "inline-flex items-center gap-1.5 pt-1 text-ink text-sm",
            tags.length === 0 && "mt-auto"
          )}
        >
          Read article
          <ArrowRight
            aria-hidden
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-[3px]"
          />
        </span>
      </div>
    </Link>
  );
}

/** Columns in the post grid at the lg breakpoint. */
const LG_COLUMNS = 3;

/** Span for the "Writing now" tile, by how many posts share its row. */
const SM_SPAN_CLASS = { 1: "sm:col-span-1", 2: "sm:col-span-2" } as const;
const LG_SPAN_CLASS = { 1: "lg:col-span-1", 2: "lg:col-span-2" } as const;

/** Grid columns from the sm breakpoint up. */
const GRID_CLASS = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
} as const;

interface PostGridProps {
  readonly children: ReactNode;
  /** 3 on full-width pages; 2 in the narrow post column ("Keep reading"). */
  readonly columns?: 2 | 3;
  /**
   * Fill a short first row with a "Writing now" tile, so fewer than three
   * posts never leave empty columns (used on the homepage).
   */
  readonly fillRow?: boolean;
}

/** Post cards three to a row on desktop, two on tablets, one on phones. */
export function PostGrid({
  children,
  columns = 3,
  fillRow = false,
}: PostGridProps) {
  const count = Children.count(children);
  const showTile = fillRow && columns === 3 && count > 0 && count < LG_COLUMNS;

  return (
    <div className={cn("grid gap-4", GRID_CLASS[columns])}>
      {children}
      {showTile ? (
        <div
          className={cn(
            "card flex flex-col items-start justify-center gap-3 border-line-strong border-dashed bg-transparent p-6 shadow-none",
            SM_SPAN_CLASS[count % 2 === 0 ? 2 : 1],
            LG_SPAN_CLASS[(LG_COLUMNS - count) as 1 | 2]
          )}
        >
          <span className="status status-soon">Writing now</span>
          <p className="max-w-[36ch] text-[15px] text-muted">
            More articles are on the way.
          </p>
        </div>
      ) : null}
    </div>
  );
}
