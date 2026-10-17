/**
 * Runs on `postbuild` (see package.json) and writes public/sitemap.xml,
 * public/sitemap-0.xml and public/robots.txt.
 *
 * Every page is statically generated (including /blog, /blog/page/N and tag
 * pages), so routes are discovered from the build output automatically.
 *
 * @type {import('next-sitemap').IConfig}
 */
// Runs in plain Node after the build, outside the app, so it reads
// process.env directly instead of going through src/env (keep the default in
// sync with DEFAULT_SITE_URL in src/env/client.ts).
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://nirmal-maharjan.com.np"
).replace(/\/$/, "");

// /uses renders a 404 until src/features/uses/constants/uses.json has content, so keep it out of the sitemap.
const usesIsEmpty =
  require("./src/features/uses/constants/uses.json").length === 0;

/** Homepage first, then blog posts, then everything else. */
function sitemapPriority(url, fallback) {
  if (url === "/") {
    return 1.0;
  }
  if (url.startsWith("/blog/")) {
    return 0.8;
  }
  return fallback;
}

module.exports = {
  changefreq: "weekly",
  // Non-page routes that Next emits into the build manifest.
  exclude: [
    "/rss.xml",
    "/resume.pdf",
    "/icon.svg",
    "/apple-icon",
    "/opengraph-image",
    "/opengraph-image/*",
    ...(usesIsEmpty ? ["/uses"] : []),
  ],
  generateRobotsTxt: true,
  priority: 0.7,
  robotsTxtOptions: {
    policies: [{ allow: "/", userAgent: "*" }],
  },
  siteUrl,
  transform: async (config, url) => ({
    changefreq: url.startsWith("/blog/") ? "monthly" : config.changefreq,
    lastmod: new Date().toISOString(),
    loc: url,
    priority: sitemapPriority(url, config.priority),
  }),
};
