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
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--signal)]">
          {t("eyebrow")}
        </p>
        <h1 className="font-display mt-3 text-4xl font-bold">{t("title")}</h1>
        <p className="mt-3 max-w-lg text-[var(--muted)]">{t("body")}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-sm bg-[var(--bronze)] px-5 py-3 text-sm font-semibold text-[var(--ink)]"
          >
            {t("retry")}
          </button>
          <Link
            href="/"
            className="rounded-sm border border-[var(--line)] px-5 py-3 text-sm text-[var(--paper)]"
          >
            {t("home")}
          </Link>
        </div>
      </div>
    </section>
  );
}
