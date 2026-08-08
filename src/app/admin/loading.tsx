export default function AdminLoading() {
  return (
    <main className="admin-page">
      <div className="admin-page-inner space-y-4">
        <div className="space-y-3 border-b border-[var(--line)] pb-5">
          <div className="admin-skeleton h-3 w-28" />
          <div className="admin-skeleton h-9 w-64 max-w-full" />
          <div className="admin-skeleton h-4 w-96 max-w-full" />
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="admin-card admin-card--padded space-y-3">
              <div className="admin-skeleton h-3 w-20" />
              <div className="admin-skeleton h-8 w-16" />
              <div className="admin-skeleton h-3 w-28" />
            </div>
          ))}
        </div>
        <div className="admin-card admin-card--padded space-y-3">
          <div className="admin-skeleton h-4 w-40" />
          <div className="admin-skeleton h-24 w-full" />
          <div className="admin-skeleton h-24 w-full" />
        </div>
      </div>
    </main>
  );
}
