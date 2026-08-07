import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { pageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

const stages = [
  "discover",
  "map",
  "architect",
  "prototype",
  "design",
  "build",
  "integrate",
  "validate",
  "launch",
  "evolve",
] as const;

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Approach" });
  return pageMetadata({
    locale,
    path: "/approach",
    title: t("title"),
    description: t("subtitle"),
  });
}

export default async function ApproachPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Approach");
  const nav = await getTranslations("Nav");

  return (
    <section className="section-pad py-12 md:py-16">
      <div className="mx-auto max-w-6xl">
        <p className="tech-label text-[11px] text-[var(--signal)]">APPROACH</p>
        <h1 className="font-display mt-3 text-5xl md:text-6xl">{t("title")}</h1>
        <p className="mt-3 max-w-2xl text-[var(--muted)]">{t("subtitle")}</p>

        <ol className="mt-14 space-y-0 border-y border-[var(--line)]">
          {stages.map((stage, index) => (
            <li
              key={stage}
              className="grid gap-6 border-b border-[var(--line)] py-10 last:border-b-0 md:grid-cols-[5rem_12rem_1fr]"
            >
              <p className="tech-label text-[11px] text-[var(--muted)]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="font-display text-2xl">
                {t(`stages.${stage}.title`)}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {(
                  [
                    ["input", t("input")],
                    ["activity", t("activity")],
                    ["output", t("output")],
                    ["gate", t("gate")],
                  ] as const
                ).map(([key, label]) => (
                  <div key={key}>
                    <p className="tech-label text-[10px] text-[var(--signal)]">
                      {label}
                    </p>
                    <p className="mt-1 text-sm text-[var(--muted)]">
                      {t(`stages.${stage}.${key}`)}
                    </p>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ol>

        <Link href="/start" className="btn-primary mt-12">
          {nav("start")} ↗
        </Link>
      </div>
    </section>
  );
}
