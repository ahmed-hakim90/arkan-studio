import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/content/projects";
import { getSiteConfig } from "@/lib/content/settings";

const staticPaths: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/work", changeFrequency: "weekly", priority: 0.9 },
  { path: "/start", changeFrequency: "weekly", priority: 0.9 },
  { path: "/capabilities", changeFrequency: "monthly", priority: 0.85 },
  { path: "/approach", changeFrequency: "monthly", priority: 0.85 },
  { path: "/studio", changeFrequency: "monthly", priority: 0.75 },
  { path: "/team", changeFrequency: "monthly", priority: 0.75 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
  { path: "/cookies", changeFrequency: "yearly", priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const locales = ["ar", "en"] as const;
  const entries: MetadataRoute.Sitemap = [];
  const [site, projects] = await Promise.all([getSiteConfig(), getProjects()]);

  for (const item of staticPaths) {
    for (const locale of locales) {
      const languages = Object.fromEntries(
        locales.map((loc) => [loc, `${site.url}/${loc}${item.path}`]),
      ) as Record<string, string>;
      languages["x-default"] = `${site.url}/ar${item.path}`;

      entries.push({
        url: `${site.url}/${locale}${item.path}`,
        lastModified: new Date(),
        changeFrequency: item.changeFrequency,
        priority: item.priority,
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
        priority: project.featured ? 0.8 : 0.65,
        alternates: { languages },
      });
    }
  }

  return entries;
}
