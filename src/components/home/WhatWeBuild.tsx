"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { usePrefersReducedMotion } from "@/lib/motion";

const ids = [
  { id: "business", hash: "cap-business" },
  { id: "operations", hash: "cap-operations" },
  { id: "platforms", hash: "cap-platforms" },
  { id: "commerce", hash: "cap-commerce" },
  { id: "ai", hash: "cap-ai" },
  { id: "experiences", hash: "cap-experiences" },
] as const;

type ItemId = (typeof ids)[number]["id"];

export function WhatWeBuild() {
  const t = useTranslations("Home.whatWeBuild");
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState<ItemId>("business");

  return (
    <section className="border-y border-[var(--line)] bg-[var(--surface)]">
      <div className="section-pad canvas grid gap-10 py-16 md:gap-12 md:py-24 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
          <p className="tech-label text-xs text-[var(--muted)] md:text-[13px]">
            {t("eyebrow")}
          </p>
          <h2 className="font-display mt-3 max-w-[12ch] text-4xl tracking-[-0.03em] text-[var(--carbon)] md:text-5xl lg:leading-[1.05]">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-[36ch] text-lg leading-relaxed text-[var(--muted)] md:text-xl">
            {t("support")}
          </p>
          <p className="mt-4 max-w-[40ch] text-base font-medium text-[var(--foreground)]">
            {t("lead")}
          </p>
          <p className="mt-3 max-w-[42ch] text-sm leading-relaxed text-[var(--muted)]">
            {t("body")}
          </p>
          <p className="mt-6 tech-label text-xs text-[var(--oxide)] md:text-[13px]">
            {t("count")}
          </p>
        </div>

        <div className="lg:col-span-8">
          <ul className="border-t border-[var(--line)]">
            {ids.map((item, index) => {
              const on = active === item.id;
              const modules = t.raw(`items.${item.id}.modules`) as string[];
              const integrations = t.raw(
                `items.${item.id}.integrations`,
              ) as string[];

              return (
                <li key={item.id}>
                  <motion.div
                    initial={reduced ? false : { opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      delay: reduced ? 0 : index * 0.04,
                      duration: 0.3,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onMouseEnter={() => setActive(item.id)}
                    onFocusCapture={() => setActive(item.id)}
                    className={`border-b border-[var(--line)] transition-colors duration-200 ${
                      on ? "bg-[var(--paper-soft)]" : "bg-transparent"
                    }`}
                  >
                    <Link
                      href={`/capabilities#${item.hash}`}
                      className={`group block border-s-[3px] py-4 ps-5 pe-4 transition-[border-color] duration-200 md:py-5 md:ps-7 md:pe-5 ${
                        on
                          ? "border-[var(--oxide)]"
                          : "border-transparent hover:border-[var(--line-strong)]"
                      }`}
                      data-active={on ? "true" : "false"}
                      aria-current={on ? "true" : undefined}
                    >
                      <div className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-4 md:grid-cols-[3.25rem_minmax(0,1fr)] md:gap-x-5">
                        <span className="tech-label pt-1 text-xs tabular-nums text-[var(--muted)] md:text-sm">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                            <h3 className="font-display text-[1.65rem] leading-tight tracking-tight text-[var(--carbon)] md:text-[2rem]">
                              {t(`items.${item.id}.title`)}
                            </h3>
                            <span
                              className={`tech-label text-xs transition-opacity duration-200 md:text-[13px] ${
                                on
                                  ? "text-[var(--oxide)] opacity-100"
                                  : "opacity-0"
                              }`}
                            >
                              {t("explore")} →
                            </span>
                          </div>

                          <p className="mt-2 max-w-[52ch] text-base leading-snug text-[var(--muted)] md:text-lg md:leading-relaxed">
                            {t(`items.${item.id}.line`)}
                          </p>

                          <AnimatePresence initial={false}>
                            {on ? (
                              <motion.div
                                key={`${item.id}-detail`}
                                initial={
                                  reduced ? false : { opacity: 0, y: 4 }
                                }
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <div className="mt-4 grid gap-4 border-t border-[var(--line)] pt-4 md:grid-cols-2 md:gap-5">
                                  <div>
                                    <p className="tech-label text-xs text-[var(--muted)]">
                                      {t("solves")}
                                    </p>
                                    <p className="mt-1.5 text-base leading-relaxed text-[var(--carbon)]">
                                      {t(`items.${item.id}.solves`)}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="tech-label text-xs text-[var(--muted)]">
                                      {t("builds")}
                                    </p>
                                    <p className="mt-1.5 text-base leading-relaxed text-[var(--carbon)]">
                                      {t(`items.${item.id}.builds`)}
                                    </p>
                                  </div>
                                </div>

                                <div className="mt-4">
                                  <p className="tech-label text-xs text-[var(--muted)]">
                                    {t("modules")}
                                  </p>
                                  <ul className="mt-2 flex flex-wrap gap-2">
                                    {modules.map((mod) => (
                                      <li
                                        key={mod}
                                        className="border border-[var(--line-strong)] bg-[var(--surface)] px-3 py-1.5 text-sm text-[var(--carbon)]"
                                      >
                                        {mod}
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
                                  <div>
                                    <p className="tech-label text-xs text-[var(--muted)]">
                                      {t("integrations")}
                                    </p>
                                    <p className="mt-1.5 text-base text-[var(--muted)]">
                                      {integrations.join(" · ")}
                                    </p>
                                  </div>
                                  <div className="text-end">
                                    <p className="tech-label text-xs text-[var(--muted)]">
                                      {t("proof")}
                                    </p>
                                    <p className="mt-1.5 text-base font-medium text-[var(--oxide)]">
                                      {t(`items.${item.id}.proof`)}
                                    </p>
                                  </div>
                                </div>
                              </motion.div>
                            ) : null}
                          </AnimatePresence>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
