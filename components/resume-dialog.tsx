"use client";

import { Download, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import { buttonClass, iconButtonClass } from "@/components/button";
import { siteConfig } from "@/lib/site.config";
import { cn } from "@/lib/utils";

/**
 * The résumé as a dialog over the current page, shown when /resume is opened
 * from inside the site (app/@modal/(.)resume). Visiting /resume directly still
 * renders the full page. Closes with the ✕ button, Escape, a click outside the
 * sheet, or the browser's back button.
 */
export function ResumeDialog({
  titleId,
  children,
}: {
  titleId: string;
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const ref = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  // The slot keeps this mounted after navigating away, so follow the URL.
  const open = pathname === "/resume";
  const openRef = useRef(open);
  openRef.current = open;

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      // Start on ✕ rather than the first link, so Enter/Space closes it.
      closeRef.current?.focus();
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // Keep the page behind from scrolling while the dialog is open.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [open]);

  const close = () => {
    if (openRef.current) router.back();
  };

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      // If the browser closes it anyway (e.g. a second Escape), sync the URL.
      onClose={close}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      className="m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto overscroll-contain bg-transparent p-0 text-fg backdrop:bg-black/70 backdrop:backdrop-blur-sm print:hidden"
    >
      <div
        className="mx-auto max-w-[calc(210mm+32px)] px-4 pb-10 pt-4 sm:pt-6"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="sticky top-3 z-10 mb-4 flex items-center justify-between gap-3 rounded-full border border-line bg-canvas/85 py-[6px] pl-[18px] pr-[6px] backdrop-blur-xl sm:top-4">
          <p className="eyebrow">Résumé</p>
          <div className="flex items-center gap-2">
            <a
              href={siteConfig.resumeUrl}
              download={siteConfig.resumeFileName}
              className={buttonClass("primary", "h-[38px] px-4 text-sm")}
            >
              <Download aria-hidden />
              Download PDF
            </a>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close résumé"
              className={cn(iconButtonClass, "bg-surface")}
            >
              <X aria-hidden />
            </button>
          </div>
        </div>
        {children}
      </div>
    </dialog>
  );
}
