import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CookieSettingsButton } from "@/components/cookies/CookieSettingsButton";
import { pageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Cookies" });
  return pageMetadata({
    locale,
    path: "/cookies",
    title: t("pageTitle"),
    description: t("pageIntro"),
  });
}

export default async function CookiesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Cookies");

  const rows = [
    {
      name: t("essential"),
      desc: t("essentialDesc"),
      required: true,
    },
    {
      name: t("preferences"),
      desc: t("preferencesDesc"),
      required: false,
    },
    {
      name: t("analytics"),
      desc: t("analyticsDesc"),
      required: false,
    },
  ];

  return (
    <section className="section-pad py-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-4xl md:text-5xl">{t("pageTitle")}</h1>
        <p className="mt-6 text-[var(--muted)]">{t("pageIntro")}</p>

        <div className="mt-10 space-y-4">
          {rows.map((row) => (
            <div
              key={row.name}
              className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5"
            >
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-display text-xl">{row.name}</h2>
                {row.required ? (
                  <span className="pill" data-active="true">
                    {t("required")}
                  </span>
                ) : (
                  <span className="pill">{t("optional")}</span>
                )}
              </div>
              <p className="mt-2 text-sm text-[var(--muted)]">{row.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <CookieSettingsButton />
        </div>
      </div>
    </section>
  );
}
