import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site.config";

export const runtime = "edge";
export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  const [first, ...rest] = siteConfig.name.split(" ");
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px",
        background: "#f2efe8",
        color: "#181613",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 20,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#7c7263",
        }}
      >
        <span>{siteConfig.role}</span>
        <span>Portfolio</span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontWeight: 700,
          fontSize: 150,
          lineHeight: 0.86,
          letterSpacing: "-0.05em",
          textTransform: "uppercase",
        }}
      >
        <span>{first}</span>
        <span style={{ color: "#7c7263" }}>{rest.join(" ")}</span>
      </div>

      <div
        style={{
          borderTop: "1px solid #cfc7b8",
          paddingTop: 20,
          fontSize: 24,
          color: "#4d453a",
          maxWidth: 940,
        }}
      >
        {siteConfig.description}
      </div>
    </div>,
    { ...size }
  );
}
