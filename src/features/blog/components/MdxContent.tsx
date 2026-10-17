import Image, { type ImageProps } from "next/image";
import Link from "next/link";
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import { MDX_OPTIONS } from "@/features/blog/utils/mdx-options";

const MDX_COMPONENTS: MDXRemoteProps["components"] = {
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
      <a href={href} rel="noopener noreferrer" target="_blank" {...props}>
        {children}
      </a>
    );
  },
  img: (props) => (
    // Blog images live in /public. Provide width/height in MDX for best results.
    <Image
      {...(props as ImageProps)}
      alt={props.alt ?? ""}
      className="rounded-xl border border-line"
    />
  ),
};

interface MdxContentProps {
  readonly source: string;
}

export function MdxContent({ source }: MdxContentProps) {
  return (
    <div className="prose max-w-none prose-headings:scroll-mt-28 prose-pre:p-0">
      <MDXRemote
        components={MDX_COMPONENTS}
        options={MDX_OPTIONS}
        source={source}
      />
    </div>
  );
}
