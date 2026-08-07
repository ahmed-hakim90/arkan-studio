import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function FinalCta() {
  const t = await getTranslations("Home.finalCta");

  return (
    <section className="section-pad pb-24">
      <div className="mx-auto max-w-6xl border border-[var(--line)] bg-[var(--navy)] px-6 py-14 text-white md:px-12">
        <p className="tech-label text-[11px] text-[var(--signal-hot)]">
          NEXT NODE
        </p>
        <h2 className="font-display mt-4 text-4xl md:text-6xl">{t("title")}</h2>
        <p className="mt-4 max-w-2xl text-lg text-white/65">{t("subtitle")}</p>
        <Link href="/start" className="btn-primary mt-10">
          {t("cta")}
        </Link>
      </div>
    </section>
  );
}
