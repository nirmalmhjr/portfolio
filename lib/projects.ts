/**
 * Projects shown on the homepage (featured) and /projects.
 * Replace with your real projects. `featured` controls homepage inclusion.
 */

export interface Project {
  title: string;
  description: string;
  tech: string[];
  /** Live demo URL, or null if none. */
  demoUrl: string | null;
  /** Source repo URL, or null if private/closed. */
  repoUrl: string | null;
  year: number;
  featured: boolean;
}

export const projects: Project[] = [
  {
    title: "Ledger — personal finance dashboard",
    description:
      "A privacy-first budgeting app. Bank data stays on-device; charts and forecasts run entirely in the browser with Web Workers.",
    tech: ["Next.js", "TypeScript", "IndexedDB", "Recharts", "Tailwind CSS"],
    demoUrl: "https://example.com/ledger",
    repoUrl: "https://github.com/janedoe/ledger",
    year: 2025,
    featured: true,
  },
  {
    title: "Pageframe — component playground",
    description:
      "An open-source alternative to Storybook focused on speed. Zero-config, Vite-powered, with visual regression snapshots in CI.",
    tech: ["React", "Vite", "Playwright", "Monorepo", "pnpm"],
    demoUrl: "https://example.com/pageframe",
    repoUrl: "https://github.com/janedoe/pageframe",
    year: 2024,
    featured: true,
  },
  {
    title: "Tinybird — URL shortener",
    description:
      "Edge-deployed link shortener with click analytics. Sub-10ms redirects worldwide using Vercel Edge Middleware and KV.",
    tech: ["Next.js", "Edge Runtime", "Vercel KV", "Chart.js"],
    demoUrl: "https://example.com/tinybird",
    repoUrl: "https://github.com/janedoe/tinybird",
    year: 2024,
    featured: true,
  },
  {
    title: "Notecraft — Markdown notes",
    description:
      "Local-first note-taking with CRDT sync. Works offline, syncs when you reconnect, no account required.",
    tech: ["React", "Yjs", "Service Worker", "TypeScript"],
    demoUrl: null,
    repoUrl: "https://github.com/janedoe/notecraft",
    year: 2023,
    featured: false,
  },
  {
    title: "dotfiles",
    description:
      "My terminal, editor, and shell setup. Neovim config, zsh plugins, and a one-command bootstrap for a new machine.",
    tech: ["Shell", "Lua", "Neovim"],
    demoUrl: null,
    repoUrl: "https://github.com/janedoe/dotfiles",
    year: 2022,
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
