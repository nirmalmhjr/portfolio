import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { buttonClass } from "@/components/button";
import { PageHeader } from "@/components/container";

export default function NotFound() {
  return (
    <main className="pb-24">
      <PageHeader
        description="The link may be broken, or the page may have moved."
        eyebrow="404"
        title="This page doesn't exist."
        watermark="404"
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Link className={buttonClass("primary")} href="/">
            Go home
            <ArrowRight aria-hidden />
          </Link>
          <Link className={buttonClass("ghost")} href="/projects">
            See my projects
          </Link>
        </div>
      </PageHeader>
    </main>
  );
}
