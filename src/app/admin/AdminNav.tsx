"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "./actions";

type NavItem = {
  href: string;
  label: string;
  short: string;
  exact?: boolean;
  mobile?: boolean;
  icon: "home" | "leads" | "projects" | "team" | "settings" | "copy" | "media";
};

const links: NavItem[] = [
  { href: "/admin", label: "لوحة التحكم", short: "الرئيسية", exact: true, mobile: true, icon: "home" },
  { href: "/admin/leads", label: "الطلبات", short: "طلبات", mobile: true, icon: "leads" },
  { href: "/admin/projects", label: "المشاريع", short: "مشاريع", mobile: true, icon: "projects" },
  { href: "/admin/team", label: "الفريق", short: "فريق", icon: "team" },
  { href: "/admin/settings", label: "إعدادات الموقع", short: "إعدادات", icon: "settings" },
  { href: "/admin/copy", label: "النصوص", short: "نصوص", icon: "copy" },
  { href: "/admin/media", label: "الوسائط", short: "وسائط", mobile: true, icon: "media" },
];

function Icon({ name }: { name: NavItem["icon"] }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    className: "admin-nav-icon",
    "aria-hidden": true as const,
  };
  switch (name) {
    case "home":
      return (
        <svg {...common}>
          <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        </svg>
      );
    case "leads":
      return (
        <svg {...common}>
          <path d="M8 7h13M8 12h13M8 17h13M3 7h.01M3 12h.01M3 17h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "projects":
      return (
        <svg {...common}>
          <path d="M4 7a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Z" stroke="currentColor" strokeWidth="1.7" />
        </svg>
      );
    case "team":
      return (
        <svg {...common}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );
    case "settings":
      return (
        <svg {...common}>
          <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" stroke="currentColor" strokeWidth="1.7" />
          <path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a1.2 1.2 0 1 1-1.7 1.7l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V19a1.2 1.2 0 1 1-2.4 0v-.1a1 1 0 0 0-.6-.9 1 1 0 0 0-1.1.2l-.1.1a1.2 1.2 0 1 1-1.7-1.7l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H5a1.2 1.2 0 1 1 0-2.4h.1a1 1 0 0 0 .9-.6 1 1 0 0 0-.2-1.1l-.1-.1a1.2 1.2 0 1 1 1.7-1.7l.1.1a1 1 0 0 0 1.1.2 1 1 0 0 0 .6-.9V5a1.2 1.2 0 1 1 2.4 0v.1a1 1 0 0 0 .6.9 1 1 0 0 0 1.1-.2l.1-.1a1.2 1.2 0 1 1 1.7 1.7l-.1.1a1 1 0 0 0-.2 1.1 1 1 0 0 0 .9.6H19a1.2 1.2 0 1 1 0 2.4h-.1a1 1 0 0 0-.9.6Z" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      );
    case "copy":
      return (
        <svg {...common}>
          <path d="M8 8V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2M6 8h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.7" />
        </svg>
      );
    case "media":
      return (
        <svg {...common}>
          <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z" stroke="currentColor" strokeWidth="1.7" />
          <path d="m4 15 4-4 3 3 3-4 6 6" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
          <circle cx="9" cy="9" r="1.3" fill="currentColor" />
        </svg>
      );
  }
}

function isActive(pathname: string, link: NavItem) {
  return link.exact
    ? pathname === link.href
    : pathname === link.href || pathname.startsWith(`${link.href}/`);
}

export function AdminNav({
  userEmail,
  newLeads = 0,
}: {
  userEmail?: string | null;
  newLeads?: number;
}) {
  const pathname = usePathname();
  const mobileLinks = links.filter((l) => l.mobile);

  return (
    <>
      <aside className="admin-rail">
        <div className="hidden px-4 pt-6 pb-4 md:block">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-[var(--radius-xs)] bg-[var(--volt)] font-display text-sm font-bold text-white">
              AR
            </div>
            <div className="min-w-0">
              <p className="tech-label text-[10px] text-[#93a0b5]">Control</p>
              <p className="font-display truncate text-lg font-semibold">لوحة التحكم</p>
            </div>
          </div>
          {userEmail ? (
            <p
              className="mt-3 truncate border border-white/10 bg-white/5 px-2.5 py-1.5 text-[11px] text-[#93a0b5]"
              title={userEmail}
              dir="ltr"
            >
              {userEmail}
            </p>
          ) : null}
        </div>

        {/* Mobile top strip + full link rail */}
        <div className="md:hidden">
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <div className="min-w-0">
              <p className="tech-label text-[10px] text-[#93a0b5]">Control</p>
              <p className="font-display truncate text-base font-semibold">لوحة التحكم</p>
            </div>
            <form action={logoutAction}>
              <button
                type="submit"
                className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-white/85"
              >
                خروج
              </button>
            </form>
          </div>
          <nav
            className="flex gap-1 overflow-x-auto px-3 pb-3"
            aria-label="أقسام الأدمن"
          >
            {links.map((link) => {
              const active = isActive(pathname, link);
              const showBadge = link.href === "/admin/leads" && newLeads > 0;
              return (
                <Link
                  key={`m-${link.href}`}
                  href={link.href}
                  className={`admin-nav-link shrink-0 !py-2 !pe-3 !ps-2.5 text-xs ${
                    active ? "admin-nav-link--active" : ""
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon name={link.icon} />
                  <span>{link.short}</span>
                  {showBadge ? (
                    <span className="rounded-full bg-[var(--volt)] px-1.5 py-0.5 text-[10px] font-bold text-white tabular-nums">
                      {newLeads > 99 ? "99+" : newLeads}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </nav>
        </div>

        <nav className="hidden flex-1 flex-col gap-1 px-3 pb-4 md:flex" aria-label="قائمة الأدمن">
          {links.map((link) => {
            const active = isActive(pathname, link);
            const showBadge = link.href === "/admin/leads" && newLeads > 0;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`admin-nav-link ${active ? "admin-nav-link--active" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                <Icon name={link.icon} />
                <span className="flex-1">{link.label}</span>
                {showBadge ? (
                  <span className="rounded-full bg-[var(--volt)] px-1.5 py-0.5 text-[10px] font-bold text-white tabular-nums">
                    {newLeads > 99 ? "99+" : newLeads}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto hidden border-t border-white/10 px-4 py-4 md:block">
          <a
            href="/ar"
            target="_blank"
            rel="noopener noreferrer"
            className="mb-3 block text-xs text-[var(--admin-rail-muted)] underline-offset-2 hover:text-white hover:underline"
          >
            فتح الموقع العام ↗
          </a>
          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white/90 transition hover:bg-white/10"
            >
              تسجيل الخروج
            </button>
          </form>
        </div>
      </aside>

      <nav className="admin-mobile-nav" aria-label="تنقل سريع">
        {mobileLinks.map((link) => {
          const active = isActive(pathname, link);
          const showBadge = link.href === "/admin/leads" && newLeads > 0;
          return (
            <Link key={link.href} href={link.href} data-active={active}>
              <span className="relative">
                <Icon name={link.icon} />
                {showBadge ? (
                  <span className="absolute -top-1 -end-2 grid h-4 min-w-4 place-items-center rounded-full bg-[var(--volt)] px-1 text-[9px] font-bold text-white">
                    {newLeads > 9 ? "9+" : newLeads}
                  </span>
                ) : null}
              </span>
              <span>{link.short}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
