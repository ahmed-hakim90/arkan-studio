import type { Metadata } from "next";
import { siteConfig, type LocaleKey } from "@/lib/site";

const OG_LOCALE: Record<LocaleKey, string> = {
  ar: "ar_EG",
  en: "en_US",
};

function asLocale(locale: string): LocaleKey {
  return locale === "en" ? "en" : "ar";
}

/** Clamp meta description to a safe SERP length without cutting mid-word hard. */
export function clampDescription(text: string, max = 160): string {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (cleaned.length <= max) return cleaned;
  const sliced = cleaned.slice(0, max - 1);
  const boundary = sliced.lastIndexOf(" ");
  return `${(boundary > 80 ? sliced.slice(0, boundary) : sliced).trimEnd()}…`;
}

/** Path without locale prefix, e.g. "", "/work", "/work/nexora-erp" */
export function pageAlternates(locale: string, path = "") {
  const normalized = path === "/" ? "" : path;
  const languages = {
    ar: `${siteConfig.url}/ar${normalized}`,
    en: `${siteConfig.url}/en${normalized}`,
    "x-default": `${siteConfig.url}/ar${normalized}`,
  };

  return {
    canonical: `${siteConfig.url}/${locale}${normalized}`,
    languages,
  };
}

function sanitizeTitle(title: string, locale: string): string {
  // Guards against next-intl missing-message fallbacks like "Meta.seoTitle"
  if (!title || /^[A-Za-z]+\.[A-Za-z]+$/.test(title)) {
    return locale === "ar" ? "أركان" : "Arkan";
  }
  return title;
}

export function pageMetadata(options: {
  locale: string;
  path?: string;
  title: string;
  description?: string;
  type?: "website" | "article";
  /** When false, Next.js title.template from the layout is applied. Default true (SEO titles are already branded). */
  absoluteTitle?: boolean;
  noIndex?: boolean;
  images?: string[];
}): Metadata {
  const loc = asLocale(options.locale);
  const path = options.path ?? "";
  const alternates = pageAlternates(options.locale, path);
  const url = alternates.canonical;
  const title = sanitizeTitle(options.title, options.locale);
  const description = options.description
    ? clampDescription(options.description)
    : undefined;
  const absoluteTitle = options.absoluteTitle ?? true;
  const ogLocale = OG_LOCALE[loc];
  const alternateLocale = loc === "ar" ? ["en_US"] : ["ar_EG"];

  const images =
    options.images?.map((image) => ({
      url: image,
      width: 1200,
      height: 630,
      alt: title,
    })) ?? undefined;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates,
    robots: options.noIndex
      ? { index: false, follow: false }
      : {
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
    openGraph: {
      title,
      description,
      url,
      type: options.type ?? "website",
      siteName: siteConfig.legalName,
      locale: ogLocale,
      alternateLocale,
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(images ? { images: images.map((image) => image.url) } : {}),
    },
  };
}

export function projectSeoTitle(
  projectTitle: string,
  locale: string,
): string {
  const loc = asLocale(locale);
  return loc === "ar"
    ? `${projectTitle} | نظام رقمي | أركان`
    : `${projectTitle} | Digital System | Arkan`;
}

export function jsonLdScript(data: Record<string, unknown> | Record<string, unknown>[]) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}
