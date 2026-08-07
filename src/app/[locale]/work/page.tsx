import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SystemsAtlas } from "@/components/atlas/SystemsAtlas";
import { getProjects } from "@/lib/content/projects";
import { pageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Atlas" });
  return pageMetadata({
    locale,
    path: "/work",
    title: t("title"),
    description: t("subtitle"),
  });
}

export default async function WorkPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Atlas");
  const projects = await getProjects();

  return (
    <section className="section-pad py-12 md:py-16">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--signal)]">
          {t("eyebrow")}
        </p>
        <h1 className="font-display mt-3 text-5xl md:text-6xl">{t("title")}</h1>
        <p className="mt-3 max-w-2xl text-[var(--muted)]">{t("subtitle")}</p>
        <div className="mt-10">
          <SystemsAtlas projects={projects} />
        </div>
      </div>
    </section>
  );
}
