"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import type { Project } from "@/content/types";
import { Link } from "@/i18n/navigation";
import { usePrefersReducedMotion } from "@/lib/motion";
import { LivingSystemCanvas } from "@/components/home/visuals/LivingSystemCanvas";

type Props = {
  project?: Project | null;
};

/** Chapter 06 — proof. Heavy system scene without sticky scroll trap. */
export function FeaturedSystem({ project }: Props) {
  const t = useTranslations("Home.featured");
  const tAtlas = useTranslations("Atlas");
  const locale = useLocale() as "ar" | "en";
  const reduced = usePrefersReducedMotion();

  if (!project) return null;

  const chips = [
    ...project.modules.slice(0, 4).map((m) => m.name[locale]),
    ...project.integrations.slice(0, 3).map((i) => i.system),
  ].slice(0, 8);

  const massItems = [
    { key: "roles", value: project.mass.roles },
    { key: "modules", value: project.mass.modules },
    { key: "workflows", value: project.mass.workflows },
    { key: "integrations", value: project.mass.integrations },
    { key: "locations", value: project.mass.locations },
  ].filter((m) => typeof m.value === "number");

  return (
    <section className="bg-[var(--carbon)] text-white">
      <div className="section-pad canvas py-16 md:py-24 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <p className="tech-label text-[11px] text-white/50">
              {t("eyebrow")} / {project.id}
            </p>
            <p className="tech-label mt-2 text-[10px] text-white/40">
              STATUS / {project.status.toUpperCase()}
              <span className="mx-3 text-white/20">·</span>
              {project.systemType.toUpperCase()}
              <span className="mx-3 text-white/20">·</span>
              {project.sector.toUpperCase()}
            </p>
          </div>
          <Link
            href="/work"
            className="text-sm font-medium text-white/65 underline-offset-4 hover:text-white hover:underline"
          >
            {t("atlas")}
          </Link>
        </div>

        <div className="mt-10 grid items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col lg:col-span-4">
            <h2 className="font-display text-5xl tracking-[-0.03em] md:text-7xl">
              {project.title[locale]}
            </h2>
            <p className="mt-4 text-lg text-white/70 md:text-xl">
              {project.descriptor[locale]}
            </p>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/55 md:text-base">
              {project.summary[locale]}
            </p>

            {massItems.length > 0 ? (
              <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-6 sm:grid-cols-3 lg:grid-cols-2">
                {massItems.map((item) => (
                  <div key={item.key}>
                    <dt className="tech-label text-[10px] text-white/40">
                      {tAtlas(item.key)}
                    </dt>
                    <dd className="font-display mt-1 text-3xl tabular-nums">
                      {String(item.value).padStart(2, "0")}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}

            <Link
              href={`/work/${project.slug}`}
              className="btn-primary mt-10 inline-flex w-fit"
            >
              {t("cta")}
            </Link>
          </div>

          <motion.div
            className="min-h-[360px] border border-white/12 [perspective:1400px] lg:col-span-8 lg:min-h-[560px]"
            initial={reduced ? false : { opacity: 0, y: 12, rotateX: 5 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <LivingSystemCanvas project={project} />
          </motion.div>
        </div>

        <ul className="mt-10 flex flex-wrap gap-2 border-t border-white/10 pt-6">
          {chips.map((chip) => (
            <li
              key={chip}
              className="border border-white/15 px-3 py-2 tech-label text-[10px] text-white/65"
            >
              {chip}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
