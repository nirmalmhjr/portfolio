"use client";

import { useEffect, useState } from "react";

const format = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Kathmandu",
  hour: "numeric",
  minute: "2-digit",
});

/** Current time in Kathmandu (UTC+5:45), updated every 20 seconds. */
export function KathmanduClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(format.format(new Date()));
    tick();
    const id = window.setInterval(tick, 20_000);
    return () => window.clearInterval(id);
  }, []);

  return <span className="tabular-nums">{time ?? "--:--"}</span>;
}
