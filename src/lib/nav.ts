import { MAIN_NAV, ROUTES } from "@/configs/routes";
import { getPublishedPosts } from "@/features/blog/utils/posts";
import { USES } from "@/features/uses/constants/uses";
import type { NavItem } from "@/types/nav.types";

const USES_NAV_ITEM: NavItem = { href: ROUTES.uses, title: "Uses" };

/**
 * Builds the header navigation. The Uses page joins it (just before Contact)
 * once features/uses/constants/uses.json has content.
 *
 * @returns Nav items in display order.
 */
export function getNav(): NavItem[] {
  if (USES.length === 0) {
    return [...MAIN_NAV];
  }
  return [...MAIN_NAV.slice(0, -1), USES_NAV_ITEM, ...MAIN_NAV.slice(-1)];
}

/**
 * Tells whether at least one blog post is published (not a draft).
 *
 * @returns True when the blog has something to show.
 */
export function hasPublishedPosts(): boolean {
  return getPublishedPosts().length > 0;
}
