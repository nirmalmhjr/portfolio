import { ArrowUpRight } from "lucide-react";
import { siteConfig, socialLinks } from "@/lib/site.config";

const items = [
  {
    href: socialLinks.email,
    label: "Email",
    value: siteConfig.author.email,
    external: false,
  },
  {
    href: socialLinks.github,
    label: "GitHub",
    value: `github.com/${siteConfig.author.github}`,
    external: true,
  },
  {
    href: socialLinks.linkedin,
    label: "LinkedIn",
    value: `linkedin.com/in/${siteConfig.author.linkedin}`,
    external: true,
  },
  {
    href: socialLinks.twitter,
    label: "Twitter",
    value: `@${siteConfig.author.twitter}`,
    external: true,
  },
];

export function ContactLinks() {
  return (
    <ul className="border-t border-border">
      {items.map(({ href, label, value, external }) => (
        <li key={label}>
          <a
            href={href}
            className="group grid grid-cols-[7rem_1fr_auto] items-center gap-4 border-b border-border py-5 transition-colors hover:bg-surface"
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            <span className="label">{label}</span>
            <span className="min-w-0 truncate font-display text-lg transition-transform duration-300 group-hover:translate-x-2 sm:text-xl">
              {value}
            </span>
            <ArrowUpRight className="text-muted h-4 w-4 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
          </a>
        </li>
      ))}
    </ul>
  );
}
