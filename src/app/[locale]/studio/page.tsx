import type { Metadata } from "next";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { PillarsGrid } from "@/components/studio/PillarsGrid";
import { team } from "@/content/team";
import { pageMetadata } from "@/lib/seo";
import type { LocaleKey } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Studio" });
  return pageMetadata({
    locale,
    path: "/studio",
    title: t("title"),
    description: t("subtitle"),
  });
}

export default async function StudioPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Studio");
  const tp = await getTranslations("Pillars");
  const loc = (await getLocale()) as LocaleKey;

  return (
    <section className="section-pad py-12 md:py-16">
      <div className="mx-auto max-w-6xl space-y-20">
        <div className="bg-[var(--navy)] px-6 py-14 text-white md:px-10">
          <p className="tech-label text-[11px] text-[var(--signal-hot)]">
            STUDIO
          </p>
          <h1 className="font-display mt-4 text-5xl md:text-6xl">{t("title")}</h1>
          <p className="mt-3 text-lg text-white/70">{t("subtitle")}</p>
          <p className="mt-4 max-w-3xl text-white/60">{t("body")}</p>
        </div>

        <div>
          <h2 className="font-display text-3xl md:text-4xl">{t("teamTitle")}</h2>
          <div className="mt-10 flex flex-col items-center gap-4 text-center">
            <NetworkNode label={t("network.client")} />
            <span className="h-8 w-px bg-[var(--signal)]" aria-hidden />
            <NetworkNode label={t("network.product")} active />
            <div className="flex flex-wrap items-start justify-center gap-6">
              <NetworkNode label={t("network.ux")} />
              <NetworkNode label={t("network.engineering")} />
              <NetworkNode label={t("network.operations")} />
            </div>
            <span className="h-8 w-px bg-[var(--signal)]" aria-hidden />
            <NetworkNode label={t("network.delivery")} active />
          </div>

          <div className="mt-14 divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {team.map((member) => (
              <div
                key={member.id}
                className="grid gap-2 py-5 md:grid-cols-[1fr_1fr_auto] md:items-center"
              >
                <h3 className="font-display text-xl">{member.name[loc]}</h3>
                <p className="text-sm text-[var(--muted)]">{member.role[loc]}</p>
                <p className="tech-label text-[10px] text-[var(--signal)]">
                  {tp(member.pillar)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-display text-3xl md:text-4xl">
            {tp("product")} · {tp("experience")} · {tp("frontend")} ·{" "}
            {tp("backend")} · {tp("operations")} · {tp("growth")}
          </h2>
          <div className="mt-8">
            <PillarsGrid />
          </div>
        </div>
      </div>
    </section>
  );
}

function NetworkNode({
  label,
  active,
}: {
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={`min-w-36 border px-4 py-3 tech-label text-[11px] ${
        active
          ? "border-[var(--signal)] text-[var(--signal)]"
          : "border-[var(--line)] text-[var(--muted)]"
      }`}
    >
      {label}
    </div>
  );
}
