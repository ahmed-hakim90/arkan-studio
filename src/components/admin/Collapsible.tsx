"use client";

import { useId, useState, type ReactNode } from "react";

export function Collapsible({
  title,
  hint,
  defaultOpen = false,
  children,
}: {
  title: string;
  hint?: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();

  return (
    <div className="rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--paper-soft)]">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-3 px-3.5 py-3 text-start"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
      >
        <span>
          <span className="block text-sm font-medium">{title}</span>
          {hint ? (
            <span className="mt-0.5 block text-[11px] text-[var(--muted)]">{hint}</span>
          ) : null}
        </span>
        <span className="text-xs text-[var(--muted)]">{open ? "إخفاء" : "عرض"}</span>
      </button>
      <div id={id} hidden={!open} className="border-t border-[var(--line)] px-3.5 py-3">
        {children}
      </div>
    </div>
  );
}
