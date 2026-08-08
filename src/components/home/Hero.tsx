"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { Project } from "@/content/types";
import { Link } from "@/i18n/navigation";
import { usePrefersReducedMotion } from "@/lib/motion";
import { LivingSystemCanvas } from "@/components/home/visuals/LivingSystemCanvas";

const EASE = [0.22, 1, 0.36, 1] as const;

type Props = {
  project?: Project | null;
};

export function Hero({ project }: Props) {
  const t = useTranslations("Hero");
  const reduced = usePrefersReducedMotion();
  const brand = t("brand");

  return (
    <section
      className="relative overflow-hidden bg-[var(--ink)] text-white"
      aria-label={brand}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(900px 420px at 18% 20%, rgba(21,94,239,0.35), transparent 60%), radial-gradient(700px 380px at 85% 70%, rgba(15,118,110,0.22), transparent 55%)",
        }}
      />
      <div className="section-pad relative canvas grid min-h-[100svh] w-full items-end gap-10 pb-16 pt-28 md:gap-12 md:pb-24 lg:grid-cols-12 lg:items-center lg:gap-8 lg:pb-28 lg:pt-[11vh]">
        <div className="relative z-[1] lg:col-span-5">
          <motion.p
            className="tech-label text-[11px] text-[var(--volt-hot)]"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.08, duration: 0.3, ease: EASE }}
          >
            {t("eyebrow")}
          </motion.p>

          <motion.h1
            className="type-hero-brand mt-4"
            style={{ fontSize: "clamp(3.25rem, 12vw, 9.75rem)", lineHeight: 0.86 }}
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.55, ease: EASE }}
          >
            {brand}
          </motion.h1>

          <motion.p
            className="mt-5 max-w-[22ch] text-[1.35rem] font-medium leading-[1.15] tracking-[-0.02em] text-white/92 md:mt-6 md:text-[2rem] md:leading-[1.12]"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.35, ease: EASE }}
          >
            {t("tagline")}
          </motion.p>

          <motion.p
            className="mt-4 max-w-[34rem] text-base leading-[1.55] text-white/58 md:text-lg"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.3, ease: EASE }}
          >
            {t("supporting")}
          </motion.p>

          <motion.p
            className="mt-3 max-w-[34rem] text-sm leading-relaxed text-white/45 md:text-base"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.78, duration: 0.3, ease: EASE }}
          >
            {t("definition")}
          </motion.p>

          <motion.div
            className="mt-8 flex w-full flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:gap-4"
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.3, ease: EASE }}
          >
            <Link href="/work" className="btn-primary w-full sm:w-auto">
              {t("ctaExplore")}
            </Link>
            <Link href="/start" className="btn-ghost w-full sm:w-auto">
              {t("ctaStart")}
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="relative h-[min(52svh,420px)] border border-white/12 bg-white/[0.02] [perspective:1400px] lg:col-span-7 lg:h-[min(68svh,560px)]"
          initial={reduced ? false : { opacity: 0, rotateX: 6, y: 18 }}
          animate={{ opacity: 1, rotateX: 0, y: 0 }}
          transition={{ delay: 0.35, duration: 0.65, ease: EASE }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--volt),transparent)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-6 bottom-0 h-16 bg-gradient-to-t from-[var(--ink)] to-transparent opacity-80"
          />
          <LivingSystemCanvas project={project} className="absolute inset-0" />
        </motion.div>
      </div>
    </section>
  );
}
