"use client";

import { useEffect } from "react";

/**
 * One pointer listener for the whole page: sets --x/--y on whichever `.spot`
 * element is under the cursor, which drives the spotlight glow in globals.css.
 */
export function SpotlightTracker() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;

    const onMove = (e: PointerEvent) => {
      const target = e.target instanceof Element ? e.target : null;
      const card = target?.closest<HTMLElement>(".spot");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--x", `${e.clientX - rect.left}px`);
      card.style.setProperty("--y", `${e.clientY - rect.top}px`);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);

  return null;
}
