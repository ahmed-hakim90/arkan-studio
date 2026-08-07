import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

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

export function pageMetadata(options: {
  locale: string;
  path?: string;
  title: string;
  description?: string;
  type?: "website" | "article";
}): Metadata {
  const path = options.path ?? "";
  const alternates = pageAlternates(options.locale, path);
  const url = alternates.canonical;

  return {
    title: options.title,
    description: options.description,
    alternates,
    openGraph: {
      title: options.title,
      description: options.description,
      url,
      type: options.type ?? "website",
      siteName: siteConfig.legalName,
    },
    twitter: {
      card: "summary_large_image",
      title: options.title,
      description: options.description,
    },
  };
}
