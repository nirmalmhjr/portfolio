import { SITE_CONFIG } from "@/configs/site";
import { renderResumePdf } from "@/features/resume/components/ResumePdf";

/**
 * The downloadable résumé. Generated at build time from the profile and
 * projects constants (via features/resume/utils/resume-document.ts), so it can never go stale.
 */
export const dynamic = "force-static";

export async function GET() {
  const pdf = await renderResumePdf();

  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Disposition": `inline; filename="${SITE_CONFIG.resumeFileName}"`,
      "Content-Type": "application/pdf",
    },
  });
}
