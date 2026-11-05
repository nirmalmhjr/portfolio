import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, PageHeader } from "@/components/shared/Container";
import { buttonClass } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { HOME_SECTION_IDS, ROUTES } from "@/configs/routes";
import { SITE_CONFIG, SOCIAL_LINKS } from "@/configs/site";
import { PostCard, PostGrid } from "@/features/blog/components/PostCard";
import { TagFilter } from "@/features/blog/components/TagFilter";
import { getPublishedPosts, getTotalPages } from "@/features/blog/utils/posts";

interface BlogListingProps {
  readonly currentPage: number;
}

/** The blog index. Page 1 lives at /blog, later pages at /blog/page/N. */
export function BlogListing({ currentPage }: BlogListingProps) {
  const posts = getPublishedPosts();
  const totalPages = getTotalPages();
  if (currentPage < 1 || currentPage > totalPages) {
    notFound();
  }

  const start = (currentPage - 1) * SITE_CONFIG.postsPerPage;
  const pagePosts = posts.slice(start, start + SITE_CONFIG.postsPerPage);

  return (
    <main>
      <PageHeader
        description="What I learn while building with React, Next.js and TypeScript, written down so it sticks."
        eyebrow="Blog"
        title="Notes on React and the web"
        watermark="Writing"
      >
        <p className="mt-5 max-w-[56ch] text-[15px] text-muted">
          Shorter reference notes, grouped by topic, live on my{" "}
          <a
            className="inline-flex items-center gap-0.5 text-ink underline-offset-[3px] hover:underline"
            href={SOCIAL_LINKS.notes}
          >
            notes site
            <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
          </a>
          .
        </p>
        <div className="mt-8">
          <TagFilter />
        </div>
      </PageHeader>

      <Container className="pb-24">
        {pagePosts.length > 0 ? (
          <PostGrid>
            {pagePosts.map((post) => (
              <PostCard headingLevel="h2" key={post.slug} post={post} />
            ))}
          </PostGrid>
        ) : (
          <div className="card flex flex-col items-start gap-4 border-line-strong border-dashed p-8 sm:p-10">
            <span className="status status-soon">Writing now</span>
            <h2 className="max-w-[24ch] font-bold text-2xl tracking-[-0.03em]">
              My first articles are on the way.
            </h2>
            <p className="max-w-[56ch] text-muted">
              I&apos;m writing about what I learn while building, starting with
              how I took over a live app's move from Vue 2 to Vue 3. In the
              meantime, my projects show how I work.
            </p>
            <Link
              className={buttonClass("ghost")}
              href={ROUTES.homeSection(HOME_SECTION_IDS.projects)}
            >
              See my projects
            </Link>
          </div>
        )}
        <Pagination
          currentPage={currentPage}
          pageHref={ROUTES.blogPage}
          totalPages={totalPages}
        />
      </Container>
    </main>
  );
}
