import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, PageHeader } from "@/components/container";
import { PostCard } from "@/components/post-card";
import { Pagination } from "@/components/pagination";
import { TagFilter } from "@/components/tag-filter";
import { getAllTags, getPostsByTag, tagSlug } from "@/lib/posts";
import { siteConfig } from "@/lib/site.config";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag: tagSlug(tag) }));
}

function resolveTag(param: string): string | undefined {
  const decoded = decodeURIComponent(param).toLowerCase();
  return getAllTags().find(({ tag }) => tag.toLowerCase() === decoded)?.tag;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag: tagParam } = await params;
  const tag = resolveTag(tagParam);
  if (!tag) return {};

  return {
    title: `Posts tagged “${tag}”`,
    description: `All blog posts about ${tag}.`,
    alternates: { canonical: `/blog/tag/${tagSlug(tag)}` },
  };
}

export default async function TagPage({
  params,
  searchParams,
}: {
  params: Promise<{ tag: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { tag: tagParam } = await params;
  const { page } = await searchParams;
  const tag = resolveTag(tagParam);
  if (!tag) notFound();

  const currentPage = Math.max(1, Number(page) || 1);
  const posts = getPostsByTag(tag).filter((p) => !p.frontmatter.draft);
  const totalPages = Math.max(
    1,
    Math.ceil(posts.length / siteConfig.postsPerPage)
  );
  if (currentPage > totalPages) notFound();

  const start = (currentPage - 1) * siteConfig.postsPerPage;
  const pagePosts = posts.slice(start, start + siteConfig.postsPerPage);

  return (
    <Container as="main" className="py-12">
      <PageHeader
        title={`Tagged “${tag}”`}
        description={`${posts.length} post${posts.length === 1 ? "" : "s"}`}
      />

      <TagFilter activeTag={tag} />

      <div>
        {pagePosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath={`/blog/tag/${tagSlug(tag)}`}
      />
    </Container>
  );
}
