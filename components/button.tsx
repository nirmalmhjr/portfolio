import { cn } from "@/lib/utils";

const base =
  "inline-flex h-[46px] items-center gap-2 rounded-full px-5 text-[15px] font-medium transition duration-200 [&_svg]:h-4 [&_svg]:w-4";

const variants = {
  primary:
    "bg-fg text-canvas hover:-translate-y-px hover:shadow-[0_8px_30px_rgb(var(--a1)/0.35)]",
  ghost: "border border-line-strong bg-surface/60 text-fg hover:bg-raised",
} as const;

/** Class names for a pill button; use on <a>, <Link> or <button>. */
export function buttonClass(
  variant: keyof typeof variants = "primary",
  className?: string
): string {
  return cn(base, variants[variant], className);
}

/** Round icon-only link or button. */
export const iconButtonClass =
  "grid h-[38px] w-[38px] flex-none place-items-center rounded-full border border-line text-fg transition-colors hover:bg-raised [&_svg]:h-4 [&_svg]:w-4";
