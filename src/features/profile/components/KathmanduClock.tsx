"use client";

import { useEffect, useState } from "react";
import { SITE_CONFIG } from "@/configs/site";

const CLOCK_TICK_MS = 20_000;
/** Shown before hydration, so server and client markup match. */
const CLOCK_FALLBACK = "--:--";

const TIME_FORMAT = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  timeZone: SITE_CONFIG.timeZoneId,
});

/** Current time in Kathmandu (UTC+5:45), updated every 20 seconds. */
export function KathmanduClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(TIME_FORMAT.format(new Date()));
    tick();
    const id = window.setInterval(tick, CLOCK_TICK_MS);
    return () => window.clearInterval(id);
  }, []);

  return <span className="tabular-nums">{time ?? CLOCK_FALLBACK}</span>;
}
