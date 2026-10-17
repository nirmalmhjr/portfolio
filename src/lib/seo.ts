import type { Metadata } from "next";
import { ROUTES } from "@/configs/routes";
import { OG_IMAGE_SIZE, SITE_CONFIG } from "@/configs/site";

/** Title used on the homepage and wherever a page has no title of its own. */
export const DEFAULT_TITLE = `${SITE_CONFIG.name} | ${SITE_CONFIG.title} in Kathmandu, Nepal`;

interface PageSeo {
  /** Blog posts: shown as an article in link previews. */
  readonly article?: {
    readonly modifiedTime?: string;
    readonly publishedTime: string;
    readonly tags: readonly string[];
  };
  readonly description: string;
  /** Share image path; defaults to the generated Open Graph image. */
  readonly image?: string;
  /** Site path of the page, e.g. ROUTES.projects. */
  readonly path: string;
  /** Leave out on the homepage to use the default title. */
  readonly title?: string;
}

/**
 * Builds the full metadata for a page: title, description, canonical URL,
 * RSS link, and matching Open Graph and Twitter tags, so link previews show
 * this page rather than the homepage.
 *
 * @param page - The page's title, description and path.
 * @returns Metadata for the page's `metadata` export or `generateMetadata`.
 */
export function createMetadata({
  title,
  description,
  path,
  image = ROUTES.ogImage,
  article,
}: PageSeo): Metadata {
  const fullTitle = title ? `${title} | ${SITE_CONFIG.name}` : DEFAULT_TITLE;
  const images = [{ ...OG_IMAGE_SIZE, alt: fullTitle, url: image }];

  return {
    alternates: {
      canonical: path,
      types: {
        "application/rss+xml": [
          { title: `${SITE_CONFIG.name} | Blog`, url: ROUTES.rss },
        ],
      },
    },
    description,
    openGraph: {
      description,
      images,
      locale: SITE_CONFIG.locale,
      siteName: SITE_CONFIG.name,
      title: fullTitle,
      url: path,
      ...(article
        ? {
            authors: [SITE_CONFIG.author.name],
            modifiedTime: article.modifiedTime,
            publishedTime: article.publishedTime,
            tags: [...article.tags],
            type: "article",
          }
        : { type: "website" }),
    },
    // The root layout's title template adds " | Nirmal Maharjan".
    title: title ?? { absolute: DEFAULT_TITLE },
    twitter: {
      card: "summary_large_image",
      description,
      images: [image],
      title: fullTitle,
    },
  };
}
