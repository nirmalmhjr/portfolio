import { siteConfig } from "@/lib/site.config";
import { cn } from "@/lib/utils";

export function PulseDot() {
  return (
    <span aria-hidden className="relative h-2 w-2 flex-none rounded-full bg-ok">
      <span className="absolute inset-0 animate-ping rounded-full bg-ok" />
    </span>
  );
}

export function AvailableBadge({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        "inline-flex flex-wrap items-center gap-2.5 rounded-full border border-line bg-surface/70 py-1.5 pl-2.5 pr-3.5 text-[13px] text-muted",
        className
      )}
    >
      <PulseDot />
      <strong className="font-medium text-fg">{siteConfig.availability}</strong>
      <span>{siteConfig.location}</span>
    </p>
  );
}
