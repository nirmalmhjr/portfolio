"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav, siteConfig } from "@/lib/site.config";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-5 sm:px-6">
        <Link
          href="/"
          className="text-[0.95rem] font-bold tracking-tight transition-colors hover:text-accent"
        >
          {siteConfig.name}
        </Link>

        <nav className="flex items-center gap-1">
          {mainNav.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "hover:bg-muted rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors",
                  active ? "text-accent" : "text-muted hover:text-foreground"
                )}
              >
                {item.title}
              </Link>
            );
          })}
          <span className="mx-1 h-4 w-px bg-border" />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
