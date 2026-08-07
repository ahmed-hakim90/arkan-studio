"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import type { Project } from "@/content/types";
import { Link } from "@/i18n/navigation";
import { usePrefersReducedMotion } from "@/lib/motion";

const tree = [
  { id: "customer", level: 0 },
  { id: "intake", level: 1 },
  { id: "operations", level: 2 },
  { id: "staff", level: 3, branch: true },
  { id: "parking", level: 3, branch: true },
  { id: "dispatch", level: 3, branch: true },
  { id: "payment", level: 4 },
  { id: "management", level: 5 },
  { id: "accounting", level: 6 },
] as const;

type Props = {
  project?: Project | null;
};

export function FeaturedSystem({ project }: Props) {
  const t = useTranslations("Home.featured");
  const locale = useLocale() as "ar" | "en";
  const reduced = usePrefersReducedMotion();

  if (!project) return null;

  return (
    <section className="bg-[var(--navy)] text-white">
      <div className="section-pad mx-auto max-w-6xl py-20 md:py-28">
        <p className="tech-label text-[11px] text-[var(--signal-hot)]">
          SYSTEM / {project.id}
        </p>
        <h2 className="font-display mt-4 text-5xl md:text-7xl">
          {project.title[locale]}
        </h2>
        <p className="mt-3 text-lg text-white/65 md:text-xl">
          {project.descriptor[locale]}
        </p>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <p className="max-w-md text-white/70">{t("body")}</p>
          <div className="relative space-y-3 border-s border-white/15 ps-6">
            {tree.map((node, index) => (
              <motion.div
                key={node.id}
                initial={reduced ? false : { opacity: 0, x: locale === "ar" ? 12 : -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ delay: reduced ? 0 : index * 0.05, duration: 0.35 }}
                className="flex items-center gap-3"
                style={{ marginInlineStart: node.level * 12 }}
              >
                <span className="size-2 rounded-full bg-[var(--signal)]" />
                <span className="tech-label text-[11px] text-white/80">
                  {t(`nodes.${node.id}`)}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        <Link
          href={`/work/${project.slug}`}
          className="btn-primary mt-12 inline-flex"
        >
          {t("cta")}
        </Link>
      </div>
    </section>
  );
}
