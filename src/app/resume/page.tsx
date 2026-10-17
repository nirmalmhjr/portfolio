import { Download } from "lucide-react";
import { buttonClass } from "@/components/ui/button";
import { ROUTES } from "@/configs/routes";
import { SITE_CONFIG } from "@/configs/site";
import { ResumeSheet } from "@/features/resume/components/ResumeSheet";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  description: `Résumé of ${SITE_CONFIG.name}, ${SITE_CONFIG.title} in ${SITE_CONFIG.location}. Next.js, TypeScript, React and Tailwind CSS.`,
  path: ROUTES.resume,
  title: "Résumé",
});

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
          download={SITE_CONFIG.resumeFileName}
          href={ROUTES.resumePdf}
        >
          <Download aria-hidden />
          Download PDF
        </a>
      </div>

      <ResumeSheet />
    </main>
  );
}
