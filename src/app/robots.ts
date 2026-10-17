import type { MetadataRoute } from "next";
import { ROUTES } from "@/configs/routes";
import { absoluteUrl } from "@/lib/url";

/** /robots.txt: everything is public; point crawlers at the sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { allow: "/", userAgent: "*" },
    sitemap: absoluteUrl(ROUTES.sitemap),
  };
}
