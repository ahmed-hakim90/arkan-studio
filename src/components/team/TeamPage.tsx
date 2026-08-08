"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { CmsTeamMember } from "@/lib/content/team";
import { usePrefersReducedMotion } from "@/lib/motion";
import type { LocaleKey } from "@/lib/site";

type Props = {
  locale: LocaleKey;
  members: CmsTeamMember[];
  pillars: Record<string, string>;
};

const methodKeys = [
  "workFirst",
  "systemBeforeScreens",
  "oneResponsibility",
  "afterLaunch",
] as const;

const linkLabels = {
  linkedin: "LinkedIn",
  github: "GitHub",
  x: "X",
  website: "Web",
} as const;

export function TeamPage({ locale, members, pillars }: Props) {
  const t = useTranslations("Team");
  const tNav = useTranslations("Nav");
  const tA11y = useTranslations("A11y");
  const reduced = usePrefersReducedMotion();

  return (
    <section className="section-pad py-14 md:py-20">
      <div className="canvas space-y-20">
        <header className="relative overflow-hidden border border-[var(--line)] bg-[var(--ink)] px-6 py-12 text-white md:px-10 md:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 100% 0%, rgba(21,94,239,0.35), transparent 55%)",
            }}
          />
          <div className="relative">
            <p className="tech-label text-[11px] text-[var(--volt-hot)]">
              {t("eyebrow")}
            </p>
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="font-display mt-5 text-[clamp(3.5rem,10vw,7rem)] leading-[0.86] tracking-[-0.05em]"
            >
              ARKAN
            </motion.p>
            <motion.h1
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: reduced ? 0 : 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="type-h1 mt-4 max-w-[16ch]"
            >
              {t("title")}
            </motion.h1>
            <p className="mt-5 max-w-2xl type-body-l text-white/70">
              {t("subtitle")}
            </p>
            <p className="mt-4 max-w-2xl text-base font-semibold text-white">
              {t("lead")}
            </p>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-white/55">
              {t("body")}
            </p>
          </div>
        </header>

        <section aria-labelledby="team-who">
          <p className="tech-label text-[11px] text-[var(--volt)]">
            {t("whoEyebrow")}
          </p>
          <h2 id="team-who" className="type-h2 mt-3 max-w-[20ch] text-[var(--ink)]">
            {t("whoTitle")}
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--muted)]">{t("whoBody")}</p>
        </section>

        <section aria-labelledby="team-members">
          <div className="grid gap-4 border-b border-[var(--line)] pb-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="tech-label text-[11px] text-[var(--volt)]">
                {t("membersEyebrow")}
              </p>
              <h2 id="team-members" className="type-h2 mt-2 text-[var(--ink)]">
                {t("membersTitle")}
              </h2>
            </div>
            <p className="max-w-sm text-sm text-[var(--muted)] lg:col-span-5">
              {t("membersLead")}
            </p>
          </div>

          <ul className="mt-8 grid gap-4 lg:grid-cols-2">
            {members.map((member, index) => {
              const links = Object.entries(member.links ?? {}).filter(
                ([, href]) => Boolean(href),
              ) as [keyof typeof linkLabels, string][];
              const odd = index % 2 === 1;

              return (
                <motion.li
                  key={member.id}
                  initial={reduced ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.45,
                    delay: reduced ? 0 : index * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`border p-6 md:p-7 ${
                    odd
                      ? "border-[var(--ink)] bg-[var(--ink)] text-white"
                      : "border-[var(--line)] bg-[var(--surface)]"
                  }`}
                >
                  <p
                    className={`tech-label text-[11px] ${
                      odd ? "text-[var(--volt-hot)]" : "text-[var(--muted)]"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-display mt-3 text-3xl tracking-[-0.03em]">
                    {member.name[locale]}
                  </h3>
                  <p
                    className={`mt-2 text-sm ${
                      odd ? "text-white/65" : "text-[var(--muted)]"
                    }`}
                  >
                    {member.role[locale]}
                  </p>
                  <p
                    className={`tech-label mt-4 text-[10px] ${
                      odd ? "text-[var(--volt-hot)]" : "text-[var(--volt)]"
                    }`}
                  >
                    {pillars[member.pillar] ?? member.pillar}
                  </p>
                  {links.length ? (
                    <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                      {links.map(([key, href]) => (
                        <li key={key}>
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-sm underline underline-offset-4 transition ${
                              odd
                                ? "text-white decoration-white/30 hover:text-[var(--volt-hot)] hover:decoration-[var(--volt-hot)]"
                                : "text-[var(--ink)] decoration-[var(--line-strong)] hover:text-[var(--volt)] hover:decoration-[var(--volt)]"
                            }`}
                          >
                            {linkLabels[key]}
                            <span className="sr-only">{tA11y("newTab")}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <div className="mt-6 space-y-5">
                    {member.bio?.[locale] ? (
                      <div>
                        <p
                          className={`tech-label text-[10px] ${
                            odd ? "text-[var(--volt-hot)]" : "text-[var(--volt)]"
                          }`}
                        >
                          {t("bioLabel")}
                        </p>
                        <p
                          className={`mt-2 ${
                            odd ? "text-white/70" : "text-[var(--muted)]"
                          }`}
                        >
                          {member.bio[locale]}
                        </p>
                      </div>
                    ) : null}
                    {member.focus?.[locale] ? (
                      <div>
                        <p
                          className={`tech-label text-[10px] ${
                            odd ? "text-[var(--volt-hot)]" : "text-[var(--volt)]"
                          }`}
                        >
                          {t("focusLabel")}
                        </p>
                        <p
                          className={`mt-2 ${
                            odd ? "text-white/70" : "text-[var(--muted)]"
                          }`}
                        >
                          {member.focus[locale]}
                        </p>
                      </div>
                    ) : null}
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </section>

        <section
          aria-labelledby="team-how"
          className="border border-[var(--line)] bg-[var(--paper-soft)] p-6 md:p-10"
        >
          <p className="tech-label text-[11px] text-[var(--volt)]">
            {t("howEyebrow")}
          </p>
          <h2 id="team-how" className="type-h2 mt-3 max-w-[18ch] text-[var(--ink)]">
            {t("howTitle")}
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--muted)]">{t("howBody")}</p>

          <ol className="mt-10 grid gap-3 md:grid-cols-2">
            {methodKeys.map((key, index) => (
              <li
                key={key}
                className="border border-[var(--line)] bg-[var(--surface)] p-5"
              >
                <p className="tech-label text-[11px] text-[var(--muted)]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display mt-2 text-2xl text-[var(--ink)]">
                  {t(`how.${key}.title`)}
                </h3>
                <p className="mt-2 text-[var(--muted)]">{t(`how.${key}.body`)}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/approach" className="btn-secondary">
              {t("howCtaApproach")}
            </Link>
            <Link href="/studio" className="btn-secondary">
              {t("howCtaStudio")}
            </Link>
          </div>
        </section>

        <section className="border border-[var(--line)] bg-[var(--ink)] p-6 text-white md:flex md:items-center md:justify-between md:p-10">
          <div>
            <h2 className="type-h2 max-w-[16ch]">{t("ctaTitle")}</h2>
            <p className="mt-4 max-w-xl text-white/65">{t("ctaBody")}</p>
          </div>
          <Link href="/start" className="btn-primary mt-8 md:mt-0">
            {tNav("start")} ↗
          </Link>
        </section>
      </div>
    </section>
  );
}
