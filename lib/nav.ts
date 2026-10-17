import { getAllPosts } from "@/lib/posts";
import { mainNav } from "@/lib/site.config";
import { uses } from "@/lib/uses";

export interface NavItem {
  href: string;
  title: string;
}

/** Header navigation, plus the Uses page once lib/uses.json has content. */
export function getNav(): NavItem[] {
  const items: NavItem[] = [...mainNav];
  if (uses.length > 0) {
    items.splice(items.length - 1, 0, { href: "/uses", title: "Uses" });
  }
  return items;
}

export function hasPublishedPosts(): boolean {
  return getAllPosts().some((p) => !p.frontmatter.draft);
}
