import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site.config";

export const runtime = "edge";
export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background: "#0a0a0a",
        color: "#fafafa",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ fontSize: 64, fontWeight: 700 }}>{siteConfig.name}</div>
      <div style={{ fontSize: 32, color: "#a1a1aa", marginTop: 16 }}>
        {siteConfig.title}
      </div>
      <div
        style={{ fontSize: 24, color: "#a1a1aa", marginTop: 40, maxWidth: 900 }}
      >
        {siteConfig.description}
      </div>
    </div>,
    { ...size }
  );
}
