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
    value: `linkedin.com/in/${siteConfig.author.linkedin}`,
    Icon: Linkedin,
    external: true,
  },
];

export function ContactLinks() {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map(({ href, label, value, Icon, external }) => (
        <li key={label}>
          <a
            href={href}
            className="card card-hover group flex items-center gap-3 p-4"
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
              <Icon className="h-4 w-4" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold">{label}</span>
              <span className="text-muted block truncate text-xs">{value}</span>
            </span>
            <ArrowUpRight className="text-muted ml-auto h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
          </a>
        </li>
      ))}
    </ul>
  );
}
