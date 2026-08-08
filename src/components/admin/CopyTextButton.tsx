"use client";

import { useState } from "react";

export function CopyTextButton({
  value,
  label = "نسخ",
}: {
  value: string;
  label?: string;
}) {
  const [done, setDone] = useState(false);

  return (
    <button
      type="button"
      className="rounded-lg px-2 py-1 text-xs font-medium text-[var(--navy-soft)] transition hover:bg-[var(--surface-2)] hover:text-[var(--fg)]"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setDone(true);
          window.setTimeout(() => setDone(false), 1500);
        } catch {
          setDone(false);
        }
      }}
    >
      {done ? "تم النسخ" : label}
    </button>
  );
}
