import { Lock } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BrowserFrameProps {
  readonly children: ReactNode;
  readonly className?: string;
  /** Shows a padlock before the address. */
  readonly secure?: boolean;
  readonly url: string;
}

/** Minimal browser window: traffic lights, an address bar, then the content. */
export function BrowserFrame({
  url,
  secure = true,
  className,
  children,
}: BrowserFrameProps) {
  return (
    <div className={cn("browser", className)}>
      <div className="browser-bar">
        <span aria-hidden className="browser-lights">
          <i />
          <i />
          <i />
        </span>
        <span className="browser-url">
          {secure ? (
            <Lock
              aria-hidden
              className="h-2.5 w-2.5 flex-none opacity-70"
              strokeWidth={2.5}
            />
          ) : null}
          <span className="truncate">{url}</span>
        </span>
      </div>
      {children}
    </div>
  );
}
