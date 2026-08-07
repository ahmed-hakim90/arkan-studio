"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";

const stages = [
  "discover",
  "map",
  "design",
  "build",
  "integrate",
  "launch",
  "evolve",
] as const;

export function HowWeBuild() {
  const t = useTranslations("Home.how");
  const [active, setActive] = useState<(typeof stages)[number]>("map");
  const reduced = usePrefersReducedMotion();
  const activeIndex = stages.indexOf(active);

  return (
    <section className="section-pad py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="tech-label text-[11px] text-[var(--signal)]">
          {t("eyebrow")}
        </p>
        <h2 className="font-display mt-3 text-4xl md:text-5xl">{t("title")}</h2>

        <div className="relative mt-14">
          <div className="absolute inset-x-0 top-4 hidden h-px bg-[var(--line)] md:block" />
          <motion.div
            aria-hidden
            className="absolute top-4 hidden h-px bg-[var(--signal)] md:block"
            style={{
              width: `${(activeIndex / (stages.length - 1)) * 100}%`,
            }}
            transition={{ duration: reduced ? 0 : 0.35 }}
          />
          <div className="grid gap-3 md:grid-cols-7">
            {stages.map((stage, index) => {
              const on = active === stage;
              return (
                <button
                  key={stage}
                  type="button"
                  onMouseEnter={() => setActive(stage)}
                  onFocus={() => setActive(stage)}
                  onClick={() => setActive(stage)}
                  className="relative text-start md:text-center"
                >
                  <span
                    className={`relative z-10 mx-0 mb-3 block size-2 rounded-full md:mx-auto ${
                      on || index <= activeIndex
                        ? "bg-[var(--signal)]"
                        : "bg-[var(--steel)]"
                    }`}
                  />
                  <span
                    className={`tech-label text-[10px] ${
                      on ? "text-[var(--signal)]" : "text-[var(--muted)]"
                    }`}
                  >
                    {t(`stages.${stage}.title`)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 max-w-2xl border-s-2 border-[var(--signal)] ps-5">
          <h3 className="font-display text-2xl">
            {t(`stages.${active}.title`)}
          </h3>
          <p className="mt-3 text-[var(--muted)]">
            {t(`stages.${active}.body`)}
          </p>
        </div>
      </div>
    </section>
  );
}
