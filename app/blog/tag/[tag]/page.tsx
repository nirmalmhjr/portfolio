import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, PageHeader } from "@/components/container";
import { PostCard } from "@/components/post-card";
import { TagFilter } from "@/components/tag-filter";
import { getAllTags, getPostsByTag, tagSlug } from "@/lib/posts";

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
    title: `Posts about ${tag}`,
    description: `All blog posts about ${tag}.`,
    alternates: { canonical: `/blog/tag/${tagSlug(tag)}` },
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag: tagParam } = await params;
  const tag = resolveTag(tagParam);
  if (!tag) notFound();

  // Static page listing every post with this tag (no pagination needed).
  const posts = getPostsByTag(tag).filter((p) => !p.frontmatter.draft);

  return (
    <main>
      <PageHeader
        eyebrow="Tag"
        watermark={tag}
        title={`Posts about ${tag}`}
        description={`${posts.length} post${posts.length === 1 ? "" : "s"} tagged “${tag}”.`}
      >
        <div className="mt-8">
          <TagFilter activeTag={tag} />
        </div>
      </PageHeader>

      <Container className="pb-24">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </Container>
    </main>
  );
}
