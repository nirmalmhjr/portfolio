import { Feed } from "feed";
import { getAllPosts } from "@/lib/posts";
import { absoluteUrl, siteConfig, socialLinks } from "@/lib/site.config";

export const dynamic = "force-static";

export function GET() {
  const feed = new Feed({
    author: {
      email: siteConfig.author.email,
      link: siteConfig.url,
      name: siteConfig.author.name,
    },
    copyright: `© ${new Date().getFullYear()} ${siteConfig.name}`,
    description: siteConfig.description,
    favicon: absoluteUrl("/favicon.ico"),
    feedLinks: { rss2: absoluteUrl("/rss.xml") },
    id: siteConfig.url,
    language: "en",
    link: siteConfig.url,
    title: `${siteConfig.name} — Blog`,
  });

  for (const post of getAllPosts().filter((p) => !p.frontmatter.draft)) {
    const url = absoluteUrl(`/blog/${post.slug}`);
    feed.addItem({
      author: [
        {
          email: siteConfig.author.email,
          link: siteConfig.url,
          name: siteConfig.author.name,
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
    email: siteConfig.author.email,
    link: socialLinks.github,
    name: siteConfig.author.name,
  });

  return new Response(feed.rss2(), {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
