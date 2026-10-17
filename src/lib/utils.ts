import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Joins class names, dropping falsy values and letting later Tailwind classes
 * win over earlier conflicting ones.
 *
 * @param inputs - Class names, arrays or `{ class: condition }` objects.
 * @returns A single merged class string.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date as e.g. "August 30, 2026" (or "Aug 30, 2026"), in UTC so the
 * server and browser always agree.
 *
 * @param input - ISO date string or Date.
 * @param month - "long" (default) or "short" month name.
 * @returns Formatted date string.
 */
export function formatDate(
  input: string | Date,
  month: "long" | "short" = "long"
): string {
  const date = typeof input === "string" ? new Date(input) : input;
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month,
    timeZone: "UTC",
    year: "numeric",
  });
}
