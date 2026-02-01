import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 14,
          background: "#00D1FF",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 6,
          color: "#000",
          fontWeight: 900,
          fontFamily: "system-ui, sans-serif",
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
