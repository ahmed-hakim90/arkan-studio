import { getLocale, getTranslations } from "next-intl/server";
import type { Project } from "@/content/types";
import { getSiteConfig } from "@/lib/content/settings";
import { jsonLdScript } from "@/lib/seo";
import type { LocaleKey } from "@/lib/site";

type Props = {
  projects: Project[];
};

export async function WorkItemListJsonLd({ projects }: Props) {
  const site = await getSiteConfig();
  const locale = (await getLocale()) as LocaleKey;
  const t = await getTranslations({ locale, namespace: "Atlas" });
  const pageUrl = `${site.url}/${locale}/work`;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: t("seoTitle"),
        description: t("seoDescription"),
        inLanguage: locale === "ar" ? "ar-EG" : "en-US",
        isPartOf: { "@id": `${site.url}/#website` },
        mainEntity: { "@id": `${pageUrl}#itemlist` },
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#itemlist`,
        name: t("title"),
        numberOfItems: projects.length,
        itemListElement: projects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${site.url}/${locale}/work/${project.slug}`,
          name: project.title[locale],
          description: project.summary[locale],
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={jsonLdScript(data)}
    />
  );
}
