# Portfolio + Blog

Personal site built with the Next.js App Router, TypeScript, Tailwind CSS, and a
local MDX blog pipeline. Deployed on Vercel.

## Stack

| Concern             | Choice                                                            |
| ------------------- | ----------------------------------------------------------------- |
| Framework           | Next.js 15 (App Router), React 19, TypeScript                     |
| Styling             | Tailwind CSS + `@tailwindcss/typography`                          |
| Content             | MDX files in `content/blog/`, compiled with `next-mdx-remote/rsc` |
| Frontmatter         | `gray-matter` + **Zod** validation (`src/features/blog/schemas`)  |
| Syntax highlighting | `rehype-pretty-code` (Shiki), light + dark themes                 |
| SEO                 | Next Metadata API, per-page `<title>`/OG/Twitter, JSON-LD         |
| Structured data     | `Person` on the homepage, `BlogPosting` on each post              |
| Sitemap / robots    | `next-sitemap` (runs on `postbuild`)                              |
| Feed                | RSS 2.0 at `/rss.xml` (`feed` package)                            |
| Dark mode           | `next-themes`, class-based, persisted to `localStorage`           |
| Lint / format       | Ultracite (Biome), see `biome.jsonc`                              |
| CI                  | GitHub Actions: lint + type-check + build on every PR             |

## Local development

Requires **Node 18.18+** and **pnpm** (`corepack enable` will provide it).

```bash
pnpm install
cp .env.example .env.local   # optional: override NEXT_PUBLIC_SITE_URL
pnpm dev                      # http://localhost:3000
```

### Scripts

| Command                             | What it does                                                  |
| ----------------------------------- | ------------------------------------------------------------- |
| `pnpm dev`                          | Start the dev server                                          |
| `pnpm build`                        | Production build (also generates the sitemap via `postbuild`) |
| `pnpm start`                        | Serve the production build                                    |
| `pnpm lint`                         | Ultracite check (Biome lint + format)                         |
| `pnpm typecheck`                    | `tsc --noEmit`                                                |
| `pnpm format`                       | Ultracite fix (applies safe lint and format fixes)            |

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

| What                                                      | Where                                                        |
| --------------------------------------------------------- | ------------------------------------------------------------ |
| Name, title, intro, email, social handles, posts-per-page | `src/configs/site.ts`                                        |
| Routes and nav links                                      | `src/configs/routes.ts` (`ROUTES`, `MAIN_NAV`)               |
| Projects (homepage + `/projects`)                         | `src/features/projects/constants/projects.ts`                |
| Project screenshots                                       | `src/assets/images/projects/`                                |
| Story, experience, skills, education                      | `src/features/profile/constants/profile.ts`                  |
| Résumé page and PDF                                       | `src/features/resume/` (built from the profile and projects) |
| Global styles / code-block theme                          | `src/styles/globals.css`                                     |
| Default OG image                                          | `src/app/opengraph-image.tsx` (generated)                    |
| Favicon                                                   | `src/app/icon.svg`                                           |

## Folder structure

The layout follows `.cursor/rules/frontend.mdc` (also loaded by Claude Code via
`CLAUDE.md`).

```
src/
  app/               Routes (App Router), metadata routes, /resume.pdf, /rss.xml
  assets/            Fonts and images, imported (never referenced by path)
  components/
    ui/              Primitives: button, pills, pagination, copy-button
    shared/          Layout pieces used across features: Header, Footer, Container
  configs/           site.ts, routes.ts, storage.ts
  env/               Typed env: client.ts (NEXT_PUBLIC_*), server.ts
  features/          blog, contact, profile, projects, resume, uses
    <feature>/       components/ constants/ schemas/ types/ utils/
  hooks/             Shared client hooks
  lib/               Shared utilities (cn, formatDate, absoluteUrl, nav)
  styles/            Tailwind entry + theme tokens
  types/             Shared types
content/blog/        MDX posts (+ _template.mdx)
public/              Generated sitemap and robots.txt only
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
