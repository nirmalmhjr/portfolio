"use client";

import { ChevronsLeftRight } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import {
  type ChangeEvent,
  type CSSProperties,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

/** The slider starts in the middle, showing half of each design. */
const START_POSITION = 50;
/** Show the nudge once most of the slider is on screen. */
const HINT_VISIBILITY_THRESHOLD = 0.6;

interface BeforeAfterProps {
  readonly after: StaticImageData;
  readonly afterAlt: string;
  readonly afterLabel?: string;
  readonly before: StaticImageData;
  readonly beforeAlt: string;
  /** Accessible name for the slider. */
  readonly label: string;
  readonly sizes: string;
}

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
}: BeforeAfterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(START_POSITION);
  const [hint, setHint] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!(el && "IntersectionObserver" in window)) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setHint(true);
          observer.disconnect();
        }
      },
      { threshold: HINT_VISIBILITY_THRESHOLD }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const stopHint = () => setHint(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHint(false);
    setPos(Number(e.target.value));
  };

  return (
    <div
      className={cn("ba", hint && "ba-hint")}
      onAnimationEnd={stopHint}
      ref={ref}
      style={{ "--pos": `${pos}%` } as CSSProperties}
    >
      <Image
        alt={afterAlt}
        className="pointer-events-none object-cover object-top"
        fill
        placeholder="blur"
        sizes={sizes}
        src={after}
      />
      <Image
        alt={beforeAlt}
        className="ba-before pointer-events-none object-cover object-top"
        fill
        placeholder="blur"
        sizes={sizes}
        src={before}
      />
      <span aria-hidden className="shot-hint">
        Hover to scroll ↓
      </span>
      <span className="ba-tag ba-tag-before">Before</span>
      <span className="ba-tag ba-tag-after">{afterLabel}</span>
      <span aria-hidden className="ba-line" />
      <input
        aria-label={label}
        aria-valuetext={`${pos}% old design`}
        className="ba-range"
        max={100}
        min={0}
        onChange={handleChange}
        onPointerDown={stopHint}
        type="range"
        value={pos}
      />
      <span aria-hidden className="ba-knob">
        <ChevronsLeftRight className="h-[18px] w-[18px]" strokeWidth={2.4} />
      </span>
    </div>
  );
}
