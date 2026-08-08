import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ApproachSpine } from "@/components/approach/ApproachSpine";
import { jsonLdScript, pageMetadata } from "@/lib/seo";
import { getSeoCopy } from "@/lib/seo-messages";
import { siteConfig } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string }>;
};

const stageIds = [
  "discover",
  "map",
  "design",
  "build",
  "integrate",
  "launch",
  "evolve",
] as const;

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getSeoCopy(locale, "Approach");
  return pageMetadata({
    locale,
    path: "/approach",
    title: seo.title,
    description: seo.description,
  });
}

export default async function ApproachPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Approach");

  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: t("title"),
    description: t("seoDescription"),
    inLanguage: locale === "ar" ? "ar" : "en",
    totalTime: "P8W",
    url: `${siteConfig.url}/${locale}/approach`,
    step: stageIds.map((stage, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: t(`stages.${stage}.title`),
      url: `${siteConfig.url}/${locale}/approach#approach-${stage}`,
      text: `${t(`stages.${stage}.lead`)} ${t(`stages.${stage}.body`)}`,
      itemListElement: [
        {
          "@type": "HowToDirection",
          text: `${t("input")}: ${t(`stages.${stage}.input`)}`,
        },
        {
          "@type": "HowToDirection",
          text: `${t("activity")}: ${t(`stages.${stage}.activity`)}`,
        },
        {
          "@type": "HowToDirection",
          text: `${t("output")}: ${t(`stages.${stage}.output`)}`,
        },
        {
          "@type": "HowToTip",
          text: `${t("gate")}: ${t(`stages.${stage}.gate`)}`,
        },
      ],
    })),
  };

  return (
    <section className="section-pad py-14 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(howTo)}
      />
      <div className="canvas">
        <div className="grid gap-8 border-b border-[var(--line)] pb-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="tech-label text-[11px] text-[var(--volt)]">
              {t("eyebrow")}
            </p>
            <h1 className="type-h1 mt-3 max-w-[14ch]">{t("title")}</h1>
          </div>
          <div className="lg:col-span-5">
            <p className="type-body-l text-[var(--muted)]">{t("subtitle")}</p>
            <p className="mt-4 text-base font-semibold text-[var(--ink)]">
              {t("lead")}
            </p>
            <p className="mt-3 text-base leading-relaxed text-[var(--muted)]">
              {t("body")}
            </p>
          </div>
        </div>
        <ApproachSpine />
      </div>
    </section>
  );
}
