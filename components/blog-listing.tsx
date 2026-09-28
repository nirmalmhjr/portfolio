import Link from "next/link";
import { notFound } from "next/navigation";
import { buttonClass } from "@/components/button";
import { Container, PageHeader } from "@/components/container";
import { Pagination } from "@/components/pagination";
import { PostCard } from "@/components/post-card";
import { TagFilter } from "@/components/tag-filter";
import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site.config";

export function getPublishedPosts() {
  return getAllPosts().filter((p) => !p.frontmatter.draft);
}

export function getTotalPages(): number {
  return Math.max(
    1,
    Math.ceil(getPublishedPosts().length / siteConfig.postsPerPage)
  );
}

/** The blog index. Page 1 lives at /blog, later pages at /blog/page/N. */
export function BlogListing({ currentPage }: { currentPage: number }) {
  const posts = getPublishedPosts();
  const totalPages = getTotalPages();
  if (currentPage < 1 || currentPage > totalPages) notFound();

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
          <div className="card flex flex-col items-start gap-4 border-dashed border-line-strong p-8 sm:p-10">
            <span className="status status-soon">Writing now</span>
            <h2 className="max-w-[24ch] text-2xl font-bold tracking-[-0.03em]">
              My first articles are on the way.
            </h2>
            <p className="max-w-[56ch] text-muted">
              I&apos;m writing about what I learn while building, starting with
              how I migrated a live app from Vue 2 to Vue 3 on my own. In the
              meantime, my projects show how I work.
            </p>
            <Link href="/#projects" className={buttonClass("ghost")}>
              See my projects
            </Link>
          </div>
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
