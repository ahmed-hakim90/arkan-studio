"use client";

import { useLocale, useTranslations } from "next-intl";
import type { CapabilityId, Project } from "@/content/types";
import { Link } from "@/i18n/navigation";

const CAPS: CapabilityId[] = [
  "product",
  "ux",
  "frontend",
  "backend",
  "data",
  "ai",
  "integrations",
  "operations",
];

type Props = {
  projects: Project[];
};

/** Chapter 10 — evidence matrix: capability × real projects. */
export function CapabilityMatrix({ projects }: Props) {
  const t = useTranslations("Home.capabilityMatrix");
  const tAtlas = useTranslations("Atlas.capabilities");
  const locale = useLocale() as "ar" | "en";

  return (
    <section className="bg-[var(--bone)]">
      <div className="section-pad canvas py-20 md:py-28">
        <p className="tech-label text-[11px] text-[var(--muted)]">
          {t("eyebrow")}
        </p>
        <h2 className="font-display mt-3 max-w-[20ch] text-4xl text-[var(--carbon)] md:text-5xl">
          {t("title")}
        </h2>
        <p className="mt-4 max-w-[42ch] text-base text-[var(--muted)] md:text-lg">
          {t("support")}
        </p>

        <ul className="mt-12 divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {CAPS.map((cap) => {
            const used = projects.filter((p) => p.capabilities.includes(cap));
            if (used.length === 0) return null;
            return (
              <li
                key={cap}
                className="grid gap-4 py-6 md:grid-cols-[minmax(8rem,14rem)_minmax(0,1fr)] md:items-start md:gap-8"
              >
                <p className="font-display text-xl tracking-tight text-[var(--carbon)] md:text-2xl">
                  {tAtlas(cap)}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {used.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/work/${p.slug}`}
                        className="inline-flex max-w-full items-center gap-2 border border-[var(--line)] bg-[var(--surface)] px-3 py-2 tech-label text-[10px] text-[var(--carbon)] transition hover:border-[var(--oxide)]"
                      >
                        <span className="shrink-0 text-[var(--muted)]">
                          {p.id}
                        </span>
                        <span className="truncate">{p.title[locale]}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
