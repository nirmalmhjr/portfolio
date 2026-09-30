import { siteConfig } from "@/lib/site.config";
import { cn } from "@/lib/utils";

type Kind = "kw" | "type" | "id" | "key" | "str" | "p";

const tone: Record<Kind, string> = {
  kw: "text-ink",
  type: "text-info",
  id: "text-fg",
  key: "text-fg/90",
  str: "text-[rgb(var(--g2))]",
  p: "text-faint",
};

type Line = { tokens: [Kind, string][]; highlight?: boolean };

const ind = (n: number): [Kind, string] => ["p", "  ".repeat(n)];
const field = (key: string, value: [Kind, string]): Line => ({
  tokens: [ind(1), ["key", key], ["p", ": "], value, ["p", ","]],
});

const lines: Line[] = [
  {
    tokens: [
      ["kw", "const "],
      ["id", "nirmal"],
      ["p", ": "],
      ["type", "Developer"],
      ["p", " = {"],
    ],
  },
  field("role", ["str", `"${siteConfig.title}"`]),
  field("location", ["str", `"${siteConfig.location}"`]),
  { tokens: [ind(1), ["key", "builds"], ["p", ": ["]] },
  { tokens: [ind(2), ["str", '"Company websites"'], ["p", ","]] },
  { tokens: [ind(2), ["str", '"Landing pages"'], ["p", ","]] },
  { tokens: [ind(2), ["str", '"CMS dashboards"'], ["p", ","]] },
  { tokens: [ind(1), ["p", "],"]] },
  field("previously", ["str", '"Finance & sales"']),
  { ...field("openToWork", ["kw", "true"]), highlight: true },
  { tokens: [["p", "};"]] },
  { tokens: [] },
  {
    tokens: [
      ["kw", "export default "],
      ["id", "nirmal"],
      ["p", ";"],
    ],
  },
];

/**
 * The hero visual: a small editor window with a typed profile object. It
 * repeats what the hero text already says, so it's hidden from screen readers.
 * Type and spacing scale with the card's width (cqi), so lines never wrap.
 */
export function ProfileCode({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "overflow-hidden rounded-[22px] bg-surface [container-type:inline-size]",
        className
      )}
    >
      <div className="flex h-11 items-center gap-4 border-b border-line bg-raised/60 px-4">
        <span className="browser-lights">
          <i />
          <i />
          <i />
        </span>
        {/* On narrow phones the hero's clock chip sits here, so drop the tab. */}
        <span className="flex items-center gap-1.5 font-mono text-[11px] text-muted [@container(max-width:309px)]:hidden">
          <span className="rounded-[3px] bg-info/15 px-1 py-px text-[9px] font-semibold text-info">
            TS
          </span>
          nirmal.ts
        </span>
      </div>
      <pre className="profile-code bg-[radial-gradient(110%_70%_at_100%_0%,rgb(var(--a1)/0.07),transparent_65%)] pb-[3.6em] pt-[1.3em] font-mono text-muted">
        {lines.map((line, i) => (
          <span
            key={i}
            className={cn(
              "flex pr-[1.2em]",
              line.highlight && "bg-a1/10 shadow-[inset_2px_0_0_rgb(var(--a1))]"
            )}
          >
            <span className="w-[4.8ch] flex-none select-none pr-[1.4ch] text-right text-faint/60">
              {i + 1}
            </span>
            <span className="whitespace-pre">
              {line.tokens.map(([kind, text], j) => (
                <span key={j} className={tone[kind]}>
                  {text}
                </span>
              ))}
            </span>
          </span>
        ))}
      </pre>
    </div>
  );
}
