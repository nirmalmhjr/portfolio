/** The live domain, used when NEXT_PUBLIC_SITE_URL is unset or invalid. */
export const DEFAULT_SITE_URL = "https://nirmal-maharjan.com.np";

const TRAILING_SLASH = /\/$/;

/**
 * NEXT_PUBLIC_SITE_URL overrides the domain (e.g. for a preview deploy). A
 * blank, whitespace-only or malformed value set in Vercel's dashboard falls
 * back to the real domain instead of breaking `next build`.
 *
 * Validated by hand rather than with zod: this file ships to the browser
 * (the header reads the site config), and zod would add ~13 kB to every page.
 */
function parseSiteUrl(raw: string | undefined): string {
  const value = raw?.trim();
  if (!value) {
    return DEFAULT_SITE_URL;
  }
  try {
    return new URL(value).toString().replace(TRAILING_SLASH, "");
  } catch {
    return DEFAULT_SITE_URL;
  }
}

/** Typed client environment. Next.js inlines NEXT_PUBLIC_* values at build time. */
export const CLIENT_ENV = {
  NEXT_PUBLIC_SITE_URL: parseSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
} as const;
