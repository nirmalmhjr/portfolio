import { getAllPosts } from "@/lib/posts";
import { mainNav } from "@/lib/site.config";
import { uses } from "@/lib/uses";

export interface NavItem {
  title: string;
  href: string;
}

/** Header navigation, plus the Uses page once lib/uses.json has content. */
export function getNav(): NavItem[] {
  const items: NavItem[] = [...mainNav];
  if (uses.length > 0) {
    items.splice(items.length - 1, 0, { title: "Uses", href: "/uses" });
  }
  return items;
}

export function hasPublishedPosts(): boolean {
  return getAllPosts().some((p) => !p.frontmatter.draft);
}
