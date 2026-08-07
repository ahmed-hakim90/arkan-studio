import { getLocale, getTranslations } from "next-intl/server";
import { CookieSettingsButton } from "@/components/cookies/CookieSettingsButton";
import { Link } from "@/i18n/navigation";
import { siteConfig, type LocaleKey } from "@/lib/site";

const nav = [
  { href: "/work" as const, key: "work" },
  { href: "/capabilities" as const, key: "capabilities" },
  { href: "/approach" as const, key: "approach" },
  { href: "/studio" as const, key: "studio" },
  { href: "/start" as const, key: "start" },
];

export async function Footer() {
  const t = await getTranslations("Footer");
  const tNav = await getTranslations("Nav");
  const tA11y = await getTranslations("A11y");
  const locale = (await getLocale()) as LocaleKey;
  const year = new Date().getFullYear();

  return (
    <footer className="section-pad mt-10 border-t border-white/10 bg-[var(--navy)] py-14 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-3xl tracking-tight">ARKAN</p>
          <p className="mt-2 max-w-md text-sm text-white/65">
            {siteConfig.tagline[locale]}
          </p>
          <p className="tech-label mt-6 text-[10px] text-white/40">
            SYSTEM STATUS / READY
          </p>
        </div>

        <nav className="flex flex-col gap-2 text-sm" aria-label={tA11y("footerNav")}>
          {nav.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="text-white/65 transition hover:text-white"
            >
              {tNav(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-2 text-sm text-white/65">
          <Link href="/privacy" className="hover:text-white">
            {t("privacy")}
          </Link>
          <Link href="/terms" className="hover:text-white">
            {t("terms")}
          </Link>
          <Link href="/cookies" className="hover:text-white">
            {t("cookies")}
          </Link>
          <span className="[&_button]:text-white/65 [&_button]:font-normal [&_button:hover]:text-white [&_button:hover]:no-underline">
            <CookieSettingsButton />
          </span>
          <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
            {t("email")}
          </a>
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            GitHub
            <span className="sr-only">{tA11y("newTab")}</span>
          </a>
          <a
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            LinkedIn
            <span className="sr-only">{tA11y("newTab")}</span>
          </a>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/45 md:flex-row md:items-center md:justify-between">
        <p>
          © {year} {siteConfig.legalName}. {t("rights")}
        </p>
        <p className="text-[var(--signal-hot)]">{t("built")}</p>
      </div>
    </footer>
  );
}
