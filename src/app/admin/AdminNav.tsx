"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "./actions";

const links = [
  { href: "/admin/leads", label: "الطلبات" },
  { href: "/admin/projects", label: "المشاريع" },
  { href: "/admin/team", label: "الفريق" },
  { href: "/admin/settings", label: "إعدادات الموقع" },
  { href: "/admin/copy", label: "النصوص" },
  { href: "/admin/media", label: "الوسائط" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <aside className="border-b border-[var(--line)] bg-[var(--surface)] md:border-b-0 md:border-e">
      <div className="flex items-center justify-between gap-3 px-4 py-4 md:block md:px-5 md:py-6">
        <div>
          <p className="text-xs text-[var(--muted)]">Arkan Control</p>
          <p className="font-display text-xl font-semibold">لوحة التحكم</p>
        </div>
        <form action={logoutAction} className="md:mt-4">
          <button type="submit" className="btn-ghost-dark text-sm">
            خروج
          </button>
        </form>
      </div>
      <nav className="flex gap-1 overflow-x-auto px-3 pb-3 md:flex-col md:px-3 md:pb-6">
        {links.map((link) => {
          const active =
            pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm transition ${
                active
                  ? "bg-[var(--navy)] text-white"
                  : "text-[var(--muted)] hover:bg-[var(--surface-2)] hover:text-[var(--fg)]"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
