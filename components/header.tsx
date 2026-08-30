"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav, siteConfig } from "@/lib/site.config";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  const pathname = usePathname();
  const lastName = siteConfig.name.split(" ").slice(-1)[0];

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[92rem] items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="font-display text-sm font-bold uppercase tracking-tight"
        >
          {siteConfig.name.split(" ")[0]}
          <span className="text-muted">{lastName ? ` ${lastName}` : ""}</span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          {mainNav.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-2 py-1 font-mono text-[0.7rem] uppercase tracking-widest transition-colors hover:text-foreground",
                  active ? "text-foreground" : "text-muted"
                )}
              >
                {item.title}
              </Link>
            );
          })}
          <span className="mx-1 hidden h-3 w-px bg-border sm:block" />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
