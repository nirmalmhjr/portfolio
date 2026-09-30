/**
 * Runs on `postbuild` (see package.json) and writes public/sitemap.xml,
 * public/sitemap-0.xml and public/robots.txt.
 *
 * Every page is statically generated (including /blog, /blog/page/N and tag
 * pages), so routes are discovered from the build output automatically.
 *
 * @type {import('next-sitemap').IConfig}
 */
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://nirmal-maharjan.com.np"
).replace(/\/$/, "");

// /uses renders a 404 until lib/uses.json has content, so keep it out of the sitemap.
const usesIsEmpty = require("./lib/uses.json").length === 0;

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
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
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
  },
  transform: async (config, url) => ({
    loc: url,
    changefreq: url.startsWith("/blog/") ? "monthly" : config.changefreq,
    priority:
      url === "/" ? 1.0 : url.startsWith("/blog/") ? 0.8 : config.priority,
    lastmod: new Date().toISOString(),
  }),
};
