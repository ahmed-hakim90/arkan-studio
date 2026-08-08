"use client";

import { useLocale, useTranslations } from "next-intl";
import type { Project } from "@/content/types";

type Props = {
  projects: Project[];
};

/** Chapter 13 — what connects the system (not a tech-stack wall). */
export function IntegrationLayer({ projects }: Props) {
  const t = useTranslations("Home.integration");
  const locale = useLocale() as "ar" | "en";

  const links = projects.flatMap((p) =>
    p.integrations.map((integ) => ({
      projectId: p.id,
      projectTitle: p.title[locale],
      system: integ.system,
      purpose: integ.purpose[locale],
      category: integ.category[locale],
      key: `${p.slug}-${integ.id}`,
    })),
  );

  const unique = links.slice(0, 12);

  return (
    <section className="bg-[var(--gunmetal)] text-white">
      <div className="section-pad canvas py-20 md:py-28">
        <p className="tech-label text-[11px] text-white/45">{t("eyebrow")}</p>
        <h2 className="font-display mt-3 max-w-[16ch] text-4xl tracking-[-0.025em] md:text-5xl">
          {t("title")}
        </h2>
        <p className="mt-4 max-w-[42ch] text-base text-white/55 md:text-lg">
          {t("support")}
        </p>

        <div className="mt-12 grid gap-px bg-white/10 md:grid-cols-2 lg:grid-cols-3">
          {unique.map((link) => (
            <article
              key={link.key}
              className="bg-[var(--gunmetal)] p-5 md:p-6"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="tech-label text-[10px] text-white/40">
                  {link.projectId}
                </span>
                <span className="tech-label text-[10px] text-white/35">
                  {link.category}
                </span>
              </div>
              <div className="mt-5 flex items-center gap-3">
                <span className="font-display text-lg tracking-tight text-white/80">
                  {link.projectTitle}
                </span>
                <span aria-hidden className="h-px flex-1 bg-white/15" />
                <span
                  aria-hidden
                  className="size-1.5 shrink-0 bg-[var(--oxide)]"
                />
                <span className="font-display text-lg tracking-tight">
                  {link.system}
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/50">
                {link.purpose}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
