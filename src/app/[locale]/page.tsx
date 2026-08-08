import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { BrandStatement } from "@/components/home/BrandStatement";
import { BuilderTeaser } from "@/components/home/BuilderTeaser";
import { CapabilityMatrix } from "@/components/home/CapabilityMatrix";
import { FeaturedSystem } from "@/components/home/FeaturedSystem";
import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/Hero";
import { HowWeBuild } from "@/components/home/HowWeBuild";
import { IntegrationLayer } from "@/components/home/IntegrationLayer";
import { InterfaceXRay } from "@/components/home/InterfaceXRay";
import { InvisibleLayer } from "@/components/home/InvisibleLayer";
import { OneTeam } from "@/components/home/OneTeam";
import { OperatingFlow } from "@/components/home/OperatingModel";
import { SectorStrip } from "@/components/home/SectorStrip";
import { SelectedSystems } from "@/components/home/SelectedSystems";
import { SixArkan } from "@/components/home/SixArkan";
import { StudioTeaser } from "@/components/home/StudioTeaser";
import { WhatWeBuild } from "@/components/home/WhatWeBuild";
import {
  getFeaturedProjects,
  getProject,
} from "@/lib/content/projects";
import { HomeWebPageJsonLd } from "@/components/seo/WebPageJsonLd";
import { pageMetadata } from "@/lib/seo";
import { getSeoCopy } from "@/lib/seo-messages";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getSeoCopy(locale, "Meta");
  return pageMetadata({
    locale,
    path: "",
    title: seo.title,
    description: seo.description,
  });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const featured = await getProject("masar-valet");
  const featuredList = await getFeaturedProjects();

  return (
    <>
      <HomeWebPageJsonLd />
      <Hero project={featured} />
      <SectorStrip />
      <BrandStatement />
      <OperatingFlow />
      <WhatWeBuild />
      <FeaturedSystem project={featured} />
      <InterfaceXRay project={featured} />
      <InvisibleLayer project={featured} />
      <SelectedSystems projects={featuredList} />
      <CapabilityMatrix projects={featuredList} />
      <OneTeam />
      <SixArkan />
      <IntegrationLayer projects={featuredList} />
      <HowWeBuild />
      <BuilderTeaser />
      <StudioTeaser />
      <FinalCta />
    </>
  );
}
