import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site.config";

export const alt = `${siteConfig.name}, ${siteConfig.title}`;
export const size = { height: 630, width: 1200 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        backgroundColor: "#08090a",
        backgroundImage:
          "radial-gradient(circle at 12% 0%, rgba(251,191,36,0.38), transparent 45%), radial-gradient(circle at 95% 30%, rgba(251,113,133,0.3), transparent 40%)",
        color: "#f7f8f8",
        display: "flex",
        flexDirection: "column",
        fontFamily: "sans-serif",
        height: "100%",
        justifyContent: "space-between",
        padding: "72px",
        width: "100%",
      }}
    >
      <div style={{ alignItems: "center", display: "flex", gap: 14 }}>
        <div
          style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-0.04em" }}
        >
          NM
        </div>
        <div style={{ color: "#fcd34d", fontSize: 40, fontWeight: 800 }}>.</div>
        <div
          style={{
            alignItems: "center",
            border: "1px solid rgba(255,255,255,0.16)",
            borderRadius: 999,
            color: "#a7abb4",
            display: "flex",
            fontSize: 22,
            gap: 10,
            marginLeft: 24,
            padding: "8px 18px",
          }}
        >
          <div
            style={{
              backgroundColor: "#4ade9b",
              borderRadius: 999,
              height: 12,
              width: 12,
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
            color: "#a7abb4",
            display: "flex",
            fontSize: 38,
            marginTop: 12,
          }}
        >
          Frontend Developer ·&nbsp;
          <span style={{ color: "#fcd34d" }}>Next.js &amp; TypeScript</span>
        </div>
        <div style={{ color: "#8a8f99", fontSize: 26, marginTop: 28 }}>
          {siteConfig.location}
        </div>
      </div>
    </div>,
    { ...size }
  );
}
