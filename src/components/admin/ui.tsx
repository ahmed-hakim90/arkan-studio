import Link from "next/link";
import type { ReactNode } from "react";
import { AdminFlashClient } from "./AdminFlashClient";

export function AdminPage({
  children,
  wide,
}: {
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <main className="admin-page">
      <div className={`admin-page-inner ${wide ? "admin-page-inner--wide" : ""}`}>
        {children}
      </div>
    </main>
  );
}

export function AdminHeader({
  eyebrow = "Arkan Control",
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--line)] pb-5">
      <div className="min-w-0">
        <p className="tech-label text-[10px] text-[var(--signal)]">{eyebrow}</p>
        <h1 className="font-display mt-2 text-[1.75rem] font-semibold tracking-tight sm:text-[2.35rem]">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex flex-wrap items-center gap-2">{actions}</div>
      ) : null}
    </header>
  );
}

export function AdminCard({
  children,
  className = "",
  padded = true,
  interactive = false,
}: {
  children: ReactNode;
  className?: string;
  padded?: boolean;
  interactive?: boolean;
}) {
  return (
    <div
      className={`admin-card ${padded ? "admin-card--padded" : ""} ${
        interactive ? "admin-card--interactive" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function AdminSection({
  title,
  description,
  children,
  id,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="scroll-mt-28 space-y-3">
      <div>
        <p className="tech-label text-[10px] text-[var(--muted)]">Section</p>
        <h2 className="font-display mt-1 text-xl font-semibold tracking-tight">{title}</h2>
        {description ? (
          <p className="mt-1 text-sm text-[var(--muted)]">{description}</p>
        ) : null}
      </div>
      <AdminCard>{children}</AdminCard>
    </section>
  );
}

export function AdminFlash({
  ok,
  error,
  okText,
  errorText,
}: {
  ok?: string | null;
  error?: string | null;
  okText?: string;
  errorText?: string;
}) {
  return (
    <AdminFlashClient ok={ok} error={error} okText={okText} errorText={errorText} />
  );
}

export function AdminStat({
  label,
  value,
  hint,
  href,
  tone = "default",
}: {
  label: string;
  value: string | number;
  hint?: string;
  href?: string;
  tone?: "default" | "signal" | "ok" | "danger";
}) {
  const tones = {
    default: "text-[var(--fg)]",
    signal: "text-[var(--signal)]",
    ok: "text-[var(--ok)]",
    danger: "text-[var(--danger)]",
  };
  const toneClass =
    tone === "signal"
      ? "admin-stat--signal"
      : tone === "ok"
        ? "admin-stat--ok"
        : tone === "danger"
          ? "admin-stat--danger"
          : "";

  const body = (
    <AdminCard
      interactive={Boolean(href)}
      className={`admin-stat ${toneClass}`}
    >
      <p className="tech-label text-[10px] text-[var(--muted)]">{label}</p>
      <p
        className={`mt-2 font-display text-[2rem] font-semibold tabular-nums tracking-tight ${tones[tone]}`}
      >
        {value}
      </p>
      {hint ? <p className="mt-1 text-xs text-[var(--muted)]">{hint}</p> : null}
    </AdminCard>
  );

  if (!href) return body;
  return (
    <Link
      href={href}
      className="block rounded-[var(--radius-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--volt)]"
    >
      {body}
    </Link>
  );
}

export function AdminEmpty({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <AdminCard className="px-6 py-14 text-center">
      <div className="admin-empty-icon" aria-hidden>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 7h16M4 12h10M4 17h13"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <p className="font-display text-xl font-semibold">{title}</p>
      {description ? (
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[var(--muted)]">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-5 flex justify-center">{action}</div> : null}
    </AdminCard>
  );
}

export function AdminBadge({
  children,
  tone = "muted",
}: {
  children: ReactNode;
  tone?: "muted" | "signal" | "ok" | "danger" | "ink";
}) {
  const tones = {
    muted: "border-[var(--line)] bg-[var(--bone)] text-[var(--muted)]",
    signal: "border-[color-mix(in_oklab,var(--volt)_35%,transparent)] bg-[var(--volt-soft)] text-[var(--volt)]",
    ok: "border-[color-mix(in_oklab,var(--ok)_30%,transparent)] bg-[color-mix(in_oklab,var(--ok)_12%,white)] text-[var(--ok)]",
    danger: "border-[color-mix(in_oklab,var(--danger)_30%,transparent)] bg-[color-mix(in_oklab,var(--danger)_8%,white)] text-[var(--danger)]",
    ink: "border-[var(--ink)] bg-[var(--ink)] text-white",
  };
  return (
    <span
      className={`inline-flex items-center rounded-[var(--radius-xs)] border px-2 py-0.5 tech-label text-[10px] ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function AdminChip({
  href,
  active,
  children,
}: {
  href: string;
  active?: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`admin-chip ${active ? "admin-chip--active" : ""}`}
      aria-current={active ? "page" : undefined}
    >
      {children}
    </Link>
  );
}

export function AdminToolbar({ children }: { children: ReactNode }) {
  return <div className="admin-toolbar">{children}</div>;
}

export function FieldLabel({
  children,
  hint,
}: {
  children: ReactNode;
  hint?: string;
}) {
  return (
    <span className="mb-1.5 block">
      <span className="tech-label block text-[10px] text-[var(--muted)]">{children}</span>
      {hint ? <span className="admin-field-hint">{hint}</span> : null}
    </span>
  );
}

export function AdminBackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-[var(--muted)] transition hover:text-[var(--fg)]"
    >
      <span aria-hidden className="text-base leading-none">
        ←
      </span>
      {label}
    </Link>
  );
}

export function AdminListRow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-5 ${className}`}
    >
      {children}
    </div>
  );
}
