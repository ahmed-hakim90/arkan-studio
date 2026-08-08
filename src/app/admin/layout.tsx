import type { Metadata, Viewport } from "next";
import {
  IBM_Plex_Mono,
  IBM_Plex_Sans_Arabic,
  Manrope,
  Syne,
} from "next/font/google";
import "../globals.css";
import "./admin.css";
import { createClient } from "@/lib/supabase/server";
import { AdminShell } from "./AdminShell";

const syne = Syne({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Arkan Control",
    template: "%s · Arkan Control",
  },
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

export const viewport: Viewport = {
  themeColor: "#0b1220",
  width: "device-width",
  initialScale: 1,
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let userEmail: string | null = null;
  let newLeads = 0;

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    userEmail = user?.email ?? null;

    if (user) {
      const { data: admin } = await supabase
        .from("admin_users")
        .select("user_id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (admin) {
        const { count } = await supabase
          .from("leads")
          .select("id", { count: "exact", head: true })
          .eq("status", "new");
        newLeads = count ?? 0;
      }
    }
  } catch {
    // Page-level requireAdmin remains the authority for protected routes.
  }

  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${syne.variable} ${manrope.variable} ${arabic.variable} ${plexMono.variable} h-full`}
    >
      <body className="min-h-full antialiased">
        <AdminShell userEmail={userEmail} newLeads={newLeads}>
          {children}
        </AdminShell>
      </body>
    </html>
  );
}
