import { setRequestLocale } from "next-intl/server";
import { BuilderTeaser } from "@/components/home/BuilderTeaser";
import { CapabilitySpectrum } from "@/components/home/CapabilitySpectrum";
import { CategoryReframe } from "@/components/home/CategoryReframe";
import { FeaturedSystem } from "@/components/home/FeaturedSystem";
import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/Hero";
import { HowWeBuild } from "@/components/home/HowWeBuild";
import { InvisibleLayer } from "@/components/home/InvisibleLayer";
import { OneTeam } from "@/components/home/OneTeam";
import { SelectedSystems } from "@/components/home/SelectedSystems";
import { SixArkan } from "@/components/home/SixArkan";
import { WhatWeBuild } from "@/components/home/WhatWeBuild";
import { getProject } from "@/lib/content/projects";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const featured = await getProject("masar-valet");

  return (
    <>
      <Hero />
      <CategoryReframe />
      <WhatWeBuild />
      <FeaturedSystem project={featured} />
      <InvisibleLayer />
      <SelectedSystems />
      <OneTeam />
      <SixArkan />
      <HowWeBuild />
      <CapabilitySpectrum />
      <BuilderTeaser />
      <FinalCta />
    </>
  );
}
