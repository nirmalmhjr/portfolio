import { renderResumePdf } from "@/lib/resume-pdf";
import { siteConfig } from "@/lib/site.config";

/**
 * The downloadable résumé. Generated at build time from lib/resume.ts and
 * lib/projects.ts (via lib/resume-document.ts), so it can never go stale.
 */
export const dynamic = "force-static";

export async function GET() {
  const pdf = await renderResumePdf();

  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${siteConfig.resumeFileName}"`,
    },
  });
}
