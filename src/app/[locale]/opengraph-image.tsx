import { ImageResponse } from "next/og";

export const alt = "Arkan / أركان — Digital Systems Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isAr = locale === "ar";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 72,
          background: "#0b1f3a",
          color: "#ffffff",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(700px 380px at 20% 20%, rgba(215,4,42,0.45), transparent 55%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 72,
            left: 72,
            width: 72,
            height: 6,
            background: "#d7042a",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 96, fontWeight: 500, letterSpacing: -3 }}>
            {isAr ? "أركان" : "Arkan"}
          </div>
          <div style={{ fontSize: 34, color: "rgba(255,255,255,0.72)", maxWidth: 820 }}>
            {isAr
              ? "نبني أنظمة تشغّل شغلك"
              : "We build systems that run the business"}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
