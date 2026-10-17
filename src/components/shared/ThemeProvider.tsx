"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";
import { STORAGE_KEYS } from "@/configs/storage";

/** Soft dark by default; visitors switch with the toggle in the header. */
export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
      enableSystem={false}
      storageKey={STORAGE_KEYS.theme}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
