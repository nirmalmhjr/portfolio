import { Github, Linkedin, Mail } from "lucide-react";
import { iconButtonClass } from "@/components/button";
import { Container } from "@/components/container";
import { getNav, hasPublishedPosts } from "@/lib/nav";
import { siteConfig, socialLinks } from "@/lib/site.config";

export function Footer() {
  const nav = getNav();
  const hasBlog = hasPublishedPosts();

  return (
    <footer className="border-line border-t py-10 text-faint text-sm print:hidden">
      <Container className="flex flex-wrap items-center justify-between gap-x-8 gap-y-5">
        <p>
          <span className="font-extrabold text-fg">
            NM<span className="text-ink">.</span>
          </span>{" "}
          © {new Date().getFullYear()} {siteConfig.name}
        </p>

        {/* <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-fg">
                  {item.title}
                </Link>
              </li>
            ))}
            {hasBlog ? (
              <li>
                <a
                  href="/rss.xml"
                  className="inline-flex items-center gap-1 hover:text-fg"
                >
                  <Rss aria-hidden className="h-3.5 w-3.5" /> RSS
                </a>
              </li>
            ) : null}
          </ul>
        </nav> */}

        <div className="flex gap-1.5">
          <a
            aria-label="GitHub profile"
            className={iconButtonClass}
            href={socialLinks.github}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Github aria-hidden />
          </a>
          {socialLinks.linkedin ? (
            <a
              aria-label="LinkedIn profile"
              className={iconButtonClass}
              href={socialLinks.linkedin}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Linkedin aria-hidden />
            </a>
          ) : null}
          <a
            aria-label="Email"
            className={iconButtonClass}
            href={socialLinks.email}
          >
            <Mail aria-hidden />
          </a>
        </div>
      </Container>
    </footer>
  );
}
