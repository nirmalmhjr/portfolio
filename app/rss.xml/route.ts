import { Feed } from "feed";
import { getAllPosts } from "@/lib/posts";
import { absoluteUrl, siteConfig, socialLinks } from "@/lib/site.config";

export const dynamic = "force-static";

export function GET() {
  const feed = new Feed({
    title: `${siteConfig.name} — Blog`,
    description: siteConfig.description,
    id: siteConfig.url,
    link: siteConfig.url,
    language: "en",
    favicon: absoluteUrl("/favicon.ico"),
    copyright: `© ${new Date().getFullYear()} ${siteConfig.name}`,
    feedLinks: { rss2: absoluteUrl("/rss.xml") },
    author: {
      name: siteConfig.author.name,
      email: siteConfig.author.email,
      link: siteConfig.url,
    },
  });

  for (const post of getAllPosts().filter((p) => !p.frontmatter.draft)) {
    const url = absoluteUrl(`/blog/${post.slug}`);
    feed.addItem({
      title: post.frontmatter.title,
      id: url,
      link: url,
      description: post.frontmatter.description,
      date: new Date(post.frontmatter.date),
      category: post.frontmatter.tags.map((name) => ({ name })),
      author: [
        {
          name: siteConfig.author.name,
          email: siteConfig.author.email,
          link: siteConfig.url,
        },
      ],
    });
  }

  feed.addContributor({
    name: siteConfig.author.name,
    email: siteConfig.author.email,
    link: socialLinks.github,
  });

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
