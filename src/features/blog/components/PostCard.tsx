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

/**
 * A small card for "Keep reading" under a post. On desktop it is a block
 * (cover, meta, title), three to a row. Below lg it becomes a row with the
 * thumbnail on the left, so the list stays short on phones and tablets.
 */
export function PostCardCompact({ post }: { readonly post: Post }) {
  const { title, description, date, image } = post.frontmatter;
  const titleId = `related-${post.slug}-title`;

  return (
    <Link
      aria-labelledby={titleId}
      className="card spot project group flex h-full items-center gap-4 p-3 lg:flex-col lg:items-stretch lg:gap-0 lg:p-0"
      href={ROUTES.blogPost(post.slug)}
    >
      {image ? (
        <div className="w-28 flex-none sm:w-40 lg:w-auto lg:p-2.5 lg:pb-0">
          <div className="shot shot-zoom rounded-lg border border-line lg:rounded-[10px]">
            <Image
              alt=""
              className="object-cover object-top"
              fill
              sizes="(min-width: 1024px) 360px, (min-width: 640px) 160px, 112px"
              src={image}
            />
          </div>
        </div>
      ) : null}
      <div className="flex min-w-0 flex-1 flex-col gap-1.5 lg:px-4 lg:pt-3.5 lg:pb-4">
        <p className="flex flex-wrap gap-x-2 font-mono text-faint text-xs">
          <time dateTime={date}>{formatDate(date, "short")}</time>
          <span aria-hidden>·</span>
          <span>{post.readingTimeMinutes} min read</span>
        </p>
        <h3
          className="text-balance font-semibold text-[15px] leading-[1.3] tracking-[-0.015em] sm:text-base"
          id={titleId}
        >
          {keepVersionsTogether(title)}
        </h3>
        {/* Tablet rows have room for a line or two; the desktop block keeps
            it only when there is no cover to carry the card. */}
        <p
          className={cn(
            // sm:line-clamp-2 sets the display itself; sm:block would undo the clamp.
            "hidden text-muted text-sm sm:line-clamp-2",
            image && "lg:hidden"
          )}
        >
          {keepVersionsTogether(description)}
        </p>
      </div>
    </Link>
  );
}

/** Columns in the post grids at the lg breakpoint. */
const LG_COLUMNS = 3;

/** Span for the "Writing now" tile, by how many posts share its row. */
const SM_SPAN_CLASS = { 1: "sm:col-span-1", 2: "sm:col-span-2" } as const;
const LG_SPAN_CLASS = { 1: "lg:col-span-1", 2: "lg:col-span-2" } as const;

/** The dashed tile that fills a short row until there are three posts. */
function WritingNowTile({ className }: { readonly className?: string }) {
  return (
    <div
      className={cn(
        "card flex flex-col items-start justify-center gap-3 border-line-strong border-dashed bg-transparent p-6 shadow-none",
        className
      )}
    >
      <span className="status status-soon">Writing now</span>
      <p className="max-w-[36ch] text-[15px] text-muted">
        More articles are on the way.
      </p>
    </div>
  );
}

interface PostGridProps {
  readonly children: ReactNode;
  /**
   * Fill a short first row with a "Writing now" tile, so fewer than three
   * posts never leave empty columns (used on the homepage).
   */
  readonly fillRow?: boolean;
}

/** Post cards three to a row on desktop, two on tablets, one on phones. */
export function PostGrid({ children, fillRow = false }: PostGridProps) {
  const count = Children.count(children);
  const showTile = fillRow && count > 0 && count < LG_COLUMNS;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {children}
      {showTile ? (
        <WritingNowTile
          className={cn(
            SM_SPAN_CLASS[count % 2 === 0 ? 2 : 1],
            LG_SPAN_CLASS[(LG_COLUMNS - count) as 1 | 2]
          )}
        />
      ) : null}
    </div>
  );
}

/**
 * Compact cards for "Keep reading": a stack of rows below lg, three blocks to
 * a row on desktop. A short desktop row gets the "Writing now" tile; rows
 * below lg don't need it.
 */
export function RelatedPostGrid({
  children,
}: {
  readonly children: ReactNode;
}) {
  const count = Children.count(children);
  const showTile = count > 0 && count < LG_COLUMNS;

  return (
    <div className="grid gap-3 lg:grid-cols-3 lg:gap-4">
      {children}
      {showTile ? (
        <WritingNowTile
          className={cn(
            "hidden lg:flex",
            LG_SPAN_CLASS[(LG_COLUMNS - count) as 1 | 2]
          )}
        />
      ) : null}
    </div>
  );
}
