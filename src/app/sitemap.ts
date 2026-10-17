import type { MetadataRoute } from "next";
import { ROUTES } from "@/configs/routes";
import { getPublishedPosts } from "@/features/blog/utils/posts";
import { USES } from "@/features/uses/constants/uses";
import { absoluteUrl } from "@/lib/url";

const PAGES = [
  ROUTES.home,
  ROUTES.projects,
  ROUTES.about,
  ROUTES.resume,
  ROUTES.contact,
];

/**
 * /sitemap.xml. Lists the real pages only: /uses joins once it has content,
 * and the blog once a post is published. Tag and "page N" listings are left
 * out because they only repeat the posts.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPublishedPosts();

  return [
    ...PAGES.map((path) => ({ url: absoluteUrl(path) })),
    ...(USES.length > 0 ? [{ url: absoluteUrl(ROUTES.uses) }] : []),
    ...(posts.length > 0 ? [{ url: absoluteUrl(ROUTES.blog) }] : []),
    ...posts.map((post) => ({
      lastModified: post.frontmatter.updated ?? post.frontmatter.date,
      url: absoluteUrl(ROUTES.blogPost(post.slug)),
    })),
  ];
}
