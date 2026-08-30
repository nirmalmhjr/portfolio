import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { MdxContent } from "@/components/mdx-content";
import { JsonLd } from "@/components/json-ld";
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

  const { frontmatter, content, readingTimeText } = post;
  const url = absoluteUrl(`/blog/${slug}`);

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
    <Container as="article" className="py-12">
      <JsonLd data={articleJsonLd} />

      <Link href="/blog" className="text-muted text-sm hover:underline">
        ← Back to blog
      </Link>

      <header className="mt-6">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {frontmatter.title}
        </h1>
        <div className="text-muted mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
          <time dateTime={frontmatter.date}>
            {formatDate(frontmatter.date)}
          </time>
          <span aria-hidden>·</span>
          <span>{readingTimeText}</span>
          {frontmatter.updated ? (
            <>
              <span aria-hidden>·</span>
              <span>Updated {formatDate(frontmatter.updated)}</span>
            </>
          ) : null}
        </div>
        {frontmatter.tags.length > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {frontmatter.tags.map((tag) => (
              <li key={tag}>
                <Link
                  href={`/blog/tag/${tagSlug(tag)}`}
                  className="text-muted hover:bg-muted rounded border px-1.5 py-0.5 text-xs"
                >
                  #{tag}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </header>

      <hr className="my-8" />

      <MdxContent source={content} />
    </Container>
  );
}
