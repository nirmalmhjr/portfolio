"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav, siteConfig } from "@/lib/site.config";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b bg-[hsl(var(--background)/0.8)] backdrop-blur">
      <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4">
        <Link href="/" className="font-semibold tracking-tight">
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
                  "hover:bg-muted rounded-md px-3 py-2 text-sm transition-colors",
                  active
                    ? "font-medium text-[hsl(var(--foreground))]"
                    : "text-muted"
                )}
              >
                {item.title}
              </Link>
            );
          })}
          <div className="ml-1">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
