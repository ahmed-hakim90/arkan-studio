import type { ReactNode } from "react";
import "../globals.css";

/**
 * Root layout for non-locale routes (e.g. `/` → locale redirect).
 * Next.js 16.3+: a pass-through `app/layout.tsx` is no longer allowed;
 * each top-level tree must provide its own `<html>` / `<body>`.
 */
export default function UnlocalizedRootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className="min-h-full bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
