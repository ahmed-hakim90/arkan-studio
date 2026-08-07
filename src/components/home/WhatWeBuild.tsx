"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";

const ids = [
  "business",
  "operations",
  "platforms",
  "commerce",
  "ai",
  "experiences",
] as const;

export function WhatWeBuild() {
  const t = useTranslations("Home.whatWeBuild");
  const [active, setActive] = useState<(typeof ids)[number]>("operations");
  const reduced = usePrefersReducedMotion();

  return (
    <section className="section-pad border-y border-[var(--line)] py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="tech-label text-[11px] text-[var(--signal)]">
          {t("eyebrow")}
        </p>
        <h2 className="font-display mt-3 text-4xl md:text-5xl">{t("title")}</h2>

        <div className="mt-12">
          {ids.map((id, index) => {
            const open = active === id;
            return (
              <button
                key={id}
                type="button"
                onMouseEnter={() => setActive(id)}
                onFocus={() => setActive(id)}
                onClick={() => setActive(id)}
                data-active={open}
                className="structural-row grid w-full grid-cols-[4rem_1fr] items-start gap-4 py-5 text-start md:grid-cols-[5rem_14rem_1fr]"
              >
                <span className="tech-label pt-1 text-[11px] text-[var(--muted)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={`font-display text-xl md:text-2xl ${
                    open ? "text-[var(--signal)]" : "text-[var(--foreground)]"
                  }`}
                >
                  {t(`items.${id}.title`)}
                </span>
                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      initial={reduced ? false : { opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={reduced ? undefined : { opacity: 0, height: 0 }}
                      className="col-span-2 overflow-hidden md:col-span-1"
                    >
                      <p className="max-w-xl text-[var(--muted)]">
                        {t(`items.${id}.body`)}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {(t.raw(`items.${id}.nodes`) as string[]).map((node) => (
                          <span
                            key={node}
                            className="tech-label rounded-[var(--radius-xs)] border border-[var(--line-signal)] px-2 py-1 text-[10px] text-[var(--signal)]"
                          >
                            {node}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <span className="hidden text-sm text-[var(--muted)] md:block">
                      {t(`items.${id}.hint`)}
                    </span>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
