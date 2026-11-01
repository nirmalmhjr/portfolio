import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, PageHeader } from "@/components/shared/Container";
import { ROUTES } from "@/configs/routes";
import { PostCard, PostGrid } from "@/features/blog/components/PostCard";
import { TagFilter } from "@/features/blog/components/TagFilter";
import {
  getAllTags,
  getPostsByTag,
  tagSlug,
} from "@/features/blog/utils/posts";
import { createMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag: tagSlug(tag) }));
}

function resolveTag(param: string): string | undefined {
  const decoded = decodeURIComponent(param).toLowerCase();
  return getAllTags().find(({ tag }) => tag.toLowerCase() === decoded)?.tag;
}

interface TagPageProps {
  readonly params: Promise<{ tag: string }>;
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag: tagParam } = await params;
  const tag = resolveTag(tagParam);
  if (!tag) {
    return {};
  }

  return createMetadata({
    description: `All blog posts about ${tag}.`,
    path: ROUTES.blogTag(tagSlug(tag)),
    title: `Posts about ${tag}`,
  });
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag: tagParam } = await params;
  const tag = resolveTag(tagParam);
  if (!tag) {
    notFound();
  }

  // Static page listing every post with this tag (no pagination needed).
  const posts = getPostsByTag(tag);

  return (
    <main>
      <PageHeader
        description={`${posts.length} post${posts.length === 1 ? "" : "s"} tagged “${tag}”.`}
        eyebrow="Tag"
        title={`Posts about ${tag}`}
        watermark={tag}
      >
        <div className="mt-8">
          <TagFilter activeTag={tag} />
        </div>
      </PageHeader>

      <Container className="pb-24">
        <PostGrid>
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </PostGrid>
      </Container>
    </main>
  );
}
