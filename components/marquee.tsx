const ITEMS = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Tailwind CSS",
  "PostgreSQL",
  "Design Systems",
  "Web Performance",
  "Accessibility",
  "Framer Motion",
];

function Track({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <ul
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-center"
    >
      {ITEMS.map((item, i) => (
        <li
          key={item}
          className="display flex items-center whitespace-nowrap px-6 text-[clamp(1.75rem,5vw,3.5rem)]"
        >
          <span className={i % 2 === 1 ? "text-outline" : undefined}>
            {item}
          </span>
          <span className="ml-12 text-accent">✳</span>
        </li>
      ))}
    </ul>
  );
}

export function Marquee() {
  return (
    <div className="full-bleed overflow-hidden border-y border-border bg-surface py-5">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
        <Track />
        <Track ariaHidden />
      </div>
    </div>
  );
}
