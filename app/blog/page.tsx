import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, PageHeader } from "@/components/container";
import { PostCard } from "@/components/post-card";
import { Pagination } from "@/components/pagination";
import { TagFilter } from "@/components/tag-filter";
import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site.config";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Posts about React, Next.js, and JavaScript concepts — how they work and why.",
  alternates: {
    canonical: "/blog",
    types: {
      "application/rss+xml": [
        { url: "/rss.xml", title: `${siteConfig.name} — Blog` },
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
    <Container as="main">
      <PageHeader
        label={`Writing · ${posts.length} posts`}
        title="Notes on React, Next.js, and the JavaScript underneath."
        description="Short, focused posts on how things actually work — and the mistakes that taught me."
      />

      <div className="mt-10">
        <TagFilter />
      </div>

      {pagePosts.length > 0 ? (
        <div className="mt-4 border-t border-border/70">
          {pagePosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-muted mt-10 text-sm">No posts yet.</p>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/blog"
      />
    </Container>
  );
}
