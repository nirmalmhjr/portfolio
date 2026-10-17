import { Github, Linkedin, Mail } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { ICON_BUTTON_CLASS } from "@/components/ui/button";
import { SITE_CONFIG, SOCIAL_LINKS } from "@/configs/site";

export function Footer() {
  return (
    <footer className="border-line border-t py-10 text-faint text-sm print:hidden">
      <Container className="flex flex-wrap items-center justify-between gap-x-8 gap-y-5">
        <p>
          <span className="font-extrabold text-fg">
            NM<span className="text-ink">.</span>
          </span>{" "}
          © {new Date().getFullYear()} {SITE_CONFIG.name}
        </p>

        {/* Footer nav, hidden for now. To bring it back, add
            const nav = getNav(); const hasBlog = hasPublishedPosts();
          (from @/lib/nav) and uncomment:
        <nav aria-label="Footer">
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
                  href={ROUTES.rss}
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
            className={ICON_BUTTON_CLASS}
            href={SOCIAL_LINKS.github}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Github aria-hidden />
          </a>
          {SOCIAL_LINKS.linkedin ? (
            <a
              aria-label="LinkedIn profile"
              className={ICON_BUTTON_CLASS}
              href={SOCIAL_LINKS.linkedin}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Linkedin aria-hidden />
            </a>
          ) : null}
          <a
            aria-label="Email"
            className={ICON_BUTTON_CLASS}
            href={SOCIAL_LINKS.email}
          >
            <Mail aria-hidden />
          </a>
        </div>
      </Container>
    </footer>
  );
}
