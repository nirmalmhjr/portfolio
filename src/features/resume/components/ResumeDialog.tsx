"use client";

import { Download, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import {
  type MouseEvent,
  type ReactNode,
  type SyntheticEvent,
  useEffect,
  useRef,
} from "react";
import { buttonClass, ICON_BUTTON_CLASS } from "@/components/ui/button";
import { ROUTES } from "@/configs/routes";
import { SITE_CONFIG } from "@/configs/site";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { cn } from "@/lib/utils";

interface ResumeDialogProps {
  readonly children: ReactNode;
  readonly titleId: string;
}

/**
 * The résumé as a dialog over the current page, shown when /resume is opened
 * from inside the site (app/@modal/(.)resume). Visiting /resume directly still
 * renders the full page. Closes with the ✕ button, Escape, a click outside the
 * sheet, or the browser's back button.
 */
export function ResumeDialog({ titleId, children }: ResumeDialogProps) {
  const router = useRouter();
  const pathname = usePathname();
  const ref = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  // The slot keeps this mounted after navigating away, so follow the URL.
  const open = pathname === ROUTES.resume;
  const openRef = useRef(open);
  openRef.current = open;

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) {
      return;
    }
    if (open && !dialog.open) {
      dialog.showModal();
      // Start on ✕ rather than the first link, so Enter/Space closes it.
      closeRef.current?.focus();
    }
    if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  // Keep the page behind from scrolling while the dialog is open.
  useScrollLock(open);

  const close = () => {
    if (openRef.current) {
      router.back();
    }
  };

  const handleCancel = (e: SyntheticEvent<HTMLDialogElement>) => {
    e.preventDefault();
    close();
  };

  // A click on the backdrop (outside the sheet) closes the dialog.
  const closeOnBackdropClick = (e: MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) {
      close();
    }
  };

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: keyboard users close it with Escape (onCancel) or the ✕ button; the backdrop click is a mouse shortcut.
    <dialog
      aria-labelledby={titleId}
      className="m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto overscroll-contain bg-transparent p-0 text-fg backdrop:bg-black/70 backdrop:backdrop-blur-sm print:hidden"
      onCancel={handleCancel}
      onClick={closeOnBackdropClick}
      // If the browser closes it anyway (e.g. a second Escape), sync the URL.
      onClose={close}
      ref={ref}
    >
      {/* biome-ignore lint/a11y/noStaticElementInteractions lint/a11y/noNoninteractiveElementInteractions lint/a11y/useKeyWithClickEvents: the padding around the sheet is part of the backdrop; Escape and ✕ cover the keyboard. */}
      <div
        className="mx-auto max-w-[calc(210mm+32px)] px-4 pt-4 pb-10 sm:pt-6"
        onClick={closeOnBackdropClick}
      >
        <div className="sticky top-3 z-10 mb-4 flex items-center justify-between gap-3 rounded-full border border-line bg-canvas/85 py-[6px] pr-[6px] pl-[18px] backdrop-blur-xl sm:top-4">
          <p className="eyebrow">Résumé</p>
          <div className="flex items-center gap-2">
            <a
              className={buttonClass("primary", "h-[38px] px-4 text-sm")}
              download={SITE_CONFIG.resumeFileName}
              href={ROUTES.resumePdf}
            >
              <Download aria-hidden />
              Download PDF
            </a>
            <button
              aria-label="Close résumé"
              className={cn(ICON_BUTTON_CLASS, "bg-surface")}
              onClick={close}
              ref={closeRef}
              type="button"
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
