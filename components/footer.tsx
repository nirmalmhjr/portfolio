import Link from "next/link";
import { Github, Linkedin, Mail, Rss } from "lucide-react";
import { iconButtonClass } from "@/components/button";
import { Container } from "@/components/container";
import { mainNav, siteConfig, socialLinks } from "@/lib/site.config";
import { uses } from "@/lib/uses";

const nav = mainNav.filter((item) => item.href !== "/uses" || uses.length > 0);

export function Footer() {
  return (
    <footer className="border-t border-line py-10 text-sm text-faint">
      <Container className="flex flex-wrap items-center justify-between gap-x-8 gap-y-5">
        <p>
          <span className="font-extrabold text-fg">
            NM<span className="text-ink">.</span>
          </span>{" "}
          © {new Date().getFullYear()} {siteConfig.name}
        </p>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-fg">
                  {item.title}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="/rss.xml"
                className="inline-flex items-center gap-1 hover:text-fg"
              >
                <Rss aria-hidden className="h-3.5 w-3.5" /> RSS
              </a>
            </li>
          </ul>
        </nav>

        <div className="flex gap-1.5">
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className={iconButtonClass}
          >
            <Github aria-hidden />
          </a>
          {socialLinks.linkedin ? (
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className={iconButtonClass}
            >
              <Linkedin aria-hidden />
            </a>
          ) : null}
          <a
            href={socialLinks.email}
            aria-label="Email"
            className={iconButtonClass}
          >
            <Mail aria-hidden />
          </a>
        </div>
      </Container>
    </footer>
  );
}
