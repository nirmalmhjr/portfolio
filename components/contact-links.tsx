import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { siteConfig, socialLinks } from "@/lib/site.config";

const items = [
  {
    href: socialLinks.email,
    label: "Email",
    value: siteConfig.author.email,
    Icon: Mail,
    external: false,
  },
  {
    href: socialLinks.github,
    label: "GitHub",
    value: `github.com/${siteConfig.author.github}`,
    Icon: Github,
    external: true,
  },
  {
    href: socialLinks.linkedin,
    label: "LinkedIn",
    value: `in/${siteConfig.author.linkedin}`,
    Icon: Linkedin,
    external: true,
  },
];

export function ContactLinks() {
  return (
    <ul className="divide-y divide-border/70 border-y border-border">
      {items.map(({ href, label, value, Icon, external }) => (
        <li key={label}>
          <a
            href={href}
            className="group flex items-center gap-4 py-4 transition-colors hover:text-accent"
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            <Icon className="text-muted h-5 w-5 shrink-0 transition-colors group-hover:text-accent" />
            <span className="text-muted w-24 shrink-0 font-mono text-xs uppercase tracking-wider">
              {label}
            </span>
            <span className="min-w-0 flex-1 truncate">{value}</span>
            <ArrowUpRight className="text-muted h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
          </a>
        </li>
      ))}
    </ul>
  );
}
