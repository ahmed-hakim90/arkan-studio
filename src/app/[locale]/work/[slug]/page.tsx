import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale, setRequestLocale } from "next-intl/server";
import { ControlRoom } from "@/components/project/ControlRoom";
import { getNextProject, getProject, getProjects } from "@/lib/content/projects";
import { getSiteConfig } from "@/lib/content/settings";
import { pageMetadata } from "@/lib/seo";
import type { LocaleKey } from "@/lib/site";
import { projects as fileProjects } from "@/content/projects";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return fileProjects.flatMap((project) =>
    ["ar", "en"].map((locale) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const project = await getProject(slug);
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
  const project = await getProject(slug);
  if (!project) notFound();

  const [loc, site, nextProject] = await Promise.all([
    getLocale() as Promise<LocaleKey>,
    getSiteConfig(),
    getNextProject(slug),
  ]);

  // Warm full list for cache coherence when navigating atlas.
  await getProjects();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title[loc],
    description: project.summary[loc],
    url: `${site.url}/${loc}/work/${slug}`,
    creator: {
      "@type": "Organization",
      name: site.legalName,
      url: site.url,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ControlRoom project={project} nextProject={nextProject} />
    </>
  );
}
