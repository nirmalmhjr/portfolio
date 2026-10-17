"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { buttonClass, iconButtonClass } from "@/components/button";
import { SectionLink } from "@/components/section-link";
import { ThemeToggle } from "@/components/theme-toggle";
import type { NavItem } from "@/lib/nav";
import { siteConfig } from "@/lib/site.config";
import { cn } from "@/lib/utils";

/** "/#projects" -> "projects"; page links -> null. */
function sectionId(href: string): string | null {
  return href.startsWith("/#") ? href.slice(2) : null;
}

/**
 * On the homepage, returns the href of the section in the middle of the
 * screen (e.g. "/#skills"), or null while the hero is showing.
 */
function useActiveSection(items: NavItem[], enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      setActive(null);
      return;
    }
    const ids = items.map((i) => sectionId(i.href)).filter(Boolean);
    const sections = ids
      .map((id) => document.getElementById(id as string))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0 || !("IntersectionObserver" in window)) {
      return;
    }

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.add(entry.target.id);
          } else {
            visible.delete(entry.target.id);
          }
        }
        // Use document order so the earlier section wins at a boundary.
        const current = sections.find((s) => visible.has(s.id));
        setActive(current ? `/#${current.id}` : null);
      },
      // A thin band across the middle of the viewport.
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items, enabled]);

  return active;
}

export function Header({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const activeSection = useActiveSection(items, pathname === "/");

  const activeHref =
    activeSection ??
    items.find(
      (item) =>
        !sectionId(item.href) &&
        (pathname === item.href || pathname.startsWith(`${item.href}/`))
    )?.href ??
    null;

  // Sliding highlight behind the active tab.
  const listRef = useRef<HTMLUListElement>(null);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(
    null
  );

  useEffect(() => {
    const update = () => {
      const list = listRef.current;
      const el = list?.querySelector<HTMLElement>('[data-active="true"]');
      if (!(list && el)) {
        return setPill(null);
      }
      // Measure against the list: each link sits in a positioned <li>, so its
      // offsetLeft would always be 0 and the pill would never move.
      const left =
        el.getBoundingClientRect().left - list.getBoundingClientRect().left;
      setPill({ left, width: el.offsetWidth });
    };
    update();
    document.fonts?.ready.then(update);
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [activeHref]);

  useEffect(() => setOpen(false), [pathname]);

  // Arriving at "/#experience" from another page: Next.js has already
  // scrolled to the section by now, so drop the hash to keep the URL clean.
  useEffect(() => {
    if (pathname === "/" && window.location.hash) {
      window.history.replaceState(null, "", "/");
    }
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="fixed top-[calc(env(safe-area-inset-top,0px)+14px)] left-1/2 z-50 flex w-[min(1184px,calc(100%-32px))] -translate-x-1/2 items-center justify-between gap-3 rounded-full border border-line bg-canvas/75 py-[7px] pr-[7px] pl-[18px] backdrop-blur-xl backdrop-saturate-150 sm:w-[min(1184px,calc(100%-48px))] lg:w-[min(1184px,calc(100%-96px))] print:hidden">
        <Link className="font-extrabold text-xl tracking-[-0.04em]" href="/">
          NM<span className="text-ink">.</span>
          <span className="sr-only"> {siteConfig.name}, home</span>
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
            href="/resume"
            scroll={false}
          >
            Résumé
          </Link>
          <button
            aria-controls="mobile-menu"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className={cn(iconButtonClass, "md:hidden")}
            onClick={() => setOpen((o) => !o)}
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
          id="mobile-menu"
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
                onClick={() => setOpen(false)}
              >
                {item.title}
              </SectionLink>
            );
          })}
          <Link
            className="rounded-xl px-3.5 py-3 text-ink hover:bg-raised"
            href="/resume"
            onClick={() => setOpen(false)}
            scroll={false}
          >
            Résumé
          </Link>
        </nav>
      ) : null}
    </>
  );
}
