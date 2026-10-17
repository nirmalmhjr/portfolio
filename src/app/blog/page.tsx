import type { Metadata } from "next";
import { ROUTES } from "@/configs/routes";
import { SITE_CONFIG } from "@/configs/site";
import { BlogListing } from "@/features/blog/components/BlogListing";

export const metadata: Metadata = {
  alternates: {
    canonical: ROUTES.blog,
    types: {
      "application/rss+xml": [
        { title: `${SITE_CONFIG.name} | Blog`, url: ROUTES.rss },
      ],
    },
  },
  description:
    "Notes on React, Next.js and TypeScript: what I learn while building, written down so it sticks.",
  title: "Blog",
};

export default function BlogPage() {
  return <BlogListing currentPage={1} />;
}
