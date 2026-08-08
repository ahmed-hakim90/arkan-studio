import Link from "next/link";

export default function AdminNotFound() {
  return (
    <main className="admin-page">
      <div className="admin-page-inner max-w-lg">
        <div className="admin-card admin-card--padded text-center">
          <p className="text-[10px] font-semibold tracking-[0.18em] text-[var(--muted)] uppercase">
            404
          </p>
          <h1 className="font-display mt-2 text-2xl font-semibold">الصفحة غير موجودة</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            هذا المسار غير متاح داخل لوحة التحكم.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Link href="/admin" className="btn-primary">
              لوحة التحكم
            </Link>
            <Link href="/admin/projects" className="btn-ghost-dark">
              المشاريع
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
