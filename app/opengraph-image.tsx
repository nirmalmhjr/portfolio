import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site.config";

export const alt = `${siteConfig.name}, ${siteConfig.title}`;
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
        color: "#f7f8f8",
        backgroundColor: "#08090a",
        backgroundImage:
          "radial-gradient(circle at 12% 0%, rgba(251,191,36,0.38), transparent 45%), radial-gradient(circle at 95% 30%, rgba(251,113,133,0.3), transparent 40%)",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-0.04em" }}
        >
          NM
        </div>
        <div style={{ fontSize: 40, fontWeight: 800, color: "#fcd34d" }}>.</div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginLeft: 24,
            padding: "8px 18px",
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.16)",
            fontSize: 22,
            color: "#a7abb4",
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              backgroundColor: "#4ade9b",
            }}
          />
          {siteConfig.availability}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{ fontSize: 92, fontWeight: 700, letterSpacing: "-0.05em" }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 38,
            marginTop: 12,
            color: "#a7abb4",
          }}
        >
          Frontend Developer ·&nbsp;
          <span style={{ color: "#fcd34d" }}>Next.js &amp; TypeScript</span>
        </div>
        <div style={{ fontSize: 26, marginTop: 28, color: "#8a8f99" }}>
          {siteConfig.location}
        </div>
      </div>
    </div>,
    { ...size }
  );
}
