"use client";

import { useId, useState, type ReactNode } from "react";

export function Accordion({
  title,
  subtitle,
  badge,
  defaultOpen = false,
  children,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  badge?: ReactNode;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <div className="admin-card overflow-hidden">
      <button
        type="button"
        className="flex w-full items-center gap-3 px-4 py-4 text-start sm:px-5"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <span
          className={`grid h-8 w-8 shrink-0 place-items-center rounded-[var(--radius-xs)] border border-[var(--line)] bg-[var(--bone)] text-[var(--muted)] transition ${
            open ? "rotate-90 bg-[var(--ink)] text-white border-[var(--ink)]" : ""
          }`}
          aria-hidden
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-medium tracking-tight">{title}</span>
          {subtitle ? (
            <span className="mt-0.5 block text-xs text-[var(--muted)]">{subtitle}</span>
          ) : null}
        </span>
        {badge ? <span className="shrink-0">{badge}</span> : null}
      </button>
      <div
        id={panelId}
        hidden={!open}
        className="border-t border-[var(--line)] px-4 py-4 sm:px-5"
      >
        {children}
      </div>
    </div>
  );
}
