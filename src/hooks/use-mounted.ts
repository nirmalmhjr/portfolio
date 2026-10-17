import { useSyncExternalStore } from "react";

const subscribe = () => () => undefined;

/**
 * Tells whether the component is rendering on the client after hydration.
 * The server render and the first client render both return false, so markup
 * that depends on browser-only state can't cause a hydration mismatch.
 *
 * @returns True once running in the browser after hydration.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
