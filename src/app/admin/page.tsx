import { redirect } from "next/navigation";
import { LEAD_STATUSES, type Lead } from "@/lib/leads";
import { createClient } from "@/lib/supabase/server";
import { logoutAction, updateLeadStatusAction } from "./actions";

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

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: admin } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!admin) {
    await supabase.auth.signOut();
    redirect("/admin/login?error=unauthorized");
  }

  const { data, error } = await supabase
    .from("leads")
    .select(
      "id, name, email, message, system_type, market, scale, language, source_project, status, admin_notes, created_at, updated_at",
    )
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-12">
        <p className="text-[var(--danger)]">تعذر تحميل الطلبات.</p>
      </main>
    );
  }

  const leads = (data ?? []) as Lead[];
  const newCount = leads.filter((lead) => lead.status === "new").length;

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-[var(--muted)]">Arkan Control</p>
          <h1 className="mt-1 font-display text-3xl font-semibold">طلبات العرض</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            {leads.length} طلب · {newCount} جديد
          </p>
        </div>
        <form action={logoutAction}>
          <button type="submit" className="btn-ghost-dark">
            خروج
          </button>
        </form>
      </div>

      {leads.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-6 py-10 text-center">
          <p className="font-medium">لا توجد طلبات بعد</p>
          <p className="mt-2 text-sm text-[var(--muted)]">
            أي طلب من صفحة Start هيظهر هنا فورًا.
          </p>
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
                  <span className="rounded-lg bg-[var(--surface-2)] px-2 py-1">
                    {labels[lead.language] ?? lead.language}
                  </span>
                </div>
              </div>

              {lead.source_project ? (
                <p className="mt-3 text-sm text-[var(--muted)]">
                  من مشروع: <span className="text-[var(--fg)]">{lead.source_project}</span>
                </p>
              ) : null}

              {lead.message ? (
                <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-[var(--fg)]">
                  {lead.message}
                </p>
              ) : null}

              <form action={updateLeadStatusAction} className="mt-4 grid gap-3 sm:grid-cols-[1fr_2fr_auto]">
                <input type="hidden" name="id" value={lead.id} />
                <label className="block">
                  <span className="mb-1 block text-xs text-[var(--muted)]">الحالة</span>
                  <select
                    name="status"
                    defaultValue={lead.status}
                    className="field-input"
                  >
                    {LEAD_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {labels[status] ?? status}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs text-[var(--muted)]">ملاحظات داخلية</span>
                  <input
                    name="admin_notes"
                    defaultValue={lead.admin_notes}
                    className="field-input"
                    maxLength={4000}
                    placeholder="ملاحظات للمتابعة..."
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
    </main>
  );
}
