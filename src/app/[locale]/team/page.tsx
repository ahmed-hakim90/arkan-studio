import type { Metadata } from "next";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { TeamPage } from "@/components/team/TeamPage";
import { getTeam } from "@/lib/content/team";
import { pageMetadata } from "@/lib/seo";
import { getSeoCopy } from "@/lib/seo-messages";
import type { LocaleKey } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getSeoCopy(locale, "Team");
  return pageMetadata({
    locale,
    path: "/team",
    title: seo.title,
    description: seo.description,
  });
}

export default async function TeamRoute({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = (await getLocale()) as LocaleKey;
  const tPillars = await getTranslations("Pillars");
  const members = await getTeam();

  const pillars = {
    product: tPillars("product"),
    experience: tPillars("experience"),
    frontend: tPillars("frontend"),
    backend: tPillars("backend"),
    operations: tPillars("operations"),
    growth: tPillars("growth"),
    design: tPillars("design"),
    ops: tPillars("ops"),
  };

  return <TeamPage locale={loc} members={members} pillars={pillars} />;
}
