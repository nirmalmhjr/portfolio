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
        backgroundColor: "#08090a",
        backgroundImage:
          "radial-gradient(circle at 20% 10%, rgba(251,191,36,0.5), transparent 55%), radial-gradient(circle at 90% 90%, rgba(251,113,133,0.4), transparent 50%)",
        color: "#f7f8f8",
        fontSize: 76,
        fontWeight: 800,
        letterSpacing: "-0.04em",
      }}
    >
      NM<span style={{ color: "#fcd34d" }}>.</span>
    </div>,
    { ...size }
  );
}
