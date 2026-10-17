import { ImageResponse } from "next/og";

export const size = { height: 180, width: 180 };
export const contentType = "image/png";

/** Home-screen icon for iOS. */
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        backgroundColor: "#08090a",
        backgroundImage:
          "radial-gradient(circle at 20% 10%, rgba(251,191,36,0.5), transparent 55%), radial-gradient(circle at 90% 90%, rgba(251,113,133,0.4), transparent 50%)",
        color: "#f7f8f8",
        display: "flex",
        fontSize: 76,
        fontWeight: 800,
        height: "100%",
        justifyContent: "center",
        letterSpacing: "-0.04em",
        width: "100%",
      }}
    >
      NM<span style={{ color: "#fcd34d" }}>.</span>
    </div>,
    { ...size }
  );
}
