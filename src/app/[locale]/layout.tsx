import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { SkipLink } from "@/components/a11y/SkipLink";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { AppShell } from "@/components/providers/AppShell";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import { routing, type AppLocale } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";
import "../globals.css";

const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
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
    { media: "(prefers-color-scheme: dark)", color: "#0b1f3a" },
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
  const t = await getTranslations({ locale, namespace: "Meta" });
  const loc = locale as AppLocale;

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: t("title"),
      template: `%s · ${siteConfig.name[loc]}`,
    },
    description: t("description"),
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
      title: t("title"),
      description: t("description"),
      url: `${siteConfig.url}/${loc}`,
      siteName: siteConfig.legalName,
      locale: loc === "ar" ? "ar_EG" : "en_US",
      alternateLocale: loc === "ar" ? ["en_US"] : ["ar_EG"],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
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
      className={`${GeistSans.variable} ${GeistMono.variable} ${arabic.variable} h-full`}
    >
      <body className="min-h-full bg-background text-foreground antialiased">
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
