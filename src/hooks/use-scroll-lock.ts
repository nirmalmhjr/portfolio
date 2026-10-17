import { useEffect } from "react";

/**
 * Stops the page behind an overlay from scrolling while `locked` is true, and
 * restores the previous overflow value afterwards.
 *
 * @param locked - Lock scrolling while this is true.
 */
export function useScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) {
      return;
    }
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [locked]);
}
