import type { Metadata } from "next";
import { Download } from "lucide-react";
import { buttonClass } from "@/components/button";
import { ResumeSheet } from "@/components/resume-sheet";
import { siteConfig } from "@/lib/site.config";

export const metadata: Metadata = {
  title: "Résumé",
  description: `Résumé of ${siteConfig.name}, ${siteConfig.title} in ${siteConfig.location}. Next.js, TypeScript, React and Tailwind CSS.`,
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  return (
    <main className="px-4 pb-24 pt-[112px] sm:pt-[132px] print:p-0">
      <div className="mx-auto mb-6 flex max-w-[210mm] flex-wrap items-center justify-between gap-3 print:hidden">
        <div>
          <p className="eyebrow">Résumé</p>
          <p className="mt-2 text-sm text-muted">
            Same content as the PDF, always up to date.
          </p>
        </div>
        <a
          href={siteConfig.resumeUrl}
          download={siteConfig.resumeFileName}
          className={buttonClass("primary")}
        >
          <Download aria-hidden />
          Download PDF
        </a>
      </div>

      <ResumeSheet />
    </main>
  );
}
