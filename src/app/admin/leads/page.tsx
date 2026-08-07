import { LEAD_STATUSES, type Lead } from "@/lib/leads";
import { requireAdmin } from "@/lib/admin/auth";
import { updateLeadStatusAction } from "../actions";

const labels: Record<string, string> = {
  erp: "ERP",
  pos: "POS",
  ops: "تشغيل",
  commerce: "تجارة",
  ai: "AI",
  other: "أخرى",
  egypt: "مصر",
  saudi: "السعودية",
  gulf: "الخليج",
  global: "عالمي",
  mvp: "MVP",
  growth: "نمو",
  enterprise: "مؤسسات",
  ar: "عربي",
  en: "English",
  both: "عربي + English",
  new: "جديد",
  seen: "اتشاف",
  contacted: "تم التواصل",
  closed: "مغلق",
  spam: "سبام",
};

function formatDate(value: string) {
  try {
    return new Intl.DateTimeFormat("ar-EG", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const { supabase } = await requireAdmin();
  const { q, status } = await searchParams;

  let query = supabase
    .from("leads")
    .select(
      "id, name, email, message, system_type, market, scale, language, source_project, status, admin_notes, created_at, updated_at",
    )
    .order("created_at", { ascending: false })
    .limit(200);

  if (status && LEAD_STATUSES.includes(status as (typeof LEAD_STATUSES)[number])) {
    query = query.eq("status", status);
  }

  const { data, error } = await query;
  if (error) {
    return (
      <main className="px-6 py-10">
        <p className="text-[var(--danger)]">تعذر تحميل الطلبات.</p>
      </main>
    );
  }

  let leads = (data ?? []) as Lead[];
  const needle = q?.trim().toLowerCase();
  if (needle) {
    leads = leads.filter(
      (lead) =>
        lead.name.toLowerCase().includes(needle) ||
        lead.email.toLowerCase().includes(needle) ||
        lead.message.toLowerCase().includes(needle),
    );
  }

  const newCount = leads.filter((lead) => lead.status === "new").length;

  return (
    <main className="px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="font-display text-3xl font-semibold">طلبات العرض</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          {leads.length} طلب · {newCount} جديد
        </p>

        <form className="mt-6 flex flex-wrap gap-3">
          <input
            name="q"
            defaultValue={q ?? ""}
            placeholder="بحث بالاسم أو الإيميل..."
            className="field-input max-w-xs"
          />
          <select name="status" defaultValue={status ?? ""} className="field-input max-w-[10rem]">
            <option value="">كل الحالات</option>
            {LEAD_STATUSES.map((s) => (
              <option key={s} value={s}>
                {labels[s] ?? s}
              </option>
            ))}
          </select>
          <button type="submit" className="btn-primary">
            تصفية
          </button>
        </form>

        {leads.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-6 py-10 text-center">
            <p className="font-medium">لا توجد طلبات</p>
          </div>
        ) : (
          <ul className="mt-8 space-y-4">
            {leads.map((lead) => (
              <li
                key={lead.id}
                className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg font-semibold">{lead.name}</h2>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs ${
                          lead.status === "new"
                            ? "bg-[var(--signal-soft)] text-[var(--signal)]"
                            : "bg-[var(--surface-2)] text-[var(--muted)]"
                        }`}
                      >
                        {labels[lead.status] ?? lead.status}
                      </span>
                    </div>
                    <a
                      href={`mailto:${lead.email}`}
                      className="mt-1 block text-sm text-[var(--navy-soft)] underline-offset-2 hover:underline"
                    >
                      {lead.email}
                    </a>
                    <p className="mt-1 text-xs text-[var(--muted)]">
                      {formatDate(lead.created_at)}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-[var(--muted)]">
                    <span className="rounded-lg bg-[var(--surface-2)] px-2 py-1">
                      {labels[lead.system_type] ?? lead.system_type}
                    </span>
                    <span className="rounded-lg bg-[var(--surface-2)] px-2 py-1">
                      {labels[lead.market] ?? lead.market}
                    </span>
                    <span className="rounded-lg bg-[var(--surface-2)] px-2 py-1">
                      {labels[lead.scale] ?? lead.scale}
                    </span>
                  </div>
                </div>

                {lead.message ? (
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed">
                    {lead.message}
                  </p>
                ) : null}

                <form
                  action={updateLeadStatusAction}
                  className="mt-4 grid gap-3 sm:grid-cols-[1fr_2fr_auto]"
                >
                  <input type="hidden" name="id" value={lead.id} />
                  <label className="block">
                    <span className="mb-1 block text-xs text-[var(--muted)]">الحالة</span>
                    <select name="status" defaultValue={lead.status} className="field-input">
                      {LEAD_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {labels[s] ?? s}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-xs text-[var(--muted)]">ملاحظات</span>
                    <input
                      name="admin_notes"
                      defaultValue={lead.admin_notes}
                      className="field-input"
                      maxLength={4000}
                    />
                  </label>
                  <div className="flex items-end">
                    <button type="submit" className="btn-primary w-full sm:w-auto">
                      حفظ
                    </button>
                  </div>
                </form>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
