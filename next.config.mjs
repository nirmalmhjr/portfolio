import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Linting runs through Ultracite (Biome) in `pnpm lint` and CI, not ESLint.
  eslint: { ignoreDuringBuilds: true },
  // This project lives inside a folder with other lockfiles; pin the trace root
  // so Vercel bundles the right files.
  outputFileTracingRoot: __dirname,
  pageExtensions: ["ts", "tsx", "js", "jsx"],
  reactStrictMode: true,
  // rehype-pretty-code / shiki ship large grammars; keep them server-only.
  // @react-pdf/renderer draws /resume.pdf and must run as a plain Node package.
  serverExternalPackages: ["shiki", "@react-pdf/renderer"],
};

export default nextConfig;
