import data from "@/features/uses/constants/uses.json";
import type { UsesGroup } from "@/features/uses/types/uses.types";

/**
 * Tools and setup for the /uses page, stored in uses.json so the sitemap
 * config (next-sitemap.config.js) can read it too. The page and its nav link
 * stay hidden while the list is empty.
 *
 * Example entry:
 * { "title": "Editor & terminal", "items": [{ "name": "VS Code", "note": "with the GitHub Dark theme" }] }
 */
export const USES: UsesGroup[] = data;
