"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";

type SectionLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
};

/**
 * A <Link> that scrolls to a section on the current page without touching
 * the URL: no "#id" in the address bar and no history entry, so Back leaves
 * the page instead of stepping back through every section you visited. Links
 * to other pages behave like a normal <Link>.
 */
export function SectionLink({ href, onClick, ...props }: SectionLinkProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey
    ) {
      return;
    }

    const url = new URL(href, window.location.href);
    if (!url.hash || url.pathname !== window.location.pathname) return;
    const target = document.getElementById(
      decodeURIComponent(url.hash.slice(1))
    );
    if (!target) return;

    e.preventDefault();
    // Follows the smooth scroll and scroll-padding set on <html>.
    target.scrollIntoView();

    // Move focus like a native jump would, so Tab continues from the section.
    if (!target.hasAttribute("tabindex")) {
      target.setAttribute("tabindex", "-1");
      target.addEventListener(
        "blur",
        () => target.removeAttribute("tabindex"),
        { once: true }
      );
    }
    target.focus({ preventScroll: true });
  };

  return <Link href={href} onClick={handleClick} {...props} />;
}
