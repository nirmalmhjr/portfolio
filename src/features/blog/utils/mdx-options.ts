import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode, {
  type Options as PrettyCodeOptions,
} from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

const PRETTY_CODE_OPTIONS: PrettyCodeOptions = {
  defaultLang: "plaintext",
  keepBackground: false,
  theme: { dark: "github-dark", light: "github-light" },
};

/** Shared MDX compile options: GFM, heading anchors, Shiki syntax highlighting. */
export const MDX_OPTIONS: MDXRemoteProps["options"] = {
  mdxOptions: {
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, PRETTY_CODE_OPTIONS],
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: { className: ["heading-anchor"] },
        },
      ],
    ],
    remarkPlugins: [remarkGfm],
  },
  parseFrontmatter: false,
};
