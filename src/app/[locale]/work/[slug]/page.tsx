import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale, setRequestLocale } from "next-intl/server";
import { ControlRoom } from "@/components/project/ControlRoom";
import { getProject, projects } from "@/content/projects";
import { pageMetadata } from "@/lib/seo";
import type { LocaleKey } from "@/lib/site";
import { siteConfig } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return projects.flatMap((project) =>
    ["ar", "en"].map((locale) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const loc = locale as LocaleKey;
  return pageMetadata({
    locale,
    path: `/work/${slug}`,
    title: project.title[loc],
    description: project.summary[loc],
    type: "article",
  });
}

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const project = getProject(slug);
  if (!project) notFound();

  const loc = (await getLocale()) as LocaleKey;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title[loc],
    description: project.summary[loc],
    url: `${siteConfig.url}/${loc}/work/${slug}`,
    creator: {
      "@type": "Organization",
      name: siteConfig.legalName,
      url: siteConfig.url,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ControlRoom project={project} />
    </>
  );
}
