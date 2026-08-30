import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "js", "jsx"],
  // rehype-pretty-code / shiki ship large grammars; keep them server-only.
  serverExternalPackages: ["shiki"],
  // This project lives inside a folder with other lockfiles; pin the trace root
  // so Vercel bundles the right files.
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
