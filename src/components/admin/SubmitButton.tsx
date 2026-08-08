"use client";

import { useFormStatus } from "react-dom";
import type { ReactNode } from "react";

export function SubmitButton({
  children,
  pendingLabel = "جارٍ الحفظ…",
  className = "btn-primary",
  disabled,
}: {
  children: ReactNode;
  pendingLabel?: string;
  className?: string;
  disabled?: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className={className} disabled={disabled || pending} aria-busy={pending}>
      {pending ? pendingLabel : children}
    </button>
  );
}
