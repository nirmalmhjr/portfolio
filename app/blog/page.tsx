import type { Metadata } from "next";
import { BlogListing } from "@/components/blog-listing";
import { siteConfig } from "@/lib/site.config";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on React, Next.js and TypeScript: what I learn while building, written down so it sticks.",
  alternates: {
    canonical: "/blog",
    types: {
      "application/rss+xml": [
        { url: "/rss.xml", title: `${siteConfig.name} | Blog` },
      ],
    },
  },
};

export default function BlogPage() {
  return <BlogListing currentPage={1} />;
}
