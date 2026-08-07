import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("Errors");

  return (
    <section className="section-pad flex min-h-[55vh] items-center py-20">
      <div className="mx-auto max-w-6xl">
        <p className="tech-label text-[11px] text-[var(--signal)]">
          ERR / 404
        </p>
        <h1 className="font-display mt-4 text-4xl md:text-5xl">
          {t("notFoundTitle")}
        </h1>
        <p className="mt-4 max-w-xl text-[var(--muted)]">{t("notFoundBody")}</p>
        <Link href="/" className="btn-primary mt-8">
          {t("notFoundCta")}
        </Link>
      </div>
    </section>
  );
}
