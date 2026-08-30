import Link from "next/link";
import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <Container
      as="main"
      className="flex min-h-[70vh] flex-col justify-center py-24"
    >
      <p className="label mb-6">(Error 404)</p>
      <h1 className="display text-display-md">Page not found</h1>
      <p className="text-muted mt-6 max-w-md">
        The link is broken or the page has moved.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/"
          className="border border-foreground bg-foreground px-5 py-2.5 font-mono text-[0.7rem] uppercase tracking-widest text-background transition-colors hover:bg-transparent hover:text-foreground"
        >
          Go home
        </Link>
        <Link
          href="/blog"
          className="text-muted border border-border px-5 py-2.5 font-mono text-[0.7rem] uppercase tracking-widest transition-colors hover:border-foreground hover:text-foreground"
        >
          Read the blog
        </Link>
      </div>
    </Container>
  );
}
