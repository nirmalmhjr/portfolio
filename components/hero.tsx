import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { siteConfig, socialLinks } from "@/lib/site.config";

const socials = [
  { href: socialLinks.email, label: "Email" },
  { href: socialLinks.github, label: "GitHub" },
  { href: socialLinks.linkedin, label: "LinkedIn" },
];

export function Hero() {
  const [first, ...rest] = siteConfig.name.split(" ");

  return (
    <section className="pb-16 pt-10 sm:pt-16">
      <Reveal>
        <p className="label mb-6 sm:mb-10">
          Portfolio — {new Date().getFullYear()}
        </p>
        <h1 className="display text-display-lg">
          {first}
          <br />
          <span className="text-muted">{rest.join(" ")}</span>
        </h1>
      </Reveal>

      <div className="meta-row text-muted mt-10 font-mono text-xs uppercase tracking-wider">
        <div>
          <span className="text-foreground">{siteConfig.role}</span>
        </div>
        <div className="sm:text-center">
          <span className="text-foreground">{siteConfig.location}</span>
        </div>
        <div className="sm:text-right">
          <span className="inline-flex items-center gap-2 text-foreground">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-accent" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            {siteConfig.availability}
          </span>
        </div>
      </div>

      <Reveal delay={80}>
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <p className="max-w-2xl font-display text-2xl leading-tight tracking-tight sm:text-3xl">
            {siteConfig.intro}{" "}
            <Link
              href="/projects"
              className="inline-flex items-baseline gap-1 border-b-2 border-accent/50 text-accent transition-colors hover:border-accent"
            >
              See the work
              <ArrowUpRight className="h-5 w-5 self-center" />
            </Link>
          </p>

          <div className="flex flex-col justify-end gap-4">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {socials.map(({ href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="text-muted group inline-flex items-center gap-1 font-mono text-xs uppercase tracking-widest transition-colors hover:text-foreground"
                  {...(href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {label}
                  <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              ))}
            </div>
            <p className="text-muted flex items-center gap-2 font-mono text-xs uppercase tracking-widest">
              <ArrowDown className="h-3.5 w-3.5" /> Scroll
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
