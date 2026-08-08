"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useState, type CSSProperties } from "react";
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

type Layer = (typeof layers)[number];

type Props = {
  project?: Project | null;
};

function LayerDetail({
  layer,
  index,
  project,
  reduced,
}: {
  layer: Layer;
  index: number;
  project?: Project | null;
  reduced: boolean;
}) {
  const t = useTranslations("Home.invisible");

  return (
    <motion.div
      key={layer}
      initial={reduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? undefined : { opacity: 0, y: 4 }}
      transition={{ duration: 0.28 }}
      className="flex min-h-[180px] flex-col border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[0_1px_0_rgba(15,23,42,0.04)] sm:min-h-[220px] sm:p-6 md:min-h-[240px] md:p-8"
    >
      <p className="tech-label text-[10px] text-[var(--muted)]">
        LAYER / {String(index + 1).padStart(2, "0")}
      </p>
      <h3 className="font-display mt-3 text-2xl tracking-tight sm:text-3xl">
        {t(`layers.${layer}`)}
      </h3>
      <p className="mt-3 text-base leading-relaxed text-[var(--muted)] sm:mt-4">
        {t(`hints.${layer}`)}
      </p>
      {project ? (
        <p className="mt-auto pt-6 tech-label text-[10px] text-[var(--carbon)]/60">
          REF / {project.id} · {project.title.en}
        </p>
      ) : null}
    </motion.div>
  );
}

/** Chapter 08 — full-system architecture (distinct from Interface X-Ray). */
export function InvisibleLayer({ project }: Props) {
  const t = useTranslations("Home.invisible");
  const locale = useLocale();
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);

  const metaFor = (layer: Layer) => {
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

  const selectLayer = (index: number) => {
    setActive(Math.max(0, Math.min(layers.length - 1, index)));
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

        <div className="mt-10 grid gap-6 md:mt-14 md:gap-8 lg:grid-cols-12 lg:items-start">
          <div
            className="min-w-0 overflow-x-clip lg:col-span-7"
            dir={locale === "ar" ? "rtl" : "ltr"}
          >
            <div
              className="flex flex-col gap-2 [overflow-anchor:none]"
              role="listbox"
              aria-label={t("title")}
              aria-activedescendant={`layer-${layers[active]}`}
              onKeyDown={(event) => {
                if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                  event.preventDefault();
                  selectLayer(active + 1);
                } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
                  event.preventDefault();
                  selectLayer(active - 1);
                } else if (event.key === "Home") {
                  event.preventDefault();
                  selectLayer(0);
                } else if (event.key === "End") {
                  event.preventDefault();
                  selectLayer(layers.length - 1);
                }
              }}
            >
              {layers.map((layer, index) => {
                const on = active === index;
                const count = metaFor(layer);
                const inset = `${index * 0.35 + (on ? 0.25 : 0)}rem`;
                return (
                  <div key={layer} className="min-w-0">
                    <button
                      id={`layer-${layer}`}
                      type="button"
                      role="option"
                      aria-selected={on}
                      tabIndex={on ? 0 : -1}
                      onMouseDown={(event) => {
                        // Avoid focus-driven scroll jump on tap/click.
                        event.preventDefault();
                      }}
                      onClick={() => selectLayer(index)}
                      onMouseEnter={() => {
                        if (
                          typeof window !== "undefined" &&
                          window.matchMedia("(hover: hover)").matches
                        ) {
                          selectLayer(index);
                        }
                      }}
                      onFocus={() => selectLayer(index)}
                      className={`flex w-full min-w-0 items-center gap-3 border px-3 py-3.5 text-start transition-[border-color,background-color,color,margin] duration-200 sm:gap-4 sm:px-4 sm:py-4 max-lg:!ms-0 lg:ms-[var(--layer-inset)] ${
                        on
                          ? "border-[var(--oxide)] border-t-2 bg-[var(--oxide-soft)]"
                          : "border-[var(--line)] bg-[var(--surface)] hover:border-[var(--line-strong)]"
                      }`}
                      style={
                        {
                          "--layer-inset": inset,
                        } as CSSProperties
                      }
                    >
                      <span className="tech-label w-7 shrink-0 text-[10px] text-[var(--muted)] sm:w-8">
                        L{String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display min-w-0 flex-1 truncate text-lg tracking-tight sm:text-xl md:text-2xl">
                        {t(`layers.${layer}`)}
                      </span>
                      {count != null ? (
                        <span className="tech-label shrink-0 text-[10px] tabular-nums text-[var(--muted)]">
                          {String(count).padStart(2, "0")}
                        </span>
                      ) : (
                        <span className="tech-label w-4 shrink-0" aria-hidden />
                      )}
                    </button>

                    <AnimatePresence initial={false} mode="popLayout">
                      {on ? (
                        <motion.div
                          key={`mobile-${layer}`}
                          initial={reduced ? false : { opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={reduced ? undefined : { opacity: 0, height: 0 }}
                          transition={{ duration: 0.22 }}
                          className="overflow-hidden lg:hidden"
                        >
                          <div className="pt-2">
                            <LayerDetail
                              layer={layer}
                              index={index}
                              project={project}
                              reduced={reduced}
                            />
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="hidden min-w-0 lg:col-span-5 lg:sticky lg:top-28 lg:block lg:self-start">
            <LayerDetail
              layer={layers[active]}
              index={active}
              project={project}
              reduced={reduced}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
