import data from "./uses.json";

/**
 * Tools and setup for the /uses page, stored in lib/uses.json so the sitemap
 * config can read it too. The page and its nav link stay hidden while the
 * list is empty.
 *
 * Example entry:
 * { "title": "Editor & terminal", "items": [{ "name": "VS Code", "note": "with the GitHub Dark theme" }] }
 */
export interface UsesGroup {
  items: { name: string; note?: string }[];
  title: string;
}

export const uses: UsesGroup[] = data;
