import type { Metadata } from "next";
import { ROUTES } from "@/configs/routes";
import { BlogListing } from "@/features/blog/components/BlogListing";
import { getTotalPages } from "@/features/blog/utils/posts";

export const dynamicParams = false;

/** Pages 2..N. Page 1 is /blog. */
export function generateStaticParams() {
  return Array.from({ length: getTotalPages() - 1 }, (_, i) => ({
    page: String(i + 2),
  }));
}

interface BlogPaginatedPageProps {
  readonly params: Promise<{ page: string }>;
}

export async function generateMetadata({
  params,
}: BlogPaginatedPageProps): Promise<Metadata> {
  const { page } = await params;
  return {
    alternates: { canonical: ROUTES.blogPage(Number(page)) },
    description:
      "Notes on React, Next.js and TypeScript: what I learn while building.",
    title: `Blog, page ${page}`,
  };
}

export default async function BlogPaginatedPage({
  params,
}: BlogPaginatedPageProps) {
  const { page } = await params;
  return <BlogListing currentPage={Number(page)} />;
}
