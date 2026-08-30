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
    <Container as="article">
      <JsonLd data={articleJsonLd} />

      <div className="pb-8 pt-6 sm:pt-10">
        <Link
          href="/blog"
          className="text-muted text-sm font-medium transition-colors hover:text-accent"
        >
          ← Back to blog
        </Link>

        <h1 className="mt-6 text-balance text-3xl leading-tight sm:text-4xl">
          {frontmatter.title}
        </h1>

        <div className="text-muted mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
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
        </div>

        {frontmatter.tags.length > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-2">
            {frontmatter.tags.map((tag) => (
              <li key={tag}>
                <Link
                  href={`/blog/tag/${tagSlug(tag)}`}
                  className="bg-muted text-muted rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors hover:text-accent"
                >
                  {tag}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <hr className="border-border" />

      <div className="py-10">
        <MdxContent source={content} />
      </div>

      {more.length > 0 ? (
        <aside className="border-t border-border pt-8">
          <h2 className="text-sm font-bold">Keep reading</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {more.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="card card-hover group p-4"
              >
                <p className="text-muted text-xs">
                  {formatDate(p.frontmatter.date)}
                </p>
                <h3 className="mt-1 font-bold leading-snug transition-colors group-hover:text-accent">
                  {p.frontmatter.title}
                </h3>
              </Link>
            ))}
          </div>
        </aside>
      ) : null}
    </Container>
  );
}
