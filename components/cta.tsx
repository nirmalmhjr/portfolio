import { ArrowRight } from "lucide-react";
import { siteConfig, socialLinks } from "@/lib/site.config";

export function Cta() {
  return (
    <section className="rounded-2xl border border-border bg-accent-soft p-8 text-center sm:p-10">
      <h2 className="text-2xl font-bold tracking-tight">
        Let&apos;s work together
      </h2>
      <p className="pretty text-muted mx-auto mt-2 max-w-md">
        Have a project in mind, a role to fill, or just want to say hi? My inbox
        is always open.
      </p>
      <a
        href={socialLinks.email}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.03]"
      >
        Say hello
        <ArrowRight className="h-4 w-4" />
      </a>
      <p className="text-muted mt-3 text-xs">{siteConfig.author.email}</p>
    </section>
  );
}
