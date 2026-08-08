import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale, setRequestLocale } from "next-intl/server";
import { ControlRoom } from "@/components/project/ControlRoom";
import { getNextProject, getProject, getProjects } from "@/lib/content/projects";
import { getSiteConfig } from "@/lib/content/settings";
import {
  clampDescription,
  jsonLdScript,
  pageMetadata,
  projectSeoTitle,
} from "@/lib/seo";
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
  const description = clampDescription(
    project.summary[loc] || project.descriptor[loc],
  );

  return pageMetadata({
    locale,
    path: `/work/${slug}`,
    title: projectSeoTitle(project.title[loc], locale),
    description,
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

  const pageUrl = `${site.url}/${loc}/work/${slug}`;
  const atlasUrl = `${site.url}/${loc}/work`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: loc === "ar" ? "أركان" : "Arkan",
            item: `${site.url}/${loc}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: loc === "ar" ? "الأنظمة" : "Systems",
            item: atlasUrl,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: project.title[loc],
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "CreativeWork",
        "@id": `${pageUrl}#work`,
        name: project.title[loc],
        headline: project.title[loc],
        description: project.summary[loc],
        url: pageUrl,
        inLanguage: loc === "ar" ? "ar" : "en",
        identifier: project.id,
        creator: {
          "@type": "Organization",
          name: site.legalName,
          url: site.url,
        },
        about: project.descriptor[loc],
        keywords: [
          project.sector,
          project.systemType,
          project.status,
          ...(project.capabilities ?? []),
        ].filter(Boolean),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(jsonLd)}
      />
      <ControlRoom project={project} nextProject={nextProject} />
    </>
  );
}
