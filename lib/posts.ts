import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { parseFrontmatter, type Frontmatter } from "@/lib/schema";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface Post {
  /** Route slug, derived from the filename (foo-bar.mdx -> foo-bar). */
  slug: string;
  frontmatter: Frontmatter;
  /** Raw MDX body (without frontmatter). */
  content: string;
  readingTimeText: string;
  readingTimeMinutes: number;
}

function getMdxFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => /\.mdx?$/.test(f) && !f.startsWith("_"));
}

function slugFromFilename(file: string): string {
  return file.replace(/\.mdx?$/, "");
}

function readPost(file: string): Post {
  const fullPath = path.join(BLOG_DIR, file);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = parseFrontmatter(data, `content/blog/${file}`);
  const stats = readingTime(content);

  return {
    slug: slugFromFilename(file),
    frontmatter,
    content,
    readingTimeText: stats.text,
    readingTimeMinutes: Math.max(1, Math.round(stats.minutes)),
  };
}

/** Every published post, newest first. Drafts are excluded in production. */
export function getAllPosts(): Post[] {
  const includeDrafts = process.env.NODE_ENV !== "production";
  return getMdxFiles()
    .map(readPost)
    .filter((p) => includeDrafts || !p.frontmatter.draft)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

/** Unique tags across all posts, sorted, with post counts. */
export function getAllTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const post of getAllPosts()) {
    for (const tag of post.frontmatter.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => a.tag.localeCompare(b.tag));
}

export function getPostsByTag(tag: string): Post[] {
  const target = tag.toLowerCase();
  return getAllPosts().filter((p) =>
    p.frontmatter.tags.some((t) => t.toLowerCase() === target)
  );
}

export function tagSlug(tag: string): string {
  return encodeURIComponent(tag.toLowerCase());
}
