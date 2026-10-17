import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { SITE_CONFIG } from "@/configs/site";
import { SERVER_ENV } from "@/env/server";
import { parseFrontmatter } from "@/features/blog/schemas/frontmatter.schema";
import type { Post, TagCount } from "@/features/blog/types/post.types";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const MDX_EXTENSION = /\.mdx?$/;
/** Files starting with "_" (like _template.mdx) are never published. */
const IGNORED_PREFIX = "_";

function getMdxFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => MDX_EXTENSION.test(f) && !f.startsWith(IGNORED_PREFIX));
}

function slugFromFilename(file: string): string {
  return file.replace(MDX_EXTENSION, "");
}

function readPost(file: string): Post {
  const fullPath = path.join(BLOG_DIR, file);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = parseFrontmatter(data, `content/blog/${file}`);
  const stats = readingTime(content);

  return {
    content,
    frontmatter,
    readingTimeMinutes: Math.max(1, Math.round(stats.minutes)),
    readingTimeText: stats.text,
    slug: slugFromFilename(file),
  };
}

/**
 * Reads every post from content/blog, newest first. Drafts are included in
 * development (so you can preview them) and left out in production.
 *
 * @returns All posts, newest first.
 */
export function getAllPosts(): Post[] {
  const includeDrafts = SERVER_ENV.NODE_ENV !== "production";
  return getMdxFiles()
    .map(readPost)
    .filter((p) => includeDrafts || !p.frontmatter.draft)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
}

/**
 * Posts that appear in listings, feeds and "more posts" links: never drafts,
 * not even in development.
 *
 * @returns Published posts, newest first.
 */
export function getPublishedPosts(): Post[] {
  return getAllPosts().filter((p) => !p.frontmatter.draft);
}

/**
 * Counts the pages of the blog listing (at least one, even with no posts).
 *
 * @returns Number of listing pages.
 */
export function getTotalPages(): number {
  return Math.max(
    1,
    Math.ceil(getPublishedPosts().length / SITE_CONFIG.postsPerPage)
  );
}

/**
 * Finds a post by its slug.
 *
 * @param slug - Filename without the extension.
 * @returns The post, or undefined if there is none.
 */
export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

/**
 * Lists the unique tags across all posts, sorted, with post counts.
 *
 * @returns One entry per tag.
 */
export function getAllTags(): TagCount[] {
  const counts = new Map<string, number>();
  for (const post of getAllPosts()) {
    for (const tag of post.frontmatter.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ count, tag }))
    .sort((a, b) => a.tag.localeCompare(b.tag));
}

/**
 * Lists the published posts with a tag (case-insensitive).
 *
 * @param tag - Tag to match.
 * @returns Matching published posts, newest first.
 */
export function getPostsByTag(tag: string): Post[] {
  const target = tag.toLowerCase();
  return getPublishedPosts().filter((p) =>
    p.frontmatter.tags.some((t) => t.toLowerCase() === target)
  );
}

/**
 * Turns a tag into its URL segment, e.g. "Next.js" -> "next.js".
 *
 * @param tag - Tag as written in frontmatter.
 * @returns Lowercased, URL-encoded tag.
 */
export function tagSlug(tag: string): string {
  return encodeURIComponent(tag.toLowerCase());
}
