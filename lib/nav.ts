import { getAllPosts } from "@/lib/posts";
import { mainNav } from "@/lib/site.config";
import { uses } from "@/lib/uses";

export interface NavItem {
  title: string;
  href: string;
}

/** Main navigation, minus pages that have no content yet (Blog, Uses). */
export function getNav(): NavItem[] {
  const hasPosts = getAllPosts().some((p) => !p.frontmatter.draft);
  return mainNav.filter(
    (item) =>
      (item.href !== "/blog" || hasPosts) &&
      (item.href !== "/uses" || uses.length > 0)
  );
}
