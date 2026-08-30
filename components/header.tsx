"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav, siteConfig } from "@/lib/site.config";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-display text-lg"
        >
          <span className="grid h-7 w-7 place-items-center rounded-md bg-foreground text-[0.7rem] font-semibold text-background transition-transform group-hover:-rotate-6">
            {siteConfig.name
              .split(" ")
              .map((w) => w[0])
              .join("")
              .slice(0, 2)}
          </span>
          <span className="hidden sm:inline">{siteConfig.name}</span>
        </Link>

        <nav className="flex items-center gap-0.5">
          {mainNav.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-md px-3 py-2 text-sm transition-colors hover:text-foreground",
                  active ? "text-foreground" : "text-muted"
                )}
              >
                {item.title}
                {active ? (
                  <span className="absolute inset-x-3 -bottom-[1px] h-[2px] rounded-full bg-accent" />
                ) : null}
              </Link>
            );
          })}
          <span className="mx-2 h-4 w-px bg-border" />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
