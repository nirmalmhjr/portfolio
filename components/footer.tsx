import { Github, Linkedin, Mail, Rss } from "lucide-react";
import { siteConfig, socialLinks } from "@/lib/site.config";

const links = [
  { href: socialLinks.email, label: "Email", Icon: Mail },
  { href: socialLinks.github, label: "GitHub", Icon: Github },
  { href: socialLinks.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: "/rss.xml", label: "RSS", Icon: Rss },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t">
      <div className="text-muted mx-auto flex max-w-3xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm sm:flex-row">
        <p>
          &copy; {new Date().getFullYear()} {siteConfig.name}
        </p>
        <div className="flex items-center gap-4">
          {links.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="transition-colors hover:text-[hsl(var(--foreground))]"
              {...(href.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
