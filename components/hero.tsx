import Link from "next/link";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { AvailableBadge } from "@/components/available-badge";
import { siteConfig, socialLinks } from "@/lib/site.config";

const socials = [
  { href: socialLinks.email, label: "Email", Icon: Mail },
  { href: socialLinks.github, label: "GitHub", Icon: Github },
  { href: socialLinks.linkedin, label: "LinkedIn", Icon: Linkedin },
];

const facts = [
  ["Location", "Remote · UTC+5:45"],
  ["Focus", "Frontend · Design systems"],
  ["Stack", "React · Next.js · TS"],
  ["Status", "Open to freelance & full-time"],
];

export function Hero() {
  return (
    <section className="grid items-start gap-12 py-16 sm:py-24 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
      <div className="animate-fade-up">
        <AvailableBadge />

        <h1 className="mt-6 text-balance font-display text-5xl leading-[1] sm:text-7xl">
          {siteConfig.name.split(" ")[0]}{" "}
          <span className="italic text-accent">
            {siteConfig.name.split(" ").slice(1).join(" ")}
          </span>
        </h1>

        <p className="text-muted mt-4 font-mono text-sm uppercase tracking-[0.16em]">
          {siteConfig.title}
        </p>

        <p className="text-muted mt-7 max-w-xl text-pretty text-lg leading-relaxed">
          {siteConfig.intro}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-accent"
          >
            View work
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/about"
            className="hover:bg-muted inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors"
          >
            About me
          </Link>

          <div className="ml-1 flex items-center gap-1">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-muted grid h-9 w-9 place-items-center rounded-full border border-border transition-colors hover:border-accent hover:text-accent"
                {...(href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <dl className="animate-fade-up rounded-xl border border-border bg-surface p-6 shadow-card [animation-delay:120ms]">
        <p className="label mb-5">Currently</p>
        {facts.map(([k, v], i) => (
          <div
            key={k}
            className={
              "flex items-start justify-between gap-4 py-3 text-sm " +
              (i > 0 ? "border-t border-border/70" : "")
            }
          >
            <dt className="text-muted">{k}</dt>
            <dd className="max-w-[60%] text-right font-medium">{v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
