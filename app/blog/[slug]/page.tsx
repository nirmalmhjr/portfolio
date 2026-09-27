import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/container";
import { GlowBackdrop } from "@/components/glow-backdrop";
import { JsonLd } from "@/components/json-ld";
import { MdxContent } from "@/components/mdx-content";
import { PostCard } from "@/components/post-card";
import { getAllPosts, getPostBySlug, tagSlug } from "@/lib/posts";
import { absoluteUrl, siteConfig } from "@/lib/site.config";
import { formatDate } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const { title, description, date, updated, image, tags } = post.frontmatter;
  const url = absoluteUrl(`/blog/${slug}`);
  const ogImage = image ? absoluteUrl(image) : siteConfig.ogImage;

  return {
    title,
    description,
    keywords: tags,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      publishedTime: new Date(date).toISOString(),
      modifiedTime: updated ? new Date(updated).toISOString() : undefined,
      authors: [siteConfig.author.name],
      tags,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { frontmatter, content, readingTimeMinutes } = post;
  const url = absoluteUrl(`/blog/${slug}`);
  const more = getAllPosts()
    .filter((p) => !p.frontmatter.draft && p.slug !== slug)
    .slice(0, 2);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: new Date(frontmatter.date).toISOString(),
    dateModified: new Date(
      frontmatter.updated ?? frontmatter.date
    ).toISOString(),
    keywords: frontmatter.tags.join(", "),
    image: frontmatter.image
      ? absoluteUrl(frontmatter.image)
      : absoluteUrl(siteConfig.ogImage),
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
  };

  return (
    <main>
      <JsonLd data={articleJsonLd} />

      <header className="relative isolate overflow-hidden pb-10 pt-[132px] sm:pt-[160px]">
        <GlowBackdrop />
        <Container className="max-w-[52rem]">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg"
          >
            <ArrowLeft aria-hidden className="h-3.5 w-3.5" />
            Back to blog
          </Link>

          <h1 className="mt-6 text-[clamp(2.1rem,5vw,3.2rem)] font-bold leading-[1.08] tracking-[-0.04em]">
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
                    href={`/blog/tag/${tagSlug(tag)}`}
                    className="pill transition-colors hover:text-fg"
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
        className="max-w-[52rem] border-t border-line py-12"
      >
        <MdxContent source={content} />
      </Container>

      {more.length > 0 ? (
        <Container as="aside" className="max-w-[52rem] pb-24">
          <h2 className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-faint">
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
