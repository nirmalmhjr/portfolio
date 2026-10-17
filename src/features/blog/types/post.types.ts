import type { Frontmatter } from "@/features/blog/schemas/frontmatter.schema";

export interface Post {
  /** Raw MDX body (without frontmatter). */
  content: string;
  frontmatter: Frontmatter;
  readingTimeMinutes: number;
  readingTimeText: string;
  /** Route slug, derived from the filename (foo-bar.mdx -> foo-bar). */
  slug: string;
}

export interface TagCount {
  count: number;
  tag: string;
}
