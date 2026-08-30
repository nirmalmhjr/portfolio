# Portfolio + Blog

Personal site built with the Next.js App Router, TypeScript, Tailwind CSS, and a
local MDX blog pipeline. Deployed on Vercel.

## Stack

| Concern             | Choice                                                            |
| ------------------- | ----------------------------------------------------------------- |
| Framework           | Next.js 15 (App Router), React 19, TypeScript                     |
| Styling             | Tailwind CSS + `@tailwindcss/typography`                          |
| Content             | MDX files in `content/blog/`, compiled with `next-mdx-remote/rsc` |
| Frontmatter         | `gray-matter` + **Zod** validation (`lib/schema.ts`)              |
| Syntax highlighting | `rehype-pretty-code` (Shiki), light + dark themes                 |
| SEO                 | Next Metadata API, per-page `<title>`/OG/Twitter, JSON-LD         |
| Structured data     | `Person` on the homepage, `BlogPosting` on each post              |
| Sitemap / robots    | `next-sitemap` (runs on `postbuild`)                              |
| Feed                | RSS 2.0 at `/rss.xml` (`feed` package)                            |
| Dark mode           | `next-themes`, class-based, persisted to `localStorage`           |
| Lint / format       | ESLint (`next/core-web-vitals`) + Prettier                        |
| CI                  | GitHub Actions: lint + type-check + build on every PR             |

## Local development

Requires **Node 18.18+** and **pnpm** (`corepack enable` will provide it).

```bash
pnpm install
cp .env.example .env.local   # set NEXT_PUBLIC_SITE_URL
pnpm dev                      # http://localhost:3000
```

### Scripts

| Command                             | What it does                                                  |
| ----------------------------------- | ------------------------------------------------------------- |
| `pnpm dev`                          | Start the dev server                                          |
| `pnpm build`                        | Production build (also generates the sitemap via `postbuild`) |
| `pnpm start`                        | Serve the production build                                    |
| `pnpm lint`                         | ESLint                                                        |
| `pnpm typecheck`                    | `tsc --noEmit`                                                |
| `pnpm format` / `pnpm format:check` | Prettier write / check                                        |

## Adding a blog post

1. Copy the template:

   ```bash
   cp content/blog/_template.mdx content/blog/my-new-post.mdx
   ```

2. Edit the frontmatter. **All fields are validated at build time** — a missing
   `description` or a malformed `date` fails `pnpm build` with a readable error.

   ```yaml
   ---
   title: "How JavaScript closures actually work"
   description: "A closure is a function bundled with its lexical scope. Here's what that means in practice."
   date: "2026-09-01" # ISO date, required
   updated: "2026-09-05" # optional
   tags: ["JavaScript", "React"]
   draft: false # true = hidden from listing, feed, sitemap
   image: "/blog/closures.png" # optional cover, file in /public
   ---
   ```

3. Write the body in MDX. That's it — the post is automatically:
   - routed at `/blog/my-new-post` (slug = filename)
   - listed on `/blog` (paginated) and under each of its tags
   - given reading time, formatted date, and `BlogPosting` JSON-LD
   - added to `sitemap.xml` and `rss.xml`

Files whose name starts with `_` (like `_template.mdx`) are ignored.

### Code blocks

Fenced code blocks are highlighted by `rehype-pretty-code`:

````md
```ts title="example.ts" showLineNumbers
const answer: number = 42; // [!code highlight]
```
````

`title="..."`, `showLineNumbers`, and line highlighting (`{1,3-5}` after the
lang, or `// [!code highlight]`) are all supported.

## Editing site content

| What                                                      | Where                                           |
| --------------------------------------------------------- | ----------------------------------------------- |
| Name, title, intro, email, social handles, posts-per-page | `lib/site.config.ts`                            |
| Projects (homepage + `/projects`)                         | `lib/projects.ts` (`featured: true` → homepage) |
| About page (bio, skills, experience, education)           | `lib/resume.ts`                                 |
| Nav links                                                 | `mainNav` in `lib/site.config.ts`               |
| Global styles / code-block theme                          | `styles/globals.css`                            |
| Default OG image                                          | `app/opengraph-image.tsx` (generated)           |
| Favicon                                                   | `app/icon.svg`                                  |

## Folder structure

```
app/                 Routes (App Router)
  page.tsx           Home
  about/ projects/ contact/
  blog/
    page.tsx         Listing + pagination
    [slug]/          Individual post (SSG)
    tag/[tag]/       Posts by tag (SSG) + pagination
  rss.xml/route.ts   RSS 2.0 feed
  opengraph-image.tsx
  not-found.tsx      404
components/           UI components
content/blog/         MDX posts (+ _template.mdx)
lib/                  config, MDX pipeline, content loaders, Zod schema
styles/globals.css    Tailwind entry + theme tokens
```

## Deployment (Vercel)

1. Push this repo to GitHub and import it in Vercel. Framework preset: **Next.js**
   (no build overrides needed — `pnpm build` runs `postbuild` for the sitemap).
2. Set **Environment Variables** in the Vercel project:
   - `NEXT_PUBLIC_SITE_URL` = your production URL, e.g. `https://example.com`
     (no trailing slash). Used for canonical URLs, sitemap, RSS, and JSON-LD.
3. Deploy. `sitemap.xml`, `sitemap-0.xml`, and `robots.txt` are generated into
   `public/` at build time and are git-ignored.

## CI

`.github/workflows/ci.yml` runs `pnpm lint`, `pnpm typecheck`, and `pnpm build`
on every pull request and on pushes to `main`.
