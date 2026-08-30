import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { mainNav, siteConfig, socialLinks } from "@/lib/site.config";

const social = [
  { href: socialLinks.github, label: "GitHub" },
  { href: socialLinks.linkedin, label: "LinkedIn" },
  { href: socialLinks.twitter, label: "Twitter" },
  { href: "/rss.xml", label: "RSS" },
];

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border">
      <div className="mx-auto max-w-[92rem] px-5 pb-10 pt-16 sm:px-8 sm:pt-24">
        <p className="label mb-6">(Contact) — Let&apos;s work together</p>
        <a href={socialLinks.email} className="group block">
          <span className="display block text-display-md">Say hello</span>
          <span className="text-muted mt-4 inline-flex items-center gap-2 font-mono text-sm transition-colors group-hover:text-foreground">
            {siteConfig.author.email}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </a>

        <div className="mt-20 grid grid-cols-2 gap-8 border-t border-border pt-10 sm:grid-cols-4">
          <nav className="flex flex-col gap-2.5">
            <span className="label mb-1">Pages</span>
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted font-mono text-xs uppercase tracking-wider transition-colors hover:text-foreground"
              >
                {item.title}
              </Link>
            ))}
          </nav>
          <nav className="flex flex-col gap-2.5">
            <span className="label mb-1">Social</span>
            {social.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-muted font-mono text-xs uppercase tracking-wider transition-colors hover:text-foreground"
                {...(item.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="col-span-2 flex flex-col justify-between gap-6 sm:items-end sm:text-right">
            <p className="text-muted font-mono text-[0.7rem] uppercase leading-relaxed tracking-wider">
              &copy; {new Date().getFullYear()} {siteConfig.name}
              <br />
              Built with Next.js &amp; MDX
            </p>
            <a
              href="#top"
              className="text-muted font-mono text-[0.7rem] uppercase tracking-wider transition-colors hover:text-foreground"
            >
              ↑ Back to top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
