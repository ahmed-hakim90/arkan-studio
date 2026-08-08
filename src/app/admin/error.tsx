"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[admin]", error.digest ?? error.message);
  }, [error]);

  return (
    <main className="admin-page">
      <div className="admin-page-inner max-w-lg">
        <div className="admin-card admin-card--padded text-center">
          <p className="text-[10px] font-semibold tracking-[0.18em] text-[var(--muted)] uppercase">
            Arkan Control
          </p>
          <h1 className="font-display mt-2 text-2xl font-semibold">حدث خطأ غير متوقع</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            تعذر تحميل هذه الصفحة. يمكنك المحاولة مجددًا أو العودة للوحة التحكم.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <button type="button" className="btn-primary" onClick={reset}>
              إعادة المحاولة
            </button>
            <Link href="/admin" className="btn-ghost-dark">
              لوحة التحكم
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
