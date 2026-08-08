"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { pillarOrder } from "@/content/team";

export function SixArkan() {
  const t = useTranslations("Home.six");
  const [active, setActive] = useState<string | null>(null);
  const [openMobile, setOpenMobile] = useState<string | null>(pillarOrder[0]);

  return (
    <section
      id="six"
      className="section-pad border-y border-[var(--line)] bg-[var(--paper-soft)] py-20 md:py-28"
    >
      <div className="canvas">
        <p className="tech-label text-[11px] text-[var(--muted)]">{t("eyebrow")}</p>
        <h2 className="font-display mt-3 text-4xl md:text-5xl">{t("title")}</h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted)]">
          {t("support")}
        </p>

        {/* Desktop / tablet: structural columns */}
        <div className="mt-14 hidden border-t border-[var(--line)] md:grid md:grid-cols-3 xl:grid-cols-6">
          {pillarOrder.map((pillar, index) => {
            const dim = active !== null && active !== pillar;
            return (
              <Link
                key={pillar}
                href="/studio#six"
                onMouseEnter={() => setActive(pillar)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(pillar)}
                onBlur={() => setActive(null)}
                className={`border-[var(--line)] px-4 py-8 transition-[opacity,background,transform] duration-300 hover:-translate-y-1 hover:bg-[var(--surface)] md:border-e xl:border-e ${
                  index % 3 === 2 ? "md:border-e-0 xl:border-e" : ""
                } ${index === pillarOrder.length - 1 ? "xl:border-e-0" : ""} ${
                  dim ? "opacity-45" : "opacity-100"
                }`}
              >
                <span className="tech-label text-[10px] text-[var(--muted)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-display mt-3 block text-xl tracking-tight">
                  {t(`items.${pillar}.title`)}
                </span>
                <span className="mt-3 block text-sm leading-relaxed text-[var(--muted)]">
                  {t(`items.${pillar}.line`)}
                </span>
                <span className="mt-3 block text-xs leading-relaxed text-[var(--muted)]">
                  {t(`items.${pillar}.body`)}
                </span>
                <span
                  aria-hidden
                  className={`mt-6 block h-0.5 w-10 bg-[var(--signal)] transition ${
                    active === pillar ? "opacity-100" : "opacity-0"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        {/* Mobile accordion */}
        <div className="mt-10 border-t border-[var(--line)] md:hidden">
          {pillarOrder.map((pillar, index) => {
            const open = openMobile === pillar;
            return (
              <div key={pillar} className="border-b border-[var(--line)]">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 py-4 text-start"
                  aria-expanded={open}
                  onClick={() => setOpenMobile(open ? null : pillar)}
                >
                  <span className="tech-label text-[10px] text-[var(--muted)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display flex-1 text-xl">
                    {t(`items.${pillar}.title`)}
                  </span>
                </button>
                {open ? (
                  <div className="space-y-2 pb-4">
                    <p className="text-sm text-[var(--muted)]">
                      {t(`items.${pillar}.line`)}
                    </p>
                    <p className="text-sm leading-relaxed text-[var(--muted)]">
                      {t(`items.${pillar}.body`)}
                    </p>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
