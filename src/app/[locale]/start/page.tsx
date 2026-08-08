import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageSkeleton } from "@/components/loading/Skeleton";
import { BriefIntake } from "@/components/start/BriefIntake";
import { getProjects } from "@/lib/content/projects";
import { getSiteConfig } from "@/lib/content/settings";
import { pageMetadata } from "@/lib/seo";
import { getSeoCopy } from "@/lib/seo-messages";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getSeoCopy(locale, "Start");
  return pageMetadata({
    locale,
    path: "/start",
    title: seo.title,
    description: seo.description,
  });
}

export default async function StartPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Start");
  const [projects, site] = await Promise.all([getProjects(), getSiteConfig()]);

  return (
    <section className="section-pad py-12 md:py-16">
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
        <div className="mt-10">
          <Suspense fallback={<PageSkeleton />}>
            <BriefIntake
              projects={projects}
              whatsapp={site.whatsapp}
              contactEmail={site.email}
            />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
