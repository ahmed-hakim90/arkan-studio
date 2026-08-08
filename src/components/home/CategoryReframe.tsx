"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";

/**
 * HOME / 02 — Category Reframe
 * Typographic scroll: three lonely words → thesis statement.
 */
export function CategoryReframe() {
  const t = useTranslations("Home.reframe");
  const locale = useLocale();
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // One word visible per beat; crossfade windows ~320ms equivalent via tight ranges
  const a = useTransform(scrollYProgress, [0, 0.18, 0.26], [1, 1, 0]);
  const b = useTransform(scrollYProgress, [0.22, 0.3, 0.48, 0.56], [0, 1, 1, 0]);
  const c = useTransform(scrollYProgress, [0.52, 0.6, 0.72], [0, 1, 0]);
  const finalOpacity = useTransform(scrollYProgress, [0.7, 0.82], [0, 1]);
  const finalY = useTransform(scrollYProgress, [0.7, 0.82], [16, 0]);
  const ruleScale = useTransform(scrollYProgress, [0.78, 0.9], [0, 1]);

  const wordMax = locale === "ar" ? "max-w-[12ch]" : "max-w-[16ch]";

  if (reduced) {
    return (
      <section className="section-pad bg-[var(--background)] py-24 md:py-32">
        <div className="canvas flex min-h-[50vh] flex-col items-start justify-center md:items-center md:text-center">
          <p className={`font-display text-[clamp(2.5rem,8vw,5rem)] leading-none text-[var(--foreground)] ${wordMax}`}>
            {t("a")}
          </p>
          <p className={`font-display mt-4 text-[clamp(2.5rem,8vw,5rem)] leading-none text-[var(--foreground)] ${wordMax}`}>
            {t("b")}
          </p>
          <p className={`font-display mt-4 text-[clamp(2.5rem,8vw,5rem)] leading-none text-[var(--foreground)] ${wordMax}`}>
            {t("c")}
          </p>
          <h2 className={`font-display mt-14 text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.025em] text-[var(--navy)] ${locale === "ar" ? "max-w-[18ch]" : "max-w-[22ch]"}`}>
            {t("final")}
          </h2>
          <div className="mt-8 h-0.5 w-[40%] max-w-xs origin-start bg-[var(--signal)] md:origin-center" />
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className="relative overflow-x-clip bg-[var(--background)] max-md:min-h-[220vh] md:min-h-[360vh]"
    >
      <div className="section-pad canvas sticky top-[var(--header-offset,5rem)] flex h-[70svh] flex-col items-start justify-center md:h-[100svh] md:items-center md:text-center">
        <div className="relative flex h-[5.5rem] w-full items-center justify-start md:h-[6.5rem] md:justify-center">
          {(
            [
              { key: "a", opacity: a },
              { key: "b", opacity: b },
              { key: "c", opacity: c },
            ] as const
          ).map((item) => (
            <motion.p
              key={item.key}
              style={{ opacity: item.opacity }}
              className={`font-display absolute text-[clamp(2.75rem,9vw,5.5rem)] leading-none tracking-tight text-[var(--foreground)] ${wordMax}`}
            >
              {t(item.key)}
            </motion.p>
          ))}
        </div>

        <motion.h2
          style={{ opacity: finalOpacity, y: finalY }}
          className={`font-display mt-10 text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.025em] text-[var(--navy)] md:mt-14 ${locale === "ar" ? "max-w-[18ch]" : "max-w-[22ch]"}`}
        >
          {t("final")}
        </motion.h2>

        <motion.div
          aria-hidden
          style={{ scaleX: ruleScale }}
          className="mt-8 h-0.5 w-[40%] max-w-xs origin-start bg-[var(--signal)] md:origin-center"
        />
      </div>
    </section>
  );
}
