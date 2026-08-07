import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageSkeleton } from "@/components/loading/Skeleton";
import { BriefIntake } from "@/components/start/BriefIntake";
import { getProjects } from "@/lib/content/projects";
import { getSiteConfig } from "@/lib/content/settings";
import { pageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Start" });
  return pageMetadata({
    locale,
    path: "/start",
    title: t("title"),
    description: t("subtitle"),
  });
}

export default async function StartPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Start");
  const [projects, site] = await Promise.all([getProjects(), getSiteConfig()]);

  return (
    <section className="section-pad py-12 md:py-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-display text-5xl md:text-6xl">{t("title")}</h1>
        <p className="mt-3 max-w-2xl text-[var(--muted)]">{t("subtitle")}</p>
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
