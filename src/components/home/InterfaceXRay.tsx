"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import type { Project } from "@/content/types";
import { usePrefersReducedMotion } from "@/lib/motion";

type Props = {
  project?: Project | null;
};

/** Chapter 07 — technical depth from ONE surface action. */
export function InterfaceXRay({ project }: Props) {
  const t = useTranslations("Home.xray");
  const locale = useLocale() as "ar" | "en";
  const reduced = usePrefersReducedMotion();
  const [open, setOpen] = useState(false);

  if (!project?.behindInterface) return null;

  const { surfaceAction, chain, punchline } = project.behindInterface;

  return (
    <section className="bg-[var(--gunmetal)] text-white">
      <div className="section-pad canvas py-20 md:py-28">
        <p className="tech-label text-[11px] text-white/45">{t("eyebrow")}</p>
        <h2 className="font-display mt-3 max-w-[18ch] text-4xl tracking-[-0.025em] md:text-5xl">
          {t("title")}
        </h2>
        <p className="mt-4 max-w-[40ch] text-base text-white/55 md:text-lg">
          {t("support")}
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-4">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              onMouseEnter={() => setOpen(true)}
              onFocus={() => setOpen(true)}
              className={`w-full border px-5 py-6 text-start transition-[border-color,background,transform] duration-300 ${
                open
                  ? "border-[var(--oxide)] bg-white/[0.06]"
                  : "border-white/20 bg-white/[0.03] hover:border-white/40 hover:-translate-y-0.5"
              }`}
              aria-expanded={open}
            >
              <span className="tech-label text-[10px] text-white/45">
                {t("surface")}
              </span>
              <span className="mt-3 block font-display text-2xl tracking-tight">
                {surfaceAction[locale]}
              </span>
              <span className="mt-4 tech-label text-[10px] text-[var(--oxide)]">
                {open ? t("collapse") : t("reveal")}
              </span>
            </button>
            <p className="mt-6 text-sm leading-relaxed text-white/50">
              {punchline[locale]}
            </p>
          </div>

          <ol className="lg:col-span-8">
            {chain.map((step, index) => {
              const visible = open || reduced;
              return (
                <motion.li
                  key={`${step[locale]}-${index}`}
                  initial={false}
                  animate={
                    visible
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0.25, x: locale === "ar" ? -8 : 8 }
                  }
                  transition={{
                    delay: reduced || !open ? 0 : index * 0.07,
                    duration: 0.3,
                  }}
                  className="flex items-stretch border-b border-white/10 last:border-b-0"
                >
                  <span className="flex w-14 shrink-0 items-center tech-label text-[10px] text-white/35">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`flex-1 py-4 text-lg md:text-xl ${
                      open && index === chain.length - 1
                        ? "text-white"
                        : "text-white/75"
                    }`}
                  >
                    {step[locale]}
                  </span>
                  {open && index < chain.length - 1 ? (
                    <span
                      aria-hidden
                      className="hidden w-8 items-center justify-center text-[var(--oxide)] md:flex"
                    >
                      ↓
                    </span>
                  ) : null}
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
