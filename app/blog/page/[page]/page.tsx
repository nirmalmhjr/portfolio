import type { Metadata } from "next";
import { BlogListing, getTotalPages } from "@/components/blog-listing";

export const dynamicParams = false;

/** Pages 2..N. Page 1 is /blog. */
export function generateStaticParams() {
  return Array.from({ length: getTotalPages() - 1 }, (_, i) => ({
    page: String(i + 2),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page } = await params;
  return {
    title: `Blog, page ${page}`,
    description:
      "Notes on React, Next.js and TypeScript: what I learn while building.",
    alternates: { canonical: `/blog/page/${page}` },
  };
}

export default async function BlogPaginatedPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  return <BlogListing currentPage={Number(page)} />;
}
