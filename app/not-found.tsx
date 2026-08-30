import Link from "next/link";
import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <Container
      as="main"
      className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center"
    >
      <p className="font-display text-[8rem] leading-none text-accent sm:text-[12rem]">
        404
      </p>
      <h1 className="mt-2 font-display text-2xl">This page wandered off.</h1>
      <p className="text-muted mt-3 max-w-md">
        The link is broken or the page was moved. Let&apos;s get you back on
        track.
      </p>
      <div className="mt-8 flex gap-3 text-sm">
        <Link
          href="/"
          className="rounded-full bg-foreground px-5 py-2.5 font-medium text-background transition-colors hover:bg-accent"
        >
          Go home
        </Link>
        <Link
          href="/blog"
          className="hover:bg-muted rounded-full border border-border px-5 py-2.5 font-medium transition-colors"
        >
          Read the blog
        </Link>
      </div>
    </Container>
  );
}
