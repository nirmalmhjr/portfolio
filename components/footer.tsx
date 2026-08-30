import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { mainNav, siteConfig, socialLinks } from "@/lib/site.config";

const social = [
  { href: socialLinks.email, label: "Email" },
  { href: socialLinks.github, label: "GitHub" },
  { href: socialLinks.linkedin, label: "LinkedIn" },
  { href: "/rss.xml", label: "RSS" },
];

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border">
      <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="label mb-3">Get in touch</p>
            <a
              href={socialLinks.email}
              className="group inline-flex items-center gap-2 font-display text-3xl sm:text-4xl"
            >
              {siteConfig.author.email}
              <ArrowUpRight className="text-muted h-6 w-6 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" />
            </a>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-8 border-t border-border/70 pt-8 text-sm sm:grid-cols-4">
          <nav className="flex flex-col gap-2">
            <span className="label mb-1">Pages</span>
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted transition-colors hover:text-foreground"
              >
                {item.title}
              </Link>
            ))}
          </nav>
          <nav className="flex flex-col gap-2">
            <span className="label mb-1">Elsewhere</span>
            {social.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-muted transition-colors hover:text-foreground"
                {...(item.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="col-span-2 flex flex-col justify-between gap-4 sm:items-end sm:text-right">
            <p className="text-muted text-xs">
              &copy; {new Date().getFullYear()} {siteConfig.name}. Built with
              Next.js &amp; MDX.
            </p>
            <a
              href="#top"
              className="text-muted self-start text-xs transition-colors hover:text-foreground sm:self-end"
            >
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
