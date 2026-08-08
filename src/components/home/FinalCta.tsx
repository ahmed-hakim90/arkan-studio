"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { usePrefersReducedMotion } from "@/lib/motion";

/** Chapter 17 — visitor project as the next node in the network. */
export function FinalCta() {
  const t = useTranslations("Home.finalCta");
  const reduced = usePrefersReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[var(--ink)] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(700px 320px at 80% 20%, rgba(21,94,239,0.28), transparent 60%)",
        }}
      />
      <div className="section-pad canvas relative grid gap-12 py-24 md:grid-cols-12 md:items-center md:py-32">
        <div className="md:col-span-6">
          <p className="tech-label text-[11px] text-[var(--volt-hot)]">{t("eyebrow")}</p>
          <h2 className="font-display type-h2 mt-4 tracking-[-0.03em] lg:text-6xl">
            {t("title")}
          </h2>
          <p className="mt-5 max-w-[34ch] text-lg text-white/80">
            {t("subtitle")}
          </p>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-white/55">
            {t("body")}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link href="/start" className="btn-primary">
              {t("ctaStart")}
            </Link>
            <Link href="/work" className="btn-ghost">
              {t("ctaExplore")}
            </Link>
          </div>
        </div>

        <div className="relative min-h-[240px] border border-white/12 p-6 md:col-span-6 md:min-h-[320px] md:p-8">
          <p className="tech-label text-[10px] text-white/40">
            NETWORK / NEXT SYSTEM
          </p>
          <div className="relative mt-10 flex flex-wrap items-center gap-3">
            {["MVS-01", "NXR-01", "OPS", "DATA"].map((id, i) => (
              <div key={id} className="flex items-center gap-3">
                <span className="border border-white/20 px-3 py-2 tech-label text-[10px] text-white/65">
                  {id}
                </span>
                {i < 3 ? (
                  <span aria-hidden className="h-px w-6 bg-white/20" />
                ) : null}
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-3">
            <span aria-hidden className="h-px flex-1 bg-white/15" />
            <motion.div
              className="border border-[var(--oxide)] bg-white/[0.04] px-4 py-3"
              initial={reduced ? false : { opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="flex items-center gap-2">
                <span className="size-1.5 bg-[var(--oxide)]" />
                <span className="tech-label text-[10px] text-white/85">
                  {t("nextNode")}
                </span>
              </span>
              <p className="mt-2 font-display text-xl tracking-tight">
                {t("yourSystem")}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
