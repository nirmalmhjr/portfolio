import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/shared/Container";
import { JsonLd } from "@/components/shared/JsonLd";
import { GlowBackdrop } from "@/components/ui/glow-backdrop";
import { ROUTES } from "@/configs/routes";
import { SITE_CONFIG } from "@/configs/site";
import { MdxContent } from "@/features/blog/components/MdxContent";
import { PostCard } from "@/features/blog/components/PostCard";
import {
  getAllPosts,
  getPostBySlug,
  getPublishedPosts,
  tagSlug,
} from "@/features/blog/utils/posts";
import { createMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/url";
import { formatDate } from "@/lib/utils";

/** How many other posts the "Keep reading" list shows. */
const RELATED_POSTS_COUNT = 2;

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

interface PostPageProps {
  readonly params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return {};
  }

  const { title, description, date, updated, image, tags } = post.frontmatter;
  return createMetadata({
    article: {
      modifiedTime: updated ? new Date(updated).toISOString() : undefined,
      publishedTime: new Date(date).toISOString(),
      tags,
    },
    description,
    image,
    path: ROUTES.blogPost(slug),
    title,
  });
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  const { frontmatter, content, readingTimeMinutes } = post;
  const url = absoluteUrl(ROUTES.blogPost(slug));
  const more = getPublishedPosts()
    .filter((p) => p.slug !== slug)
    .slice(0, RELATED_POSTS_COUNT);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    author: {
      "@type": "Person",
      name: SITE_CONFIG.author.name,
      url: SITE_CONFIG.url,
    },
    dateModified: new Date(
      frontmatter.updated ?? frontmatter.date
    ).toISOString(),
    datePublished: new Date(frontmatter.date).toISOString(),
    description: frontmatter.description,
    headline: frontmatter.title,
    image: frontmatter.image
      ? absoluteUrl(frontmatter.image)
      : absoluteUrl(ROUTES.ogImage),
    keywords: frontmatter.tags.join(", "),
    mainEntityOfPage: { "@id": url, "@type": "WebPage" },
    publisher: {
      "@type": "Person",
      name: SITE_CONFIG.author.name,
      url: SITE_CONFIG.url,
    },
    url,
  };

  return (
    <main>
      <JsonLd data={articleJsonLd} />

      <header className="relative isolate overflow-hidden pt-[132px] pb-10 sm:pt-[160px]">
        <GlowBackdrop />
        <Container className="max-w-[52rem]">
          <Link
            className="inline-flex items-center gap-1.5 text-muted text-sm transition-colors hover:text-fg"
            href={ROUTES.blog}
          >
            <ArrowLeft aria-hidden className="h-3.5 w-3.5" />
            Back to blog
          </Link>

          <h1 className="mt-6 font-bold text-[clamp(2.1rem,5vw,3.2rem)] leading-[1.08] tracking-[-0.04em]">
            {frontmatter.title}
          </h1>

          <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[13px] text-faint">
            <time dateTime={frontmatter.date}>
              {formatDate(frontmatter.date)}
            </time>
            <span aria-hidden>·</span>
            <span>{readingTimeMinutes} min read</span>
            {frontmatter.updated ? (
              <>
                <span aria-hidden>·</span>
                <span>Updated {formatDate(frontmatter.updated)}</span>
              </>
            ) : null}
          </p>

          {frontmatter.tags.length > 0 ? (
            <ul className="mt-5 flex flex-wrap gap-1.5">
              {frontmatter.tags.map((tag) => (
                <li key={tag}>
                  <Link
                    className="pill transition-colors hover:text-fg"
                    href={ROUTES.blogTag(tagSlug(tag))}
                  >
                    {tag}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </Container>
      </header>

      <Container
        as="article"
        className="max-w-[52rem] border-line border-t py-12"
      >
        <MdxContent source={content} />
      </Container>

      {more.length > 0 ? (
        <Container as="aside" className="max-w-[52rem] pb-24">
          <h2 className="font-medium font-mono text-faint text-xs uppercase tracking-[0.1em]">
            Keep reading
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {more.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </Container>
      ) : null}
    </main>
  );
}
