import { type RefObject, useEffect, useState } from "react";

export interface IndicatorRect {
  readonly left: number;
  readonly width: number;
}

const ACTIVE_ITEM_SELECTOR = '[data-active="true"]';

/**
 * Measures the `[data-active="true"]` item inside a list, for a highlight
 * that slides behind the active tab. Re-measures on resize and once web fonts
 * have loaded.
 *
 * @param listRef - The list that contains the items.
 * @param activeKey - Changes whenever a different item becomes active.
 * @returns The active item's offset and width within the list, or null.
 */
export function useActiveIndicator(
  listRef: RefObject<HTMLElement | null>,
  activeKey: string | null
): IndicatorRect | null {
  const [rect, setRect] = useState<IndicatorRect | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: activeKey is the trigger to re-measure; the measurement reads the DOM.
  useEffect(() => {
    const update = () => {
      const list = listRef.current;
      const el = list?.querySelector<HTMLElement>(ACTIVE_ITEM_SELECTOR);
      if (!(list && el)) {
        setRect(null);
        return;
      }
      // Measure against the list: each link sits in a positioned <li>, so its
      // offsetLeft would always be 0 and the highlight would never move.
      const left =
        el.getBoundingClientRect().left - list.getBoundingClientRect().left;
      setRect({ left, width: el.offsetWidth });
    };
    update();
    document.fonts?.ready.then(update);
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [activeKey, listRef]);

  return rect;
}
