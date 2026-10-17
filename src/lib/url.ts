import { SITE_CONFIG } from "@/configs/site";

/**
 * Turns a site path into an absolute URL on the site's domain.
 *
 * @param path - Path on the site; a missing leading slash is added.
 * @returns Absolute URL, e.g. "https://nirmal-maharjan.com.np/blog".
 */
export function absoluteUrl(path = "/"): string {
  return `${SITE_CONFIG.url}${path.startsWith("/") ? path : `/${path}`}`;
}
