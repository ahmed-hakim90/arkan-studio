"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { pillarOrder } from "@/content/team";
import type { PillarId } from "@/content/types";
import { Link } from "@/i18n/navigation";

export function SixArkanDeep() {
  const t = useTranslations("Studio");
  const tp = useTranslations("Pillars");
  const th = useTranslations("Home.six");
  const tNav = useTranslations("Nav");
  const [active, setActive] = useState<PillarId | null>(pillarOrder[0]);
  const [openMobile, setOpenMobile] = useState<PillarId | null>(pillarOrder[0]);

  return (
    <div id="six">
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="tech-label text-[11px] text-[var(--volt)]">
            {t("sixEyebrow")}
          </p>
          <h2 className="type-h2 mt-3">{t("sixTitle")}</h2>
        </div>
        <p className="max-w-2xl text-[var(--muted)] lg:col-span-5">
          {t("sixSupport")}
        </p>
      </div>

      <div className="mt-10 hidden gap-3 md:grid md:grid-cols-3 xl:grid-cols-6">
        {pillarOrder.map((pillar, index) => {
          const on = active === pillar;
          return (
            <button
              key={pillar}
              type="button"
              onMouseEnter={() => setActive(pillar)}
              onFocus={() => setActive(pillar)}
              onClick={() => setActive(pillar)}
              className={`flex min-h-[180px] flex-col justify-between border p-4 text-start transition ${
                on
                  ? "border-[var(--ink)] bg-[var(--ink)] text-white shadow-[0_16px_36px_rgba(11,18,32,0.2)]"
                  : "border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--volt)]"
              }`}
            >
              <span
                className={`tech-label text-[10px] ${
                  on ? "text-[var(--volt-hot)]" : "text-[var(--muted)]"
                }`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-display mt-4 block text-xl tracking-tight">
                {tp(pillar)}
              </span>
              <span
                className={`mt-3 block text-sm leading-relaxed ${
                  on ? "text-white/65" : "text-[var(--muted)]"
                }`}
              >
                {th(`items.${pillar}.line`)}
              </span>
            </button>
          );
        })}
      </div>

      {active ? (
        <div className="mt-3 hidden border border-[var(--line)] bg-[var(--paper-soft)] p-6 md:grid md:grid-cols-2 md:gap-8 md:p-8">
          <div>
            <p className="tech-label text-[10px] text-[var(--volt)]">
              {t("input")}
            </p>
            <p className="mt-2 text-[var(--muted)]">{tp(`${active}Desc`)}</p>
          </div>
          <div>
            <p className="tech-label text-[10px] text-[var(--volt)]">
              {t("output")}
            </p>
            <p className="mt-2 text-[var(--muted)]">{t("sixCollaborate")}</p>
            <Link
              href="/approach"
              className="mt-4 inline-block text-sm font-semibold text-[var(--volt)] hover:underline"
            >
              {tNav("approach")} →
            </Link>
          </div>
        </div>
      ) : null}

      <div className="mt-8 space-y-2 md:hidden">
        {pillarOrder.map((pillar, index) => {
          const open = openMobile === pillar;
          return (
            <div
              key={pillar}
              className={`border ${
                open
                  ? "border-[var(--ink)] bg-[var(--ink)] text-white"
                  : "border-[var(--line)] bg-[var(--surface)]"
              }`}
            >
              <button
                type="button"
                className="flex w-full items-center gap-4 px-4 py-4 text-start"
                aria-expanded={open}
                onClick={() => setOpenMobile(open ? null : pillar)}
              >
                <span
                  className={`tech-label text-[10px] ${
                    open ? "text-[var(--volt-hot)]" : "text-[var(--muted)]"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-display flex-1 text-xl">{tp(pillar)}</span>
              </button>
              {open ? (
                <div className="space-y-4 px-4 pb-5">
                  <p className="text-sm text-white/65">
                    {th(`items.${pillar}.line`)}
                  </p>
                  <div>
                    <p className="tech-label text-[10px] text-[var(--volt-hot)]">
                      {t("input")}
                    </p>
                    <p className="mt-1 text-sm text-white/70">
                      {tp(`${pillar}Desc`)}
                    </p>
                  </div>
                  <div>
                    <p className="tech-label text-[10px] text-[var(--volt-hot)]">
                      {t("output")}
                    </p>
                    <p className="mt-1 text-sm text-white/70">
                      {t("sixCollaborate")}
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
