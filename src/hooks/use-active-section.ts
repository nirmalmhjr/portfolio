import { useEffect, useState } from "react";

/** A thin band across the middle of the viewport. */
const ACTIVE_BAND_ROOT_MARGIN = "-45% 0px -50% 0px";

/**
 * Returns the id of the section in the middle of the screen, or null while
 * none of them is (e.g. while the hero is showing).
 *
 * @param sectionIds - Element ids to watch, in document order.
 * @param enabled - Turn tracking off (and reset to null) when false.
 * @returns The id of the active section, or null.
 */
export function useActiveSection(
  sectionIds: readonly string[],
  enabled: boolean
): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      setActive(null);
      return;
    }
    const sections = sectionIds
      .map((id) => document.getElementById(id))
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
        setActive(sections.find((s) => visible.has(s.id))?.id ?? null);
      },
      { rootMargin: ACTIVE_BAND_ROOT_MARGIN }
    );
    for (const section of sections) {
      observer.observe(section);
    }
    return () => observer.disconnect();
  }, [sectionIds, enabled]);

  return active;
}
