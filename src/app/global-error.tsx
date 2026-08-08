"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#0b1220",
          color: "#fff",
          fontFamily: "system-ui, sans-serif",
          padding: "2rem",
        }}
      >
        <div style={{ maxWidth: 420, textAlign: "center" }}>
          <p style={{ color: "#3b82f6", letterSpacing: "0.2em", fontSize: 12 }}>
            ERROR
          </p>
          <h1 style={{ fontSize: 32, margin: "12px 0" }}>Something went wrong</h1>
          <p style={{ color: "rgba(255,255,255,0.65)", marginBottom: 24 }}>
            The page could not be loaded. Please try again.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              background: "#155eef",
              color: "#fff",
              border: 0,
              borderRadius: 4,
              padding: "12px 20px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
