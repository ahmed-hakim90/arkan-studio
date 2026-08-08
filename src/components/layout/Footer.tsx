import { getLocale, getTranslations } from "next-intl/server";
import { CookieSettingsButton } from "@/components/cookies/CookieSettingsButton";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { Link } from "@/i18n/navigation";
import { getSiteConfig } from "@/lib/content/settings";
import type { LocaleKey } from "@/lib/site";

const nav = [
  { href: "/work" as const, key: "work" },
  { href: "/capabilities" as const, key: "capabilities" },
  { href: "/approach" as const, key: "approach" },
  { href: "/studio" as const, key: "studio" },
  { href: "/team" as const, key: "team" },
  { href: "/start" as const, key: "start" },
];

export async function Footer() {
  const t = await getTranslations("Footer");
  const tNav = await getTranslations("Nav");
  const tA11y = await getTranslations("A11y");
  const locale = (await getLocale()) as LocaleKey;
  const year = new Date().getFullYear();
  const site = await getSiteConfig();

  return (
    <footer className="section-pad mt-16 border-t border-white/10 bg-[var(--ink)] pt-0 text-white">
      <div className="canvas">
        <div className="-mx-[clamp(1.25rem,4vw,3.5rem)] mb-12 h-1 bg-[linear-gradient(90deg,var(--volt),color-mix(in_oklab,var(--ok)_65%,var(--volt)),transparent)] md:mx-0" />

        <div className="grid gap-12 py-14 md:grid-cols-[1.8fr_1fr_1fr]">
          <div>
            <p className="font-display text-5xl tracking-tight md:text-6xl">
              <span className={locale === "ar" ? "opacity-100" : "opacity-35"}>
                أركان
              </span>
              <span className="mx-3 text-white/20" aria-hidden>
                /
              </span>
              <span className={locale === "en" ? "opacity-100" : "opacity-35"}>
                ARKAN
              </span>
            </p>
            <p className="mt-4 max-w-md text-base text-white/65">
              {site.tagline[locale]}
            </p>
            <p className="tech-label mt-8 text-[10px] text-[var(--volt-hot)]">
              {t("built")}
            </p>
          </div>

          <nav
            className="flex flex-col gap-1 text-sm"
            aria-label={tA11y("footerNav")}
          >
            {nav.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="inline-flex min-h-11 items-center text-white/65 transition hover:text-white"
              >
                {tNav(item.key)}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-1 text-sm text-white/65">
            <Link
              href="/privacy"
              className="inline-flex min-h-11 items-center hover:text-white"
            >
              {t("privacy")}
            </Link>
            <Link
              href="/terms"
              className="inline-flex min-h-11 items-center hover:text-white"
            >
              {t("terms")}
            </Link>
            <Link
              href="/cookies"
              className="inline-flex min-h-11 items-center hover:text-white"
            >
              {t("cookies")}
            </Link>
            <span className="inline-flex min-h-11 items-center [&_button]:text-white/65 [&_button]:font-normal [&_button:hover]:text-white [&_button:hover]:no-underline">
              <CookieSettingsButton />
            </span>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex min-h-11 items-center hover:text-white"
            >
              {t("email")}
            </a>
            <div className="mt-4 flex items-center gap-3">
              <span className="tech-label text-[10px] text-white/40">
                {t("locale")}
              </span>
              <LocaleSwitcher light />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/10 py-6 text-xs text-white/45 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.legalName}. {t("rights")}
          </p>
          <div className="flex gap-4">
            <a
              href={site.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              GitHub
              <span className="sr-only">{tA11y("newTab")}</span>
            </a>
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              LinkedIn
              <span className="sr-only">{tA11y("newTab")}</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
