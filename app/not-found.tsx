import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonClass } from "@/components/button";
import { PageHeader } from "@/components/container";

export default function NotFound() {
  return (
    <main className="pb-24">
      <PageHeader
        eyebrow="404"
        watermark="404"
        title="This page doesn't exist."
        description="The link may be broken, or the page may have moved."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className={buttonClass("primary")}>
            Go home
            <ArrowRight aria-hidden />
          </Link>
          <Link href="/projects" className={buttonClass("ghost")}>
            See my projects
          </Link>
        </div>
      </PageHeader>
    </main>
  );
}
