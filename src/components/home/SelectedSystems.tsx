"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import type { Project } from "@/content/types";
import { Link } from "@/i18n/navigation";
import { LivingSystemCanvas } from "@/components/home/visuals/LivingSystemCanvas";
import { usePrefersReducedMotion } from "@/lib/motion";

type Props = {
  projects: Project[];
};

/** Chapter 09 — portfolio weight with visual signature per project. */
export function SelectedSystems({ projects }: Props) {
  const t = useTranslations("Home.selected");
  const tAtlas = useTranslations("Atlas");
  const locale = useLocale() as "ar" | "en";
  const reduced = usePrefersReducedMotion();

  return (
    <section className="bg-[var(--paper)]">
      <div className="section-pad canvas py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="tech-label text-[11px] text-[var(--muted)]">
              {t("eyebrow")}
            </p>
            <h2 className="font-display mt-3 text-4xl text-[var(--carbon)] md:text-5xl">
              {t("title")}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted)]">
              {t("support")}
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
              {t("lead")}
            </p>
          </div>
          <Link
            href="/work"
            className="text-sm font-semibold text-[var(--oxide)] underline-offset-4 hover:underline"
          >
            {t("atlas")}
          </Link>
        </div>

        <div className="mt-12 space-y-4">
          {projects.map((project) => (
            <motion.div
              key={project.slug}
              whileHover={
                reduced
                  ? undefined
                  : { y: -3, rotateX: 2.5, scale: 1.005 }
              }
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="[perspective:1200px]"
            >
            <Link
              href={`/work/${project.slug}`}
              className="group grid gap-5 border border-[var(--line)] bg-[var(--surface)] p-5 transition-[border-color,box-shadow] duration-300 hover:border-[var(--carbon)]/35 hover:shadow-[0_18px_40px_-28px_rgba(18,20,23,0.55)] md:grid-cols-12 md:items-center md:gap-6 md:p-6"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="md:col-span-3">
                <p className="tech-label text-[10px] text-[var(--muted)]">
                  SYSTEM / {project.id}
                </p>
                <h3 className="font-display mt-2 text-3xl tracking-tight text-[var(--carbon)] md:text-4xl">
                  {project.title[locale]}
                </h3>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  {project.descriptor[locale]}
                </p>
              </div>

              <div className="relative h-[160px] overflow-hidden border border-[var(--carbon)]/15 bg-[var(--carbon)] md:col-span-4 md:h-[180px]">
                <LivingSystemCanvas project={project} className="absolute inset-0" />
              </div>

              <div className="flex flex-col gap-3 md:col-span-3">
                <p className="tech-label text-[10px] text-[var(--muted)]">
                  {project.systemType.toUpperCase()}
                  <span className="mx-2 opacity-40">·</span>
                  {project.sector.toUpperCase()}
                  <span className="mx-2 opacity-40">·</span>
                  {project.status.toUpperCase()}
                </p>
                <dl className="grid grid-cols-3 gap-2">
                  {(
                    [
                      ["roles", project.mass.roles],
                      ["modules", project.mass.modules],
                      ["integrations", project.mass.integrations],
                    ] as const
                  )
                    .filter(([, v]) => typeof v === "number")
                    .map(([key, value]) => (
                      <div key={key}>
                        <dt className="tech-label text-[9px] text-[var(--muted)]">
                          {tAtlas(key)}
                        </dt>
                        <dd className="mt-1 font-display text-2xl tabular-nums text-[var(--carbon)]">
                          {String(value).padStart(2, "0")}
                        </dd>
                      </div>
                    ))}
                </dl>
              </div>

              <div className="md:col-span-2 md:text-end">
                <span className="text-sm font-medium text-[var(--carbon)] underline-offset-4 transition group-hover:text-[var(--oxide)] group-hover:underline">
                  {t("explore")}
                </span>
              </div>
            </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
