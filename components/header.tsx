"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { buttonClass, iconButtonClass } from "@/components/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { mainNav, siteConfig } from "@/lib/site.config";
import { uses } from "@/lib/uses";
import { cn } from "@/lib/utils";

// The Uses page stays hidden until lib/uses.ts has content.
const nav = mainNav.filter((item) => item.href !== "/uses" || uses.length > 0);

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header className="fixed left-1/2 top-[calc(env(safe-area-inset-top,0px)+14px)] z-50 flex w-[min(1184px,calc(100%-32px))] -translate-x-1/2 items-center justify-between gap-3 rounded-full border border-line bg-canvas/75 py-[7px] pl-[18px] pr-[7px] backdrop-blur-xl backdrop-saturate-150 sm:w-[min(1184px,calc(100%-48px))] lg:w-[min(1184px,calc(100%-96px))]">
        <Link
          href="/"
          aria-label={`${siteConfig.name}, home`}
          className="text-xl font-extrabold tracking-[-0.04em]"
        >
          NM<span className="text-ink">.</span>
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex gap-0.5">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:bg-raised hover:text-fg",
                    isActive(item.href) && "bg-raised text-fg"
                  )}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={siteConfig.resumeUrl}
            download={siteConfig.resumeFileName}
            className={buttonClass(
              "primary",
              "hidden h-[38px] px-4 text-sm md:inline-flex"
            )}
          >
            Résumé
          </a>
          <button
            type="button"
            className={cn(iconButtonClass, "md:hidden")}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X aria-hidden /> : <Menu aria-hidden />}
          </button>
        </div>
      </header>

      {open ? (
        <nav
          id="mobile-menu"
          aria-label="Main"
          className="fixed inset-x-4 top-[calc(env(safe-area-inset-top,0px)+74px)] z-50 grid gap-0.5 rounded-[18px] border border-line bg-surface p-2 shadow-2xl sm:inset-x-6 md:hidden"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "rounded-xl px-3.5 py-3 text-muted hover:bg-raised hover:text-fg",
                isActive(item.href) && "bg-raised text-fg"
              )}
            >
              {item.title}
            </Link>
          ))}
          <a
            href={siteConfig.resumeUrl}
            download={siteConfig.resumeFileName}
            className="rounded-xl px-3.5 py-3 text-ink hover:bg-raised"
          >
            Download résumé
          </a>
        </nav>
      ) : null}
    </>
  );
}
