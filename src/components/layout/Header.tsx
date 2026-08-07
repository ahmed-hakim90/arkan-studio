"use client";

import { useTranslations } from "next-intl";
import { useEffect, useId, useRef, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { LocaleSwitcher } from "./LocaleSwitcher";

const links = [
  { href: "/work" as const, key: "work" },
  { href: "/capabilities" as const, key: "capabilities" },
  { href: "/approach" as const, key: "approach" },
  { href: "/studio" as const, key: "studio" },
];

export function Header() {
  const t = useTranslations("Nav");
  const tA11y = useTranslations("A11y");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const onHero = pathname === "/";
  const command = scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    firstLinkRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`section-pad sticky top-0 z-50 border-b backdrop-blur-xl transition-[height,background] duration-[var(--motion-base)] ${
        onHero && !open && !command
          ? "border-white/10 bg-[color-mix(in_oklab,var(--navy)_72%,transparent)] text-white"
          : "border-[var(--line)] bg-[color-mix(in_oklab,var(--background)_90%,transparent)] text-[var(--foreground)]"
      } ${command ? "h-12" : "h-auto"}`}
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between gap-4 ${
          command ? "h-12" : "h-[4.5rem]"
        }`}
      >
        <Link
          href="/"
          className="group flex items-baseline gap-2"
          onClick={() => setOpen(false)}
        >
          <span
            className={`font-display leading-none tracking-tight transition group-hover:text-[var(--signal)] ${
              command ? "text-lg" : "text-2xl"
            }`}
          >
            ARKAN
          </span>
          {!command ? (
            <span
              className={`hidden text-sm sm:inline ${
                onHero && !open ? "text-white/55" : "text-[var(--muted)]"
              }`}
              dir="rtl"
            >
              أركان
            </span>
          ) : (
            <span className="tech-label hidden text-[10px] text-[var(--muted)] md:inline">
              / SYSTEMS
            </span>
          )}
        </Link>

        <nav
          className="hidden items-center gap-7 md:flex"
          aria-label={tA11y("primaryNav")}
        >
          {links.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.key}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`text-sm font-medium transition ${
                  active
                    ? "text-[var(--signal)]"
                    : onHero && !command
                      ? "text-white/70 hover:text-white"
                      : "text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                {t(link.key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwitcher light={onHero && !open && !command} />
          <Link
            href="/start"
            className="btn-primary hidden !py-2 !text-xs sm:inline-flex"
          >
            {t("start")} ↗
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            className={`inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] border md:hidden ${
              onHero && !open && !command
                ? "border-white/25"
                : "border-[var(--line)]"
            }`}
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={tA11y("menu")}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="flex flex-col gap-1.5" aria-hidden>
              <span className="block h-px w-4 bg-current" />
              <span className="block h-px w-4 bg-current" />
              <span className="block h-px w-4 bg-current" />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id={menuId}
          className="mx-auto flex max-w-6xl flex-col gap-1 border-t border-[var(--line)] py-3 text-[var(--foreground)] md:hidden"
          aria-label={tA11y("mobileNav")}
        >
          {links.map((link, index) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.key}
                ref={index === 0 ? firstLinkRef : undefined}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className="rounded-[var(--radius-sm)] px-2 py-2.5 text-sm text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
              >
                {t(link.key)}
              </Link>
            );
          })}
          <Link
            href="/start"
            onClick={() => setOpen(false)}
            className="btn-primary mt-2 text-center"
          >
            {t("start")} ↗
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
