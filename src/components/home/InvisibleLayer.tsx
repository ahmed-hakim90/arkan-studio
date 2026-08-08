"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import type { Project } from "@/content/types";
import { usePrefersReducedMotion } from "@/lib/motion";

const layers = [
  "interface",
  "workflow",
  "modules",
  "users",
  "data",
  "integrations",
  "automation",
  "architecture",
] as const;

type Props = {
  project?: Project | null;
};

/** Chapter 08 — full-system architecture (distinct from Interface X-Ray). */
export function InvisibleLayer({ project }: Props) {
  const t = useTranslations("Home.invisible");
  const locale = useLocale();
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const dir = locale === "ar" ? -1 : 1;

  const metaFor = (layer: (typeof layers)[number]) => {
    if (!project) return null;
    switch (layer) {
      case "modules":
        return project.mass.modules;
      case "users":
        return project.mass.roles;
      case "integrations":
        return project.mass.integrations;
      case "workflow":
        return project.mass.workflows;
      case "data":
        return project.mass.dataDomains;
      case "automation":
        return project.mass.automations;
      case "interface":
        return project.mass.interfaces;
      default:
        return null;
    }
  };

  return (
    <section className="overflow-x-clip bg-[var(--paper-soft)]">
      <div className="section-pad canvas py-20 md:py-28">
        <p className="tech-label text-[11px] text-[var(--muted)]">
          {t("eyebrow")}
        </p>
        <h2 className="font-display type-h2 mt-3 max-w-[18ch] tracking-[-0.025em] text-[var(--carbon)]">
          {t("title")}
        </h2>
        <p className="mt-4 max-w-xl text-lg font-medium text-[var(--foreground)]">
          {t("lead")}
        </p>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--muted)]">
          {t("body")}
        </p>
        <p className="mt-4 max-w-[40ch] text-sm font-medium text-[var(--carbon)] md:text-base">
          {t("footer")}
        </p>

        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          <div className="relative max-md:-mx-[clamp(1.25rem,4vw,3.5rem)] overflow-x-clip lg:col-span-7 lg:mx-0">
            <div className="space-y-2">
              {layers.map((layer, index) => {
                const on = active === index;
                const depth = index;
                const nudge = on ? 0.25 : 0;
                return (
                  <button
                    key={layer}
                    type="button"
                    onClick={() => setActive(index)}
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    className={`flex w-[calc(100%+1.25rem)] items-center gap-4 border px-4 py-4 text-start transition-[border-color,background,transform] duration-300 [--layer-step:1.15rem] md:w-full md:[--layer-step:0.35rem] ${
                      on
                        ? "border-[var(--oxide)] bg-[var(--surface)]"
                        : "border-[var(--line)] bg-[var(--paper-soft)] hover:border-[var(--line-strong)]"
                    }`}
                    style={{
                      transform: `translateX(calc(${dir} * (${depth} * var(--layer-step) + ${nudge}rem)))`,
                    }}
                    aria-expanded={on}
                  >
                    <span className="tech-label w-8 shrink-0 text-[10px] text-[var(--muted)]">
                      L{String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display min-w-0 flex-1 truncate text-xl tracking-tight md:text-2xl">
                      {t(`layers.${layer}`)}
                    </span>
                    {metaFor(layer) != null ? (
                      <span className="tech-label shrink-0 text-[10px] tabular-nums text-[var(--muted)]">
                        {String(metaFor(layer)).padStart(2, "0")}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <motion.div
              key={layers[active]}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28 }}
              className="border border-[var(--line)] bg-[var(--surface)] p-6 md:p-8"
            >
              <p className="tech-label text-[10px] text-[var(--muted)]">
                LAYER / {String(active + 1).padStart(2, "0")}
              </p>
              <h3 className="font-display mt-3 text-3xl tracking-tight">
                {t(`layers.${layers[active]}`)}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
                {t(`hints.${layers[active]}`)}
              </p>
              {project ? (
                <p className="mt-6 tech-label text-[10px] text-[var(--carbon)]/60">
                  REF / {project.id} · {project.title.en}
                </p>
              ) : null}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
