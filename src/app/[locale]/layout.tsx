import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import {
  IBM_Plex_Mono,
  IBM_Plex_Sans_Arabic,
  Manrope,
  Syne,
} from "next/font/google";
import { SkipLink } from "@/components/a11y/SkipLink";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { AppShell } from "@/components/providers/AppShell";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import { routing, type AppLocale } from "@/i18n/routing";
import { clampDescription } from "@/lib/seo";
import { getSeoCopy } from "@/lib/seo-messages";
import { siteConfig } from "@/lib/site";
import { SPLASH_BOOT_SCRIPT } from "@/lib/splash";
import "../globals.css";

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

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f5f8" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1220" },
  ],
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as AppLocale;
  const seo = await getSeoCopy(locale, "Meta");
  const description = clampDescription(seo.description);

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: seo.title,
      template: `%s · ${siteConfig.name[loc]}`,
    },
    description,
    applicationName: siteConfig.legalName,
    authors: [{ name: siteConfig.legalName }],
    creator: siteConfig.legalName,
    publisher: siteConfig.legalName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title: seo.title,
      description,
      url: `${siteConfig.url}/${loc}`,
      siteName: siteConfig.legalName,
      locale: loc === "ar" ? "ar_EG" : "en_US",
      alternateLocale: loc === "ar" ? ["en_US"] : ["ar_EG"],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    alternates: {
      canonical: `${siteConfig.url}/${loc}`,
      languages: {
        ar: `${siteConfig.url}/ar`,
        en: `${siteConfig.url}/en`,
        "x-default": `${siteConfig.url}/ar`,
      },
    },
    icons: {
      icon: [{ url: "/icon-192.png", sizes: "192x192", type: "image/png" }],
      apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
    },
    manifest: "/manifest.webmanifest",
    category: "technology",
    keywords: [
      loc === "ar" ? "أنظمة رقمية" : "digital systems",
      loc === "ar" ? "بناء منتجات" : "product engineering",
      loc === "ar" ? "منصات تشغيل" : "operations platforms",
      "ERP",
      "SaaS",
      loc === "ar" ? "أركان" : "Arkan",
    ],
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${syne.variable} ${manrope.variable} ${arabic.variable} ${plexMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background text-foreground antialiased">
        {/* Sync boot: set cover attr before site-shell parses (no home flash). */}
        <script
          id="arkan-splash-boot"
          dangerouslySetInnerHTML={{ __html: SPLASH_BOOT_SCRIPT }}
        />
        <NextIntlClientProvider messages={messages}>
          <AppShell>
            <OrganizationJsonLd />
            <SkipLink />
            <div className="site-shell flex min-h-full flex-col">
              <Header />
              <main id="main-content" className="flex-1" tabIndex={-1}>
                {children}
              </main>
              <Footer />
            </div>
          </AppShell>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
