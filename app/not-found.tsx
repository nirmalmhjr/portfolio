import Link from "next/link";
import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <Container
      as="main"
      className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center"
    >
      <p className="text-muted text-sm font-medium uppercase tracking-widest">
        404
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight">Page not found</h1>
      <p className="text-muted mt-3 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <div className="mt-8 flex gap-3 text-sm">
        <Link
          href="/"
          className="hover:bg-muted rounded-md border px-4 py-2 transition-colors"
        >
          Go home
        </Link>
        <Link
          href="/blog"
          className="hover:bg-muted rounded-md border px-4 py-2 transition-colors"
        >
          Read the blog
        </Link>
      </div>
    </Container>
  );
}
