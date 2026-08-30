export function AvailableBadge({
  children = "Available for new projects",
}: {
  children?: React.ReactNode;
}) {
  return (
    <span className="text-muted inline-flex items-center gap-2.5 rounded-full border border-border bg-surface px-3 py-1 text-xs">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-accent" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
      </span>
      {children}
    </span>
  );
}
