import { ROUTES } from "@/configs/routes";
import { BlogListing } from "@/features/blog/components/BlogListing";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  description:
    "Notes on React, Next.js and TypeScript: what I learn while building, written down so it sticks.",
  path: ROUTES.blog,
  title: "Blog",
});

export default function BlogPage() {
  return <BlogListing currentPage={1} />;
}
