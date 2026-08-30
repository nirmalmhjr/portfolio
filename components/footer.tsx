import Link from "next/link";
import { mainNav, siteConfig, socialLinks } from "@/lib/site.config";

const social = [
  { href: socialLinks.github, label: "GitHub" },
  { href: socialLinks.linkedin, label: "LinkedIn" },
  { href: socialLinks.twitter, label: "Twitter" },
  { href: "/rss.xml", label: "RSS" },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60">
      <div className="mx-auto flex max-w-2xl flex-col gap-4 px-5 py-10 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-muted">
          &copy; {new Date().getFullYear()} {siteConfig.name}
        </p>
        <nav className="flex flex-wrap gap-x-4 gap-y-1">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted transition-colors hover:text-accent"
            >
              {item.title}
            </Link>
          ))}
          {social.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-muted transition-colors hover:text-accent"
              {...(item.href.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
