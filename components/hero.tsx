import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { siteConfig, socialLinks } from "@/lib/site.config";

const socials = [
  { href: socialLinks.email, label: "Email", Icon: Mail },
  { href: socialLinks.github, label: "GitHub", Icon: Github },
  { href: socialLinks.linkedin, label: "LinkedIn", Icon: Linkedin },
];

export function Hero() {
  const firstName = siteConfig.name.split(" ")[0];
  const initials = siteConfig.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <section className="py-12 sm:py-16">
      <div className="flex items-center gap-4">
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-accent-soft text-lg font-bold text-accent">
          {initials}
        </span>
        <div>
          <h1 className="flex items-center gap-2 text-2xl sm:text-3xl">
            Hey, I&apos;m {firstName}
            <span className="inline-block origin-[70%_70%] animate-wave">
              👋
            </span>
          </h1>
          <p className="eyebrow mt-1">{siteConfig.title}</p>
        </div>
      </div>

      <p className="pretty text-muted mt-8 text-lg leading-relaxed">
        {siteConfig.intro} I&apos;m currently based in{" "}
        <span className="font-medium text-foreground">
          {siteConfig.location.replace(/^Remote · /, "")}
        </span>{" "}
        and{" "}
        <Link href="/contact" className="link">
          open to new work
        </Link>
        . I also write about the JavaScript concepts I wish I&apos;d understood
        sooner — you&apos;ll find those{" "}
        <Link href="/blog" className="link">
          on the blog
        </Link>
        .
      </p>

      <div className="mt-8 flex flex-wrap gap-2.5">
        {socials.map(({ href, label, Icon }) => (
          <a
            key={label}
            href={href}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-2 text-sm font-medium transition-colors hover:border-accent/50 hover:text-accent"
            {...(href.startsWith("http")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            <Icon className="h-4 w-4" />
            {label}
          </a>
        ))}
      </div>
    </section>
  );
}
