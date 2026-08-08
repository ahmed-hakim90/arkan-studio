"use client";

import { useLocale, useTranslations } from "next-intl";
import type { Project } from "@/content/types";
import { LivingSystemCanvas } from "@/components/home/visuals/LivingSystemCanvas";

type Props = {
  project: Project;
};

/** Full-bleed architectural system map — one section on every project Control Room. */
export function SystemMapSection({ project }: Props) {
  const t = useTranslations("ControlRoom");
  const locale = useLocale();
  const title = t.has("systemMap")
    ? t("systemMap")
    : locale === "ar"
      ? "خريطة النظام"
      : "System map";
  const lead = t.has("systemMapLead")
    ? t("systemMapLead")
    : locale === "ar"
      ? "الوحدات، المسار الحي، وكتلة التشغيل في نظرة واحدة."
      : "Modules, live path, and operating mass in one view.";

  return (
    <section
      id="chapter-systemMap"
      className="scroll-mt-[calc(var(--header-offset,5rem)+6rem)] border-b border-[var(--line)] bg-[var(--ink)] text-white"
      aria-labelledby="system-map-heading"
    >
      <div className="section-pad canvas py-8 md:py-10 lg:py-12">
        <div className="mx-auto w-full max-w-3xl">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="tech-label text-[11px] text-[var(--volt-hot)]">
                SYSTEM MAP / {project.id}
              </p>
              <h2
                id="system-map-heading"
                className="font-display mt-2 text-2xl md:text-3xl"
              >
                {title}
              </h2>
              <p className="mt-2 max-w-[48ch] text-sm text-white/55">
                {lead}
              </p>
            </div>
            <p className="tech-label text-[10px] text-white/35">
              ROLES / {project.mass.roles ?? "—"}
              <span className="mx-2 opacity-40">·</span>
              MODULES / {project.mass.modules ?? "—"}
              <span className="mx-2 opacity-40">·</span>
              INTEGRATIONS / {project.mass.integrations ?? "—"}
            </p>
          </div>

          {/* Same map composition — smaller footprint, identical layout */}
          <div className="relative mt-5 h-[250px] w-full max-w-[40rem] border border-white/12 [perspective:1400px] sm:mt-6 sm:h-[280px] lg:h-[300px]">
            <LivingSystemCanvas
              project={project}
              density="compact"
              className="absolute inset-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
