import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getFeaturedProjects } from "@/lib/content/projects";
import type { LocaleKey } from "@/lib/site";

export async function SelectedSystems() {
  const t = await getTranslations("Home.selected");
  const locale = (await getLocale()) as LocaleKey;
  const featured = (await getFeaturedProjects()).slice(0, 3);

  return (
    <section className="section-pad border-y border-[var(--line)] py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="tech-label text-[11px] text-[var(--signal)]">
          {t("eyebrow")}
        </p>
        <h2 className="font-display mt-3 text-4xl md:text-5xl">{t("title")}</h2>

        <div className="mt-14 space-y-0">
          {featured.map((project, index) => (
            <article
              key={project.slug}
              className="grid gap-6 border-t border-[var(--line)] py-12 md:grid-cols-[8rem_1fr_auto] md:items-end"
            >
              <p className="tech-label text-[11px] text-[var(--muted)]">
                {String(index + 1).padStart(2, "0")} / {project.sector.toUpperCase()}
              </p>
              <div>
                <h3 className="font-display text-4xl md:text-5xl">
                  {project.title[locale]}
                </h3>
                <p className="mt-2 text-lg text-[var(--muted)]">
                  {project.descriptor[locale]}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.modules.slice(0, 5).map((module) => (
                    <span
                      key={module.id}
                      className="tech-label rounded-[var(--radius-xs)] border border-[var(--line)] px-2 py-1 text-[10px] text-[var(--muted)]"
                    >
                      {module.name[locale]}
                    </span>
                  ))}
                </div>
              </div>
              <Link
                href={`/work/${project.slug}`}
                className="text-sm font-semibold text-[var(--signal)] hover:underline"
              >
                {t("explore")} →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
