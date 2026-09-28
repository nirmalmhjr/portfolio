import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon for iOS. */
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1a1b20",
        backgroundImage:
          "radial-gradient(circle at 20% 10%, rgba(124,131,255,0.55), transparent 55%), radial-gradient(circle at 90% 90%, rgba(192,132,252,0.45), transparent 50%)",
        color: "#eceef1",
        fontSize: 76,
        fontWeight: 800,
        letterSpacing: "-0.04em",
      }}
    >
      NM<span style={{ color: "#aeb3ff" }}>.</span>
    </div>,
    { ...size }
  );
}
