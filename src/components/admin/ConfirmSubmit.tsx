"use client";

import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  message: string;
  className?: string;
  // Server Actions from Next.js are accepted as formAction.
  formAction?: (formData: FormData) => void | Promise<void> | never;
  type?: "submit" | "button";
};

export function ConfirmSubmit({
  children,
  message,
  className,
  formAction,
  type = "submit",
}: Props) {
  return (
    <button
      type={type}
      formAction={formAction}
      className={className}
      onClick={(event) => {
        if (!window.confirm(message)) {
          event.preventDefault();
        }
      }}
    >
      {children}
    </button>
  );
}
