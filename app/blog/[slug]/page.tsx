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
    <Container as="article" size="prose">
      <JsonLd data={articleJsonLd} />

      <div className="border-b border-border py-10">
        <Link
          href="/blog"
          className="label transition-colors hover:text-foreground"
        >
          ← Writing
        </Link>

        <div className="text-muted mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-wider">
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

        <h1 className="display mt-5 text-[clamp(2rem,6vw,3.75rem)]">
          {frontmatter.title}
        </h1>
        <p className="text-muted mt-6 text-lg leading-relaxed">
          {frontmatter.description}
        </p>

        {frontmatter.tags.length > 0 ? (
          <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-1">
            {frontmatter.tags.map((tag) => (
              <li key={tag}>
                <Link
                  href={`/blog/tag/${tagSlug(tag)}`}
                  className="text-muted font-mono text-[0.7rem] uppercase tracking-wider hover:text-accent"
                >
                  {tag}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="py-14">
        <MdxContent source={content} />
      </div>

      {more.length > 0 ? (
        <aside className="border-t border-border pt-10">
          <p className="label mb-8">Keep reading</p>
          <div className="border-t border-border">
            {more.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group flex items-baseline justify-between gap-4 border-b border-border py-5 transition-colors hover:bg-surface"
              >
                <h3 className="display text-[clamp(1.15rem,2.4vw,1.6rem)] transition-transform duration-300 group-hover:translate-x-2">
                  {p.frontmatter.title}
                </h3>
                <span className="label shrink-0">
                  {formatDate(p.frontmatter.date)}
                </span>
              </Link>
            ))}
          </div>
        </aside>
      ) : null}
    </Container>
  );
}
