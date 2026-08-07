import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/content/projects";
import { getSiteConfig } from "@/lib/content/settings";

const staticPaths = [
  "",
  "/work",
  "/capabilities",
  "/approach",
  "/studio",
  "/start",
  "/privacy",
  "/terms",
  "/cookies",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const locales = ["ar", "en"] as const;
  const entries: MetadataRoute.Sitemap = [];
  const [site, projects] = await Promise.all([getSiteConfig(), getProjects()]);

  for (const path of staticPaths) {
    for (const locale of locales) {
      const languages = Object.fromEntries(
        locales.map((loc) => [loc, `${site.url}/${loc}${path}`]),
      ) as Record<string, string>;
      languages["x-default"] = `${site.url}/ar${path}`;

      entries.push({
        url: `${site.url}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === "" || path === "/work" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.7,
        alternates: { languages },
      });
    }
  }

  for (const project of projects) {
    for (const locale of locales) {
      const path = `/work/${project.slug}`;
      const languages = Object.fromEntries(
        locales.map((loc) => [loc, `${site.url}/${loc}${path}`]),
      ) as Record<string, string>;
      languages["x-default"] = `${site.url}/ar${path}`;

      entries.push({
        url: `${site.url}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: project.featured ? 0.8 : 0.6,
        alternates: { languages },
      });
    }
  }

  return entries;
}
