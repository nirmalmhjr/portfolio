import Image, { type ImageProps } from "next/image";
import Link from "next/link";
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import { mdxOptions } from "@/lib/mdx";

const components: MDXRemoteProps["components"] = {
  a: ({ href = "", children, ...props }) => {
    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  },
  img: (props) => (
    // Blog images live in /public. Provide width/height in MDX for best results.
    <Image
      {...(props as ImageProps)}
      alt={props.alt ?? ""}
      className="rounded-xl border border-border"
    />
  ),
};

export function MdxContent({ source }: { source: string }) {
  return (
    <div className="prose max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-pre:p-0">
      <MDXRemote source={source} components={components} options={mdxOptions} />
    </div>
  );
}
