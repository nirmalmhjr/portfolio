import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, PageHeader } from "@/components/container";
import { Pagination } from "@/components/pagination";
import { PostCard } from "@/components/post-card";
import { TagFilter } from "@/components/tag-filter";
import { getAllPosts } from "@/lib/posts";
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

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);

  const posts = getAllPosts().filter((p) => !p.frontmatter.draft);
  const totalPages = Math.max(
    1,
    Math.ceil(posts.length / siteConfig.postsPerPage)
  );
  if (currentPage > totalPages) notFound();

  const start = (currentPage - 1) * siteConfig.postsPerPage;
  const pagePosts = posts.slice(start, start + siteConfig.postsPerPage);

  return (
    <main>
      <PageHeader
        eyebrow="Blog"
        watermark="Writing"
        title="Notes on React and the web"
        description="What I learn while building with React, Next.js and TypeScript, written down so it sticks."
      >
        <div className="mt-8">
          <TagFilter />
        </div>
      </PageHeader>

      <Container className="pb-24">
        {pagePosts.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pagePosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-muted">No posts yet. Check back soon.</p>
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath="/blog"
        />
      </Container>
    </main>
  );
}
