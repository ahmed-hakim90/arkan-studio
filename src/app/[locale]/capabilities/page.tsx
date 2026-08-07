import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { pageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

const keys = [
  "business",
  "operations",
  "platforms",
  "commerce",
  "ai",
  "experiences",
] as const;

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Capabilities" });
  return pageMetadata({
    locale,
    path: "/capabilities",
    title: t("title"),
    description: t("subtitle"),
  });
}

export default async function CapabilitiesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Capabilities");
  const nav = await getTranslations("Nav");

  return (
    <section className="section-pad py-12 md:py-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-display text-5xl md:text-6xl">{t("title")}</h1>
        <p className="mt-3 max-w-2xl text-[var(--muted)]">{t("subtitle")}</p>

        <div className="mt-14 space-y-0 border-y border-[var(--line)]">
          {keys.map((key, index) => (
            <article
              key={key}
              className="grid gap-6 border-b border-[var(--line)] py-12 last:border-b-0 lg:grid-cols-[5rem_1fr]"
            >
              <p className="tech-label text-[11px] text-[var(--muted)]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <div>
                <h2 className="font-display text-3xl md:text-4xl">
                  {t(`items.${key}.title`)}
                </h2>
                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  <div>
                    <p className="tech-label text-[10px] text-[var(--signal)]">
                      {t("whatSolves")}
                    </p>
                    <p className="mt-2 text-[var(--muted)]">
                      {t(`items.${key}.solves`)}
                    </p>
                  </div>
                  <div>
                    <p className="tech-label text-[10px] text-[var(--signal)]">
                      {t("whatWeBuild")}
                    </p>
                    <p className="mt-2 text-[var(--muted)]">
                      {t(`items.${key}.builds`)}
                    </p>
                  </div>
                  <div>
                    <p className="tech-label text-[10px] text-[var(--signal)]">
                      {t("whoUses")}
                    </p>
                    <p className="mt-2 text-[var(--muted)]">
                      {t(`items.${key}.users`)}
                    </p>
                  </div>
                  <div>
                    <p className="tech-label text-[10px] text-[var(--signal)]">
                      {t("commonModules")}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {(t.raw(`items.${key}.modules`) as string[]).map((m) => (
                        <span
                          key={m}
                          className="rounded-[var(--radius-xs)] border border-[var(--line)] px-2 py-1 tech-label text-[10px]"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <p className="tech-label text-[10px] text-[var(--signal)]">
                      {t("commonIntegrations")}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {(t.raw(`items.${key}.integrations`) as string[]).map(
                        (m) => (
                          <span
                            key={m}
                            className="rounded-[var(--radius-xs)] border border-[var(--line)] px-2 py-1 tech-label text-[10px]"
                          >
                            {m}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold">
                  <Link href="/work" className="text-[var(--signal)] hover:underline">
                    {t("exploreWork")}
                  </Link>
                  <Link href="/start" className="text-[var(--navy)] hover:underline">
                    {t("startWith")}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <Link href="/start" className="btn-primary mt-12">
          {nav("start")} ↗
        </Link>
      </div>
    </section>
  );
}
