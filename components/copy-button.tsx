"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard can be blocked; the value stays selectable on the page.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex h-8 flex-none items-center justify-center gap-1.5 rounded-full border border-line-strong px-3 text-[13px] font-medium text-fg transition-colors hover:bg-raised [&_svg]:h-3.5 [&_svg]:w-3.5 [@container(max-width:305px)]:w-8 [@container(max-width:305px)]:px-0"
    >
      {copied ? <Check aria-hidden /> : <Copy aria-hidden />}
      {/* Icon only inside a narrow container; the label stays for screen readers. */}
      <span
        aria-live="polite"
        className="[@container(max-width:305px)]:sr-only"
      >
        {copied ? "Copied" : "Copy"}
      </span>
    </button>
  );
}
