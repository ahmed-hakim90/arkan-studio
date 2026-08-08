import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SystemsAtlasLazy } from "@/components/atlas/SystemsAtlasLazy";
import { WorkItemListJsonLd } from "@/components/seo/ItemListJsonLd";
import { getProjects } from "@/lib/content/projects";
import { pageMetadata } from "@/lib/seo";
import { getSeoCopy } from "@/lib/seo-messages";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getSeoCopy(locale, "Atlas");
  return pageMetadata({
    locale,
    path: "/work",
    title: seo.title,
    description: seo.description,
  });
}

export default async function WorkPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Atlas");
  const projects = await getProjects();

  return (
    <section className="section-pad py-14 md:py-20">
      <WorkItemListJsonLd projects={projects} />
      <div className="canvas">
        <div className="grid gap-8 border-b border-[var(--line)] pb-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="tech-label text-[11px] text-[var(--volt)]">
              {t("eyebrow")}
            </p>
            <h1 className="font-display type-h1 mt-3 max-w-[12ch] md:text-5xl lg:text-6xl">
              {t("title")}
            </h1>
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
        <div className="mt-10">
          <SystemsAtlasLazy projects={projects} />
        </div>
      </div>
    </section>
  );
}
