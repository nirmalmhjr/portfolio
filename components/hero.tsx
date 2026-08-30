import { ContactLinks } from "@/components/contact-links";
import { siteConfig } from "@/lib/site.config";

export function Hero() {
  return (
    <section className="py-16 sm:py-24">
      <p className="text-muted text-sm font-medium uppercase tracking-widest">
        {siteConfig.title}
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
        {siteConfig.name}
      </h1>
      <p className="text-muted mt-6 max-w-2xl text-lg">{siteConfig.intro}</p>
      <div className="mt-8">
        <ContactLinks />
      </div>
    </section>
  );
}
