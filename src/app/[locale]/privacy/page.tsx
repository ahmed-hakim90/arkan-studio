import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Legal" });
  return pageMetadata({
    locale,
    path: "/privacy",
    title: t("privacyTitle"),
    description: t("privacyIntro", { email: siteConfig.email }),
  });
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Legal");

  const sections = [
    { title: t("dataTitle"), body: t("dataBody") },
    {
      title: t("cookiesTitle"),
      body: `${t("cookiesBody")} ${t("cookiesCategories")}`,
    },
    { title: t("retentionTitle"), body: t("retentionBody") },
    { title: t("rightsTitle"), body: t("rightsBody") },
  ];

  return (
    <section className="section-pad py-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-4xl md:text-5xl">{t("privacyTitle")}</h1>
        <p className="mt-6 text-[var(--muted)]">
          {t("privacyIntro", { email: siteConfig.email })}
        </p>
        <div className="mt-10 space-y-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="font-display text-2xl text-[var(--fg)]">
                {section.title}
              </h2>
              <p className="mt-3 leading-relaxed text-[var(--muted)]">
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
