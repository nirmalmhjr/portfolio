import Link from "next/link";
import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <Container
      as="main"
      className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center"
    >
      <p className="text-6xl">🧭</p>
      <h1 className="mt-6 text-2xl font-bold">Well, this is awkward.</h1>
      <p className="text-muted mt-2 max-w-sm">
        That page doesn&apos;t exist — or it moved and forgot to leave a
        forwarding address.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm">
        <Link
          href="/"
          className="rounded-full bg-accent px-5 py-2.5 font-semibold text-accent-foreground transition-transform hover:scale-[1.03]"
        >
          Go home
        </Link>
        <Link
          href="/blog"
          className="rounded-full border border-border px-5 py-2.5 font-medium transition-colors hover:border-accent/50 hover:text-accent"
        >
          Read the blog
        </Link>
      </div>
    </Container>
  );
}
