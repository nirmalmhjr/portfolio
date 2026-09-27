/**
 * Masked grid plus two slowly drifting accent glows, fading out toward the
 * bottom. Place inside an `isolate` parent.
 */
export function GlowBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden [-webkit-mask-image:linear-gradient(to_bottom,#000_45%,transparent)] [mask-image:linear-gradient(to_bottom,#000_45%,transparent)]"
    >
      <div className="grid-backdrop" />
      <div className="orb -left-36 -top-40 h-[300px] w-[320px] animate-drift bg-a1 sm:h-[420px] sm:w-[520px]" />
      <div className="orb -right-16 top-16 h-[260px] w-[260px] animate-drift bg-a2 opacity-[calc(var(--glow)*0.8)] [animation-delay:-8s] sm:h-[420px] sm:w-[460px]" />
    </div>
  );
}
