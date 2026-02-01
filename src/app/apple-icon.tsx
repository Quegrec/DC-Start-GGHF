import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 72,
          background: "linear-gradient(135deg, #00D1FF 0%, #0099CC 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 40,
          color: "#000",
          fontWeight: 900,
          fontFamily: "system-ui, sans-serif",
          boxShadow: "0 8px 32px rgba(0, 209, 255, 0.3)",
        }}
      >
        GG
      </div>
    ),
    {
      ...size,
    }
  );
}
