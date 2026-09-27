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
      className="inline-flex h-8 flex-none items-center gap-1.5 rounded-full border border-line-strong px-3 text-[13px] font-medium text-fg transition-colors hover:bg-raised [&_svg]:h-3.5 [&_svg]:w-3.5"
    >
      {copied ? <Check aria-hidden /> : <Copy aria-hidden />}
      <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}
