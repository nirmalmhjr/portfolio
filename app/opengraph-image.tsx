import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site.config";

export const runtime = "edge";
export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  const initials = siteConfig.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px",
        background: "#fdfcfb",
        color: "#2a2a33",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 20,
            background: "#efeafe",
            color: "#6d4aff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 30,
            fontWeight: 700,
          }}
        >
          {initials}
        </div>
        <span style={{ fontSize: 24, color: "#6b6b78" }}>
          {siteConfig.title}
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{ fontSize: 76, fontWeight: 700, letterSpacing: "-0.03em" }}
        >
          Hey, I&apos;m {siteConfig.name.split(" ")[0]} 👋
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#6b6b78",
            marginTop: 20,
            maxWidth: 940,
            lineHeight: 1.4,
          }}
        >
          {siteConfig.description}
        </div>
      </div>
    </div>,
    { ...size }
  );
}
