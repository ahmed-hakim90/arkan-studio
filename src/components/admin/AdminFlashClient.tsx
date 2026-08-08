"use client";

import { useEffect, useState } from "react";

export function AdminFlashClient({
  ok,
  error,
  okText = "تم الحفظ بنجاح.",
  errorText = "تعذّر إتمام العملية. راجع البيانات وحاول مجددًا.",
}: {
  ok?: string | null;
  error?: string | null;
  okText?: string;
  errorText?: string;
}) {
  const [visible, setVisible] = useState(Boolean(ok || error));

  useEffect(() => {
    setVisible(Boolean(ok || error));
    if (!ok && !error) return;
    const timer = window.setTimeout(() => setVisible(false), 4200);
    return () => window.clearTimeout(timer);
  }, [ok, error]);

  if (!visible || (!ok && !error)) return null;

  const isOk = Boolean(ok);
  return (
    <div
      className={`admin-flash ${isOk ? "admin-flash--ok" : "admin-flash--error"}`}
      role={isOk ? "status" : "alert"}
    >
      <p>{isOk ? okText : errorText}</p>
      <button
        type="button"
        className="shrink-0 text-xs opacity-70 hover:opacity-100"
        onClick={() => setVisible(false)}
        aria-label="إغلاق"
      >
        إغلاق
      </button>
    </div>
  );
}
