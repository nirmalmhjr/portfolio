import { Download } from "lucide-react";
import type { Metadata } from "next";
import { buttonClass } from "@/components/button";
import { ResumeSheet } from "@/components/resume-sheet";
import { siteConfig } from "@/lib/site.config";

export const metadata: Metadata = {
  alternates: { canonical: "/resume" },
  description: `Résumé of ${siteConfig.name}, ${siteConfig.title} in ${siteConfig.location}. Next.js, TypeScript, React and Tailwind CSS.`,
  title: "Résumé",
};

export default function ResumePage() {
  return (
    <main className="px-4 pt-[112px] pb-24 sm:pt-[132px] print:p-0">
      <div className="mx-auto mb-6 flex max-w-[210mm] flex-wrap items-center justify-between gap-3 print:hidden">
        <div>
          <p className="eyebrow">Résumé</p>
          <p className="mt-2 text-muted text-sm">
            Same content as the PDF, always up to date. The PDF also has my
            phone number.
          </p>
        </div>
        <a
          className={buttonClass("primary")}
          download={siteConfig.resumeFileName}
          href={siteConfig.resumeUrl}
        >
          <Download aria-hidden />
          Download PDF
        </a>
      </div>

      <ResumeSheet />
    </main>
  );
}
