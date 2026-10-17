"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SectionLink } from "@/components/shared/SectionLink";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { buttonClass, ICON_BUTTON_CLASS } from "@/components/ui/button";
import { getHomeSectionId, ROUTES } from "@/configs/routes";
import { SITE_CONFIG } from "@/configs/site";
import { useActiveIndicator } from "@/hooks/use-active-indicator";
import { useActiveSection } from "@/hooks/use-active-section";
import { useEscapeKey } from "@/hooks/use-escape-key";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types/nav.types";

const MOBILE_MENU_ID = "mobile-menu";

interface HeaderProps {
  readonly items: readonly NavItem[];
}

export function Header({ items }: HeaderProps) {
  const pathname = usePathname();
  const isHome = pathname === ROUTES.home;

  // The menu remembers the page it was opened on, so navigating closes it.
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const open = menuPath === pathname;
  const closeMenu = useCallback(() => setMenuPath(null), []);
  const toggleMenu = () => setMenuPath(open ? null : pathname);
  useEscapeKey(closeMenu, open);

  const sectionIds = useMemo(
    () =>
      items
        .map((item) => getHomeSectionId(item.href))
        .filter((id): id is string => id !== null),
    [items]
  );
  const activeSection = useActiveSection(sectionIds, isHome);

  const activeHref = activeSection
    ? (items.find((item) => getHomeSectionId(item.href) === activeSection)
        ?.href ?? null)
    : (items.find(
        (item) =>
          !getHomeSectionId(item.href) &&
          (pathname === item.href || pathname.startsWith(`${item.href}/`))
      )?.href ?? null);

  // Sliding highlight behind the active tab.
  const listRef = useRef<HTMLUListElement>(null);
  const pill = useActiveIndicator(listRef, activeHref);

  // Arriving at "/#experience" from another page: Next.js has already
  // scrolled to the section by now, so drop the hash to keep the URL clean.
  useEffect(() => {
    if (isHome && window.location.hash) {
      window.history.replaceState(null, "", ROUTES.home);
    }
  }, [isHome]);

  return (
    <>
      <header className="fixed top-[calc(env(safe-area-inset-top,0px)+14px)] left-1/2 z-50 flex w-[min(1184px,calc(100%-32px))] -translate-x-1/2 items-center justify-between gap-3 rounded-full border border-line bg-canvas/75 py-[7px] pr-[7px] pl-[18px] backdrop-blur-xl backdrop-saturate-150 sm:w-[min(1184px,calc(100%-48px))] lg:w-[min(1184px,calc(100%-96px))] print:hidden">
        <Link
          className="font-extrabold text-xl tracking-[-0.04em]"
          href={ROUTES.home}
        >
          NM<span className="text-ink">.</span>
          <span className="sr-only"> {SITE_CONFIG.name}, home</span>
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="relative flex gap-0.5" ref={listRef}>
            <li
              aria-hidden
              className={cn(
                "pointer-events-none absolute inset-y-0 left-0 rounded-full bg-raised transition-[transform,width,opacity] duration-300 ease-out",
                pill ? "opacity-100" : "opacity-0"
              )}
              style={{
                transform: `translateX(${pill?.left ?? 0}px)`,
                width: pill?.width ?? 0,
              }}
            />
            {items.map((item) => {
              const active = item.href === activeHref;
              return (
                <li className="relative" key={item.href}>
                  <SectionLink
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "block rounded-full px-3 py-1.5 text-sm transition-colors",
                      active ? "text-fg" : "text-muted hover:text-fg"
                    )}
                    data-active={active}
                    href={item.href}
                  >
                    {item.title}
                  </SectionLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            className={buttonClass(
              "primary",
              "hidden h-[38px] px-4 text-sm md:inline-flex"
            )}
            href={ROUTES.resume}
            scroll={false}
          >
            Résumé
          </Link>
          <button
            aria-controls={MOBILE_MENU_ID}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className={cn(ICON_BUTTON_CLASS, "md:hidden")}
            onClick={toggleMenu}
            type="button"
          >
            {open ? <X aria-hidden /> : <Menu aria-hidden />}
          </button>
        </div>
      </header>

      {open ? (
        <nav
          aria-label="Main"
          className="fixed inset-x-4 top-[calc(env(safe-area-inset-top,0px)+74px)] z-50 grid gap-0.5 rounded-[18px] border border-line bg-surface p-2 shadow-2xl sm:inset-x-6 md:hidden"
          id={MOBILE_MENU_ID}
        >
          {items.map((item) => {
            const active = item.href === activeHref;
            return (
              <SectionLink
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-xl px-3.5 py-3 text-muted hover:bg-raised hover:text-fg",
                  active && "bg-raised text-fg"
                )}
                href={item.href}
                key={item.href}
                onClick={closeMenu}
              >
                {item.title}
              </SectionLink>
            );
          })}
          <Link
            className="rounded-xl px-3.5 py-3 text-ink hover:bg-raised"
            href={ROUTES.resume}
            onClick={closeMenu}
            scroll={false}
          >
            Résumé
          </Link>
        </nav>
      ) : null}
    </>
  );
}
