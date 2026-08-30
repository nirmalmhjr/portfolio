const ITEMS = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Tailwind CSS",
  "PostgreSQL",
  "Design systems",
  "Web performance",
  "Accessibility",
  "GraphQL",
];

function Track({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <ul
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-center gap-12 pr-12"
    >
      {ITEMS.map((item) => (
        <li
          key={item}
          className="flex items-center gap-12 whitespace-nowrap font-mono text-sm uppercase tracking-[0.1em]"
        >
          {item}
          <span className="text-accent">✦</span>
        </li>
      ))}
    </ul>
  );
}

export function Marquee() {
  return (
    <div className="-mx-5 overflow-hidden border-y border-border bg-surface py-4 sm:-mx-8">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
        <Track />
        <Track ariaHidden />
      </div>
    </div>
  );
}
