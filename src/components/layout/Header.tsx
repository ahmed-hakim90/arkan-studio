"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, usePathname } from "@/i18n/navigation";
import { LocaleSwitcher } from "./LocaleSwitcher";

const links = [
  { href: "/work" as const, key: "work" },
  { href: "/capabilities" as const, key: "capabilities" },
  { href: "/approach" as const, key: "approach" },
  { href: "/studio" as const, key: "studio" },
  { href: "/team" as const, key: "team" },
];

const SCROLL_COMPRESS_AT = 120;
const NAV_TALL = "h-[5.25rem]";
const NAV_COMMAND = "h-14";

export function Header() {
  const t = useTranslations("Nav");
  const tA11y = useTranslations("A11y");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const onHero = pathname === "/";
  const command = scrolled && !open;
  const heroChrome = onHero && !open && !command;
  const ctaArrow = locale === "ar" ? "←" : "→";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_COMPRESS_AT);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const offset = command ? "var(--header-command)" : "var(--header-tall)";
    document.documentElement.style.setProperty("--header-offset", offset);
    return () => {
      document.documentElement.style.setProperty(
        "--header-offset",
        "var(--header-tall)",
      );
    };
  }, [command]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !sheetRef.current) return;
      const focusable = sheetRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const linkTone = (active: boolean) => {
    if (active) return "text-[var(--volt)]";
    if (heroChrome) return "text-white/70 hover:text-white";
    return "text-[var(--muted)] hover:text-[var(--ink)]";
  };

  const closeMenu = () => {
    setOpen(false);
    menuButtonRef.current?.focus();
  };

  const drawer =
    mounted && open
      ? createPortal(
          <div
            className="fixed inset-0 z-[100] md:hidden"
            role="presentation"
          >
            <button
              type="button"
              className="absolute inset-0 bg-[color-mix(in_oklab,var(--ink)_60%,transparent)] backdrop-blur-sm"
              aria-label={tA11y("closeMenu")}
              onClick={closeMenu}
            />
            <div
              ref={sheetRef}
              id={menuId}
              role="dialog"
              aria-modal="true"
              aria-label={tA11y("mobileNav")}
              className="nav-drawer fixed inset-y-0 end-0 flex h-dvh max-h-dvh w-[min(100%,22rem)] flex-col bg-[var(--paper)] text-[var(--ink)] shadow-[-18px_0_50px_rgba(11,18,32,0.35)]"
            >
              <div className="flex h-[5.25rem] shrink-0 items-center justify-between border-b border-[var(--line)] px-5">
                <Link
                  href="/"
                  className="group flex flex-col leading-none"
                  onClick={() => setOpen(false)}
                >
                  <span className="font-display text-2xl transition group-hover:text-[var(--volt)]">
                    ARKAN
                  </span>
                  <span className="mt-1 text-xs text-[var(--muted)]" dir="rtl">
                    أركان
                  </span>
                </Link>
                <button
                  ref={closeButtonRef}
                  type="button"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-xs)] border border-[var(--line)]"
                  aria-label={tA11y("closeMenu")}
                  onClick={closeMenu}
                >
                  <span className="relative block h-3 w-3" aria-hidden>
                    <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 rotate-45 bg-current" />
                    <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 -rotate-45 bg-current" />
                  </span>
                </button>
              </div>

              <nav
                className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-5 py-8"
                aria-label={tA11y("mobileNav")}
              >
                {links.map((link, index) => {
                  const active =
                    pathname === link.href ||
                    pathname.startsWith(`${link.href}/`);
                  return (
                    <Link
                      key={link.key}
                      ref={index === 0 ? firstLinkRef : undefined}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`border-b border-[var(--line)] py-5 font-display text-2xl transition ${
                        active
                          ? "text-[var(--volt)]"
                          : "text-[var(--ink)] hover:text-[var(--volt)]"
                      }`}
                    >
                      <span
                        className={
                          active
                            ? "underline decoration-[var(--volt)] decoration-2 underline-offset-8"
                            : ""
                        }
                      >
                        {t(link.key)}
                      </span>
                    </Link>
                  );
                })}
              </nav>

              <div className="flex shrink-0 flex-col gap-4 border-t border-[var(--line)] bg-[var(--surface)] px-5 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
                <div className="flex items-center justify-between gap-3">
                  <LocaleSwitcher />
                </div>
                <Link
                  href="/start"
                  onClick={() => setOpen(false)}
                  className="btn-primary w-full text-center"
                >
                  <span>{t("start")}</span>
                  <span aria-hidden>{ctaArrow}</span>
                </Link>
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <header
        className={`section-pad sticky top-0 z-50 border-b backdrop-blur-xl transition-[height,background,border-color] duration-[var(--motion-base)] ${
          heroChrome
            ? "border-white/10 bg-[color-mix(in_oklab,var(--ink)_78%,transparent)] text-white"
            : "border-[var(--line)] bg-[color-mix(in_oklab,var(--paper)_88%,transparent)] text-[var(--ink)]"
        } ${command ? NAV_COMMAND : NAV_TALL}`}
      >
        <div
          className={`canvas grid grid-cols-[auto_1fr_auto] items-center gap-4 ${
            command ? NAV_COMMAND : NAV_TALL
          }`}
        >
          <Link
            href="/"
            className="group flex flex-col justify-center leading-none"
            onClick={() => setOpen(false)}
          >
            <span
              className={`font-display tracking-tight transition group-hover:text-[var(--volt)] ${
                command ? "text-lg" : "text-[1.65rem]"
              }`}
            >
              ARKAN
            </span>
            <span
              className={`mt-1 text-[0.7rem] uppercase tracking-[0.18em] transition ${
                command ? "hidden sm:inline" : "hidden sm:inline"
              } ${heroChrome ? "text-white/50" : "text-[var(--muted)]"}`}
              dir="rtl"
            >
              أركان
            </span>
          </Link>

          <nav
            className="hidden items-center justify-center gap-1 md:flex"
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
                  className={`relative rounded-[var(--radius-xs)] px-3 py-2 text-sm font-semibold tracking-[-0.01em] transition ${linkTone(active)} ${
                    active
                      ? "bg-[color-mix(in_oklab,var(--volt)_12%,transparent)] after:absolute after:inset-x-3 after:bottom-1 after:h-0.5 after:bg-[var(--volt)]"
                      : ""
                  }`}
                >
                  {t(link.key)}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center justify-end gap-3">
            <div className="hidden md:block">
              <LocaleSwitcher light={heroChrome} />
            </div>
            <Link
              href="/start"
              className="btn-primary hidden !min-h-11 !px-4 !py-2 !text-xs sm:inline-flex"
            >
              <span>{t("start")}</span>
              <span aria-hidden>{ctaArrow}</span>
            </Link>
            <button
              ref={menuButtonRef}
              type="button"
              className={`inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-xs)] border md:hidden ${
                heroChrome ? "border-white/25" : "border-[var(--line)]"
              }`}
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={tA11y("menu")}
              onClick={() => setOpen((value) => !value)}
            >
              <span className="flex flex-col gap-1.5" aria-hidden>
                <span className="block h-0.5 w-4 bg-current" />
                <span className="block h-0.5 w-4 bg-current" />
                <span className="block h-0.5 w-3 bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>
      {drawer}
    </>
  );
}
