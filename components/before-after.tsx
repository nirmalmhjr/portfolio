"use client";

import Image, { type StaticImageData } from "next/image";
import { ChevronsLeftRight } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * Drag (or use the arrow keys) to compare an old design with the redesign.
 * The first time it scrolls into view, the handle nudges to show it can move.
 * Both images are full-page screenshots; hovering the card scrolls them
 * down together (see .ba img in globals.css).
 */
export function BeforeAfter({
  before,
  after,
  beforeAlt,
  afterAlt,
  afterLabel = "After",
  label,
  sizes,
}: {
  before: StaticImageData;
  after: StaticImageData;
  beforeAlt: string;
  afterAlt: string;
  afterLabel?: string;
  /** Accessible name for the slider. */
  label: string;
  sizes: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const [hint, setHint] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setHint(true);
          observer.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("ba", hint && "ba-hint")}
      style={{ "--pos": `${pos}%` } as CSSProperties}
      onAnimationEnd={() => setHint(false)}
    >
      <Image
        src={after}
        alt={afterAlt}
        fill
        sizes={sizes}
        placeholder="blur"
        className="pointer-events-none object-cover object-top"
      />
      <Image
        src={before}
        alt={beforeAlt}
        fill
        sizes={sizes}
        placeholder="blur"
        className="ba-before pointer-events-none object-cover object-top"
      />
      <span aria-hidden className="shot-hint">
        Hover to scroll ↓
      </span>
      <span className="ba-tag ba-tag-before">Before</span>
      <span className="ba-tag ba-tag-after">{afterLabel}</span>
      <span aria-hidden className="ba-line" />
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        aria-label={label}
        aria-valuetext={`${pos}% old design`}
        className="ba-range"
        onPointerDown={() => setHint(false)}
        onChange={(e) => {
          setHint(false);
          setPos(Number(e.target.value));
        }}
      />
      <span aria-hidden className="ba-knob">
        <ChevronsLeftRight className="h-[18px] w-[18px]" strokeWidth={2.4} />
      </span>
    </div>
  );
}
