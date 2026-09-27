"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

/**
 * Light/dark switch. The knob position comes from the `.dark` class on <html>
 * (see globals.css), so it is correct before hydration.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = !mounted || resolvedTheme !== "light";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Dark mode"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="theme-switch"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <span aria-hidden className="theme-switch-knob" />
      <Sun aria-hidden className="icon-sun" />
      <Moon aria-hidden className="icon-moon" />
    </button>
  );
}
