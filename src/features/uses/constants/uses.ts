import data from "@/features/uses/constants/uses.json";
import type { UsesGroup } from "@/features/uses/types/uses.types";

/**
 * Tools and setup for the /uses page, stored in uses.json. The page, its nav
 * link and its sitemap entry stay hidden while the list is empty.
 *
 * Example entry:
 * { "title": "Editor & terminal", "items": [{ "name": "VS Code", "note": "with the GitHub Dark theme" }] }
 */
export const USES: UsesGroup[] = data;
