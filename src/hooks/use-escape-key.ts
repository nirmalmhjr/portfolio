import { useEffect } from "react";

/**
 * Calls `onEscape` when the Escape key is pressed, while `enabled` is true.
 *
 * @param onEscape - Handler to run on Escape.
 * @param enabled - Listen only while this is true.
 */
export function useEscapeKey(onEscape: () => void, enabled: boolean): void {
  useEffect(() => {
    if (!enabled) {
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onEscape();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onEscape, enabled]);
}
