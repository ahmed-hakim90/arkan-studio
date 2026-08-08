import { getLocale, getTranslations } from "next-intl/server";
import { getSiteConfig } from "@/lib/content/settings";
import { jsonLdScript } from "@/lib/seo";
import type { LocaleKey } from "@/lib/site";

export async function OrganizationJsonLd() {
  const site = await getSiteConfig();
  const locale = (await getLocale()) as LocaleKey;
  const t = await getTranslations({ locale, namespace: "Meta" });

  const organization = {
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.legalName,
    alternateName: ["Arkan", "أركان", "ARKAN"],
    url: site.url,
    email: site.email,
    telephone: site.phone,
    description: site.description[locale],
    foundingLocation: {
      "@type": "Place",
      name: site.location[locale],
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cairo",
      addressCountry: "EG",
    },
    areaServed: [
      { "@type": "Country", name: "Egypt" },
      { "@type": "Country", name: "Saudi Arabia" },
    ],
    sameAs: [site.social.github, site.social.linkedin, site.social.x].filter(
      Boolean,
    ),
    logo: {
      "@type": "ImageObject",
      url: `${site.url}/icon-512.png`,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: site.email,
        telephone: site.phone,
        availableLanguage: ["ar", "en"],
      },
    ],
  };

  const website = {
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name[locale],
    alternateName: site.legalName,
    description: t("seoDescription"),
    inLanguage: locale === "ar" ? ["ar-EG", "en-US"] : ["en-US", "ar-EG"],
    publisher: { "@id": `${site.url}/#organization` },
  };

  const professionalService = {
    "@type": "ProfessionalService",
    "@id": `${site.url}/#service`,
    name: site.legalName,
    url: site.url,
    image: `${site.url}/icon-512.png`,
    description: site.description[locale],
    provider: { "@id": `${site.url}/#organization` },
    areaServed: organization.areaServed,
    availableLanguage: ["Arabic", "English"],
    serviceType: [
      "Digital systems design",
      "Product engineering",
      "Operations platforms",
      "Commerce systems",
      "AI workflow integration",
    ],
  };

  const data = {
    "@context": "https://schema.org",
    "@graph": [organization, website, professionalService],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={jsonLdScript(data)}
    />
  );
}
