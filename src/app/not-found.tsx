import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/shared/Container";
import { buttonClass } from "@/components/ui/button";
import { ROUTES } from "@/configs/routes";

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
          <Link className={buttonClass("primary")} href={ROUTES.home}>
            Go home
            <ArrowRight aria-hidden />
          </Link>
          <Link className={buttonClass("ghost")} href={ROUTES.projects}>
            See my projects
          </Link>
        </div>
      </PageHeader>
    </main>
  );
}
