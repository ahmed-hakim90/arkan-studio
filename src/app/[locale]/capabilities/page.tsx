import type { Metadata } from "next";
import { getLocale, setRequestLocale } from "next-intl/server";
import { CapabilitiesView } from "@/components/capabilities/CapabilitiesView";
import { getProjects } from "@/lib/content/projects";
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
  const seo = await getSeoCopy(locale, "Capabilities");
  return pageMetadata({
    locale,
    path: "/capabilities",
    title: seo.title,
    description: seo.description,
  });
}

export default async function CapabilitiesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = (await getLocale()) as LocaleKey;
  const projects = await getProjects();

  return (
    <section className="section-pad py-12 md:py-16">
      <div className="canvas">
        <CapabilitiesView projects={projects} locale={loc} />
      </div>
    </section>
  );
}
