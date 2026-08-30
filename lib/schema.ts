import { z } from "zod";

/**
 * Frontmatter contract for every file in /content/blog.
 * A post that violates this schema throws at build time with a readable error,
 * so a malformed post fails the build loudly instead of shipping broken.
 */
export const frontmatterSchema = z.object({
  title: z.string().min(1, "title is required"),
  description: z
    .string()
    .min(1, "description is required")
    .max(200, "description should be <= 200 chars (used as meta description)"),
  /** ISO date, e.g. 2026-08-30. Coerced/validated to a real date. */
  date: z
    .string()
    .refine(
      (v) => !Number.isNaN(Date.parse(v)),
      "date must be a valid ISO date"
    ),
  /** Optional last-updated date. */
  updated: z
    .string()
    .refine(
      (v) => !Number.isNaN(Date.parse(v)),
      "updated must be a valid ISO date"
    )
    .optional(),
  tags: z.array(z.string().min(1)).default([]),
  /** Set to true to hide from listings, feeds, and the sitemap. */
  draft: z.boolean().default(false),
  /** Optional per-post social image, served from /public. */
  image: z.string().optional(),
});

export type Frontmatter = z.infer<typeof frontmatterSchema>;

export function parseFrontmatter(data: unknown, filePath: string): Frontmatter {
  const result = frontmatterSchema.safeParse(data);
  if (!result.success) {
    const issues = result.error.issues
      .map((i) => `  - ${i.path.join(".") || "(root)"}: ${i.message}`)
      .join("\n");
    throw new Error(
      `Invalid frontmatter in ${filePath}:\n${issues}\n\n` +
        `Fix the frontmatter block at the top of that .mdx file.`
    );
  }
  return result.data;
}
