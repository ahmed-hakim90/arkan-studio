import { getSiteConfig } from "@/lib/content/settings";

export async function OrganizationJsonLd() {
  const site = await getSiteConfig();
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.legalName,
    alternateName: ["Arkan", "أركان"],
    url: site.url,
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cairo",
      addressCountry: "EG",
    },
    sameAs: [site.social.github, site.social.linkedin, site.social.x],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
