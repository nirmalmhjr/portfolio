"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useMounted } from "@/hooks/use-mounted";

/**
 * Light/dark switch. The knob position comes from the `.dark` class on <html>
 * (see globals.css), so it is correct before hydration.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  const isDark = !mounted || resolvedTheme !== "light";
  const toggleTheme = () => setTheme(isDark ? "light" : "dark");

  return (
    <button
      aria-checked={isDark}
      aria-label="Dark mode"
      className="theme-switch"
      onClick={toggleTheme}
      role="switch"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      type="button"
    >
      <span aria-hidden className="theme-switch-knob" />
      <Sun aria-hidden className="icon-sun" />
      <Moon aria-hidden className="icon-moon" />
    </button>
  );
}
