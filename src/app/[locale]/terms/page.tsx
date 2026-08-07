import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";

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
    path: "/terms",
    title: t("termsTitle"),
    description: t("termsIntro"),
  });
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Legal");

  const sections = [
    { title: t("termsUseTitle"), body: t("termsUseBody") },
    { title: t("termsIpTitle"), body: t("termsIpBody") },
    { title: t("termsEngageTitle"), body: t("termsEngageBody") },
    { title: t("termsLiabilityTitle"), body: t("termsLiabilityBody") },
  ];

  return (
    <section className="section-pad py-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-4xl md:text-5xl">{t("termsTitle")}</h1>
        <p className="mt-6 text-[var(--muted)]">{t("termsIntro")}</p>
        <div className="mt-10 space-y-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="font-display text-2xl">{section.title}</h2>
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
