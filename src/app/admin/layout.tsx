import type { Metadata } from "next";
import { Figtree, Readex_Pro } from "next/font/google";
import "../globals.css";
import { AdminShell } from "./AdminShell";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const readex = Readex_Pro({
  subsets: ["arabic", "latin"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arkan Admin",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={`${figtree.variable} ${readex.variable} h-full`}>
      <body className="min-h-full bg-[var(--bg)] text-[var(--fg)] antialiased">
        <AdminShell>{children}</AdminShell>
      </body>
    </html>
  );
}
