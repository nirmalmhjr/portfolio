/**
 * Runs on `postbuild` (see package.json) and writes public/sitemap.xml,
 * public/sitemap-0.xml, and public/robots.txt.
 *
 * Static and SSG pages are discovered from the build output automatically.
 * The blog listing (`/blog`) and tag pages render dynamically (they read
 * `?page=`), so they're added explicitly via `additionalPaths` below by
 * scanning content/blog — the same source of truth the app uses.
 *
 * @type {import('next-sitemap').IConfig}
 */
const fs = require("node:fs");
const path = require("node:path");
const matter = require("gray-matter");

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"
).replace(/\/$/, "");

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

// /uses renders a 404 until lib/uses.json has content, so keep it out of the sitemap.
const usesIsEmpty = require("./lib/uses.json").length === 0;

function readPublishedPosts() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => /\.mdx?$/.test(f) && !f.startsWith("_"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
      const { data } = matter(raw);
      return { slug: file.replace(/\.mdx?$/, ""), ...data };
    })
    .filter((p) => !p.draft);
}

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  // Non-page routes that Next emits into the build manifest.
  exclude: [
    "/rss.xml",
    "/icon.svg",
    "/opengraph-image",
    "/opengraph-image/*",
    ...(usesIsEmpty ? ["/uses"] : []),
  ],
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
    additionalSitemaps: [`${siteUrl}/sitemap.xml`],
  },
  transform: async (config, url) => ({
    loc: url,
    changefreq: url.startsWith("/blog/") ? "monthly" : config.changefreq,
    priority:
      url === "/" ? 1.0 : url.startsWith("/blog/") ? 0.8 : config.priority,
    lastmod: new Date().toISOString(),
  }),
  additionalPaths: async (config) => {
    const posts = readPublishedPosts();
    const tags = new Set();
    for (const p of posts)
      for (const t of p.tags ?? []) tags.add(t.toLowerCase());

    const extra = [
      "/blog",
      ...[...tags].map((t) => `/blog/tag/${encodeURIComponent(t)}`),
    ];
    return Promise.all(extra.map((loc) => config.transform(config, loc)));
  },
};
