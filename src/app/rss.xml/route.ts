import { Feed } from "feed";
import { ROUTES } from "@/configs/routes";
import { SITE_CONFIG, SOCIAL_LINKS } from "@/configs/site";
import { getPublishedPosts } from "@/features/blog/utils/posts";
import { absoluteUrl } from "@/lib/url";

export const dynamic = "force-static";

export function GET() {
  const feed = new Feed({
    author: {
      email: SITE_CONFIG.author.email,
      link: SITE_CONFIG.url,
      name: SITE_CONFIG.author.name,
    },
    copyright: `© ${new Date().getFullYear()} ${SITE_CONFIG.name}`,
    description: SITE_CONFIG.description,
    favicon: absoluteUrl(ROUTES.favicon),
    feedLinks: { rss2: absoluteUrl(ROUTES.rss) },
    id: SITE_CONFIG.url,
    language: "en",
    link: SITE_CONFIG.url,
    title: `${SITE_CONFIG.name} — Blog`,
  });

  for (const post of getPublishedPosts()) {
    const url = absoluteUrl(ROUTES.blogPost(post.slug));
    feed.addItem({
      author: [
        {
          email: SITE_CONFIG.author.email,
          link: SITE_CONFIG.url,
          name: SITE_CONFIG.author.name,
        },
      ],
      category: post.frontmatter.tags.map((name) => ({ name })),
      date: new Date(post.frontmatter.date),
      description: post.frontmatter.description,
      id: url,
      link: url,
      title: post.frontmatter.title,
    });
  }

  feed.addContributor({
    email: SITE_CONFIG.author.email,
    link: SOCIAL_LINKS.github,
    name: SITE_CONFIG.author.name,
  });

  return new Response(feed.rss2(), {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
