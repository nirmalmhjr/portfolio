export function AvailableBadge({
  children = "Available for work",
}: {
  children?: React.ReactNode;
}) {
  return (
    <span className="text-muted inline-flex items-center gap-2.5 border border-border px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-widest">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-accent" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
      </span>
      {children}
    </span>
  );
}
