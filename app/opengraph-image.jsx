import { ImageResponse } from "next/og";

// Social preview card (og:image + twitter:image), generated at build time
// from the design system: navy, signature gradients, one raspberry accent.
export const alt = "The Travel Nurse Guide - Know what you're worth before you sign.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const FONT_URL =
  "https://fonts.gstatic.com/s/spacegrotesk/v22/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj4PVksj.ttf";

export default async function OgImage() {
  const font = await fetch(FONT_URL).then((r) => r.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundColor: "#1B2A4A",
          backgroundImage:
            "radial-gradient(900px 520px at 88% -12%, rgba(101,191,190,.24), transparent 62%), radial-gradient(760px 420px at -2% 118%, rgba(214,51,108,.18), transparent 62%)",
          color: "#fff",
          fontFamily: "Space Grotesk",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 999,
              border: "11px solid #65BFBE",
              borderTopColor: "#7DE9E8",
              display: "flex",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 26, letterSpacing: 4, display: "flex" }}>THE TRAVEL NURSE</div>
            <div style={{ fontSize: 17, letterSpacing: 7, color: "#7DE9E8", display: "flex" }}>GUIDE</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ fontSize: 74, lineHeight: 1.06, letterSpacing: -2, display: "flex" }}>
            Know what you&apos;re
          </div>
          <div style={{ fontSize: 74, lineHeight: 1.06, letterSpacing: -2, display: "flex", gap: 20 }}>
            <span
              style={{
                backgroundImage: "linear-gradient(105deg, #D6336C 0%, #FF87B0 48%, #D6336C 96%)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              worth
            </span>
            <span>before you sign.</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 25, color: "#C8CDCE" }}>
          <span>Pay</span>
          <div style={{ width: 7, height: 7, borderRadius: 99, backgroundColor: "#65BFBE", display: "flex" }} />
          <span>Contracts</span>
          <div style={{ width: 7, height: 7, borderRadius: 99, backgroundColor: "#65BFBE", display: "flex" }} />
          <span>Taxes</span>
          <div style={{ width: 7, height: 7, borderRadius: 99, backgroundColor: "#65BFBE", display: "flex" }} />
          <span>Housing</span>
          <div style={{ width: 7, height: 7, borderRadius: 99, backgroundColor: "#65BFBE", display: "flex" }} />
          <span style={{ color: "#7DE9E8" }}>37,000+ nurses strong</span>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Space Grotesk", data: font, weight: 700, style: "normal" }] }
  );
}
