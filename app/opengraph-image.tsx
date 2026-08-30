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
        justifyContent: "space-between",
        padding: "72px",
        background: "#f7f4ef",
        color: "#1f1b17",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontSize: 22,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#8a7f72",
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            background: "#1f1b17",
            color: "#f7f4ef",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
          }}
        >
          {siteConfig.name
            .split(" ")
            .map((w) => w[0])
            .join("")
            .slice(0, 2)}
        </div>
        {siteConfig.title}
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 88, lineHeight: 1 }}>
          {siteConfig.name.split(" ")[0]}{" "}
          <span style={{ color: "#e0491f", fontStyle: "italic" }}>
            {siteConfig.name.split(" ").slice(1).join(" ")}
          </span>
        </div>
        <div
          style={{
            fontSize: 26,
            color: "#6f6455",
            marginTop: 24,
            maxWidth: 920,
          }}
        >
          {siteConfig.description}
        </div>
      </div>
    </div>,
    { ...size }
  );
}
