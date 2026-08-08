import { getLocale, getTranslations } from "next-intl/server";
import { getSiteConfig } from "@/lib/content/settings";
import { jsonLdScript } from "@/lib/seo";
import type { LocaleKey } from "@/lib/site";

type Props = {
  path?: string;
  title: string;
  description: string;
};

export async function WebPageJsonLd({
  path = "",
  title,
  description,
}: Props) {
  const site = await getSiteConfig();
  const locale = (await getLocale()) as LocaleKey;
  const normalized = path === "/" ? "" : path;
  const url = `${site.url}/${locale}${normalized}`;

  const data = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: locale === "ar" ? "ar-EG" : "en-US",
    isPartOf: { "@id": `${site.url}/#website` },
    about: { "@id": `${site.url}/#organization` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${site.url}/${locale}/opengraph-image`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={jsonLdScript(data)}
    />
  );
}

export async function HomeWebPageJsonLd() {
  const t = await getTranslations("Meta");
  return (
    <WebPageJsonLd
      path=""
      title={t("seoTitle")}
      description={t("seoDescription")}
    />
  );
}
