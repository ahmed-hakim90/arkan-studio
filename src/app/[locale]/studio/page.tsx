import type { Metadata } from "next";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { SixArkanDeep } from "@/components/studio/SixArkanDeep";
import { TeamNetwork } from "@/components/studio/TeamNetwork";
import { Link } from "@/i18n/navigation";
import { getTeam } from "@/lib/content/team";
import { pageMetadata } from "@/lib/seo";
import { getSeoCopy } from "@/lib/seo-messages";
import type { LocaleKey } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getSeoCopy(locale, "Studio");
  return pageMetadata({
    locale,
    path: "/studio",
    title: seo.title,
    description: seo.description,
  });
}

export default async function StudioPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Studio");
  const tp = await getTranslations("Pillars");
  const loc = (await getLocale()) as LocaleKey;
  const team = await getTeam();

  return (
    <section className="section-pad py-14 md:py-20">
      <div className="canvas space-y-20">
        <header className="grid gap-8 border-b border-[var(--line)] pb-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="tech-label text-[11px] text-[var(--volt)]">
              {t("eyebrow")}
            </p>
            <h1 className="type-display mt-4 max-w-[12ch] text-[var(--ink)]">
              {t("title")}
            </h1>
          </div>
          <div className="lg:col-span-5">
            <p className="type-body-l text-[var(--muted)]">{t("subtitle")}</p>
            <p className="mt-4 text-base font-semibold text-[var(--ink)]">
              {t("lead")}
            </p>
            <p className="mt-3 text-base leading-relaxed text-[var(--muted)]">
              {t("body")}
            </p>
          </div>
        </header>

        <SixArkanDeep />

        <div>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="type-h2">{t("teamTitle")}</h2>
            <Link
              href="/team"
              className="text-sm font-semibold text-[var(--volt)] underline decoration-[var(--line-signal)] underline-offset-4"
            >
              {t("teamPageLink")}
            </Link>
          </div>
          <div className="mt-10">
            <TeamNetwork />
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {team.map((member, index) => (
              <div
                key={member.id}
                className={`border p-5 ${
                  index % 2 === 0
                    ? "border-[var(--line)] bg-[var(--surface)]"
                    : "border-[var(--ink)] bg-[var(--ink)] text-white"
                }`}
              >
                <p
                  className={`tech-label text-[10px] ${
                    index % 2 === 0 ? "text-[var(--volt)]" : "text-[var(--volt-hot)]"
                  }`}
                >
                  {tp(member.pillar)}
                </p>
                <h3 className="font-display mt-3 text-2xl">
                  {member.name[loc]}
                </h3>
                <p
                  className={`mt-2 text-sm ${
                    index % 2 === 0 ? "text-[var(--muted)]" : "text-white/65"
                  }`}
                >
                  {member.role[loc]}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="type-h2">{t("methodTitle")}</h2>
          <div className="mt-8 space-y-3">
            {(
              [
                "workFirst",
                "systemBeforeScreens",
                "whatIsNeeded",
                "operations",
                "oneResponsibility",
                "afterLaunch",
              ] as const
            ).map((key, index) => {
              const odd = index % 2 === 1;
              return (
                <div
                  key={key}
                  className={`grid gap-4 border p-5 md:grid-cols-[5rem_1fr] md:p-7 ${
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
                  <div>
                    <h3 className="font-display text-2xl">
                      {t(`why.${key}.title`)}
                    </h3>
                    <p
                      className={`mt-2 max-w-2xl ${
                        odd ? "text-white/65" : "text-[var(--muted)]"
                      }`}
                    >
                      {t(`why.${key}.body`)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
