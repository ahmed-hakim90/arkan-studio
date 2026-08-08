"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { Link } from "@/i18n/navigation";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function LocaleError({ error, reset }: Props) {
  const t = useTranslations("Errors");

  useEffect(() => {
    console.error("[arkan-error]", error.digest ?? "client");
  }, [error]);

  return (
    <section className="section-pad flex min-h-[50vh] items-center py-20">
      <div className="canvas">
        <p className="tech-label text-[11px] text-[var(--signal)]">
          {t("eyebrow")}
        </p>
        <h1 className="font-display type-h1 mt-3">{t("title")}</h1>
        <p className="mt-3 max-w-lg text-[var(--muted)]">{t("body")}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="btn-primary"
          >
            {t("retry")}
          </button>
          <Link href="/" className="btn-ghost-dark">
            {t("home")}
          </Link>
        </div>
      </div>
    </section>
  );
}
