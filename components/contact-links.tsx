import { Github, Linkedin, Mail } from "lucide-react";
import { siteConfig, socialLinks } from "@/lib/site.config";

const items = [
  {
    href: socialLinks.email,
    label: siteConfig.author.email,
    Icon: Mail,
    external: false,
  },
  {
    href: socialLinks.github,
    label: "GitHub",
    Icon: Github,
    external: true,
  },
  {
    href: socialLinks.linkedin,
    label: "LinkedIn",
    Icon: Linkedin,
    external: true,
  },
];

export function ContactLinks() {
  return (
    <ul className="flex flex-wrap gap-3">
      {items.map(({ href, label, Icon, external }) => (
        <li key={label}>
          <a
            href={href}
            className="hover:bg-muted inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors"
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            <Icon className="h-4 w-4" />
            {label}
          </a>
        </li>
      ))}
    </ul>
  );
}
