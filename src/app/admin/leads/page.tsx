import { LeadCard } from "@/components/admin/LeadCard";
import { SubmitButton } from "@/components/admin/SubmitButton";
import {
  AdminChip,
  AdminEmpty,
  AdminFlash,
  AdminHeader,
  AdminPage,
  AdminToolbar,
} from "@/components/admin/ui";
import { LEAD_STATUSES, type Lead } from "@/lib/leads";
import { requireAdmin } from "@/lib/admin/auth";

export const metadata = {
  title: "الطلبات",
};

const labels: Record<string, string> = {
  new: "جديد",
  seen: "اتشاف",
  contacted: "تم التواصل",
  closed: "مغلق",
  spam: "سبام",
};

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; ok?: string; error?: string }>;
}) {
  const { supabase } = await requireAdmin();
  const { q, status, ok, error } = await searchParams;

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

  const { data, error: loadError } = await query;
  if (loadError) {
    return (
      <AdminPage>
        <AdminHeader title="طلبات العرض" />
        <AdminFlash error="1" errorText="تعذر تحميل الطلبات." />
      </AdminPage>
    );
  }

  let leads = (data ?? []) as Lead[];
  const needle = q?.trim().toLowerCase();
  if (needle) {
    leads = leads.filter(
      (lead) =>
        lead.name.toLowerCase().includes(needle) ||
        lead.email.toLowerCase().includes(needle) ||
        lead.message.toLowerCase().includes(needle) ||
        (lead.source_project ?? "").toLowerCase().includes(needle),
    );
  }

  // Counts from unfiltered status query for chips — use current result when status filter active
  const { data: allStatusRows } = await supabase
    .from("leads")
    .select("status")
    .limit(500);
  const statusRows = (allStatusRows ?? []) as { status: string }[];
  const counts = Object.fromEntries(
    LEAD_STATUSES.map((s) => [s, statusRows.filter((l) => l.status === s).length]),
  ) as Record<string, number>;
  const newCount = counts.new ?? 0;

  return (
    <AdminPage>
      <AdminHeader
        eyebrow="Pipeline / Leads"
        title="طلبات العرض"
        description={`${leads.length} طلب ظاهر · ${newCount} جديد بانتظار المراجعة — كل طلب معروض كموجز Blueprint واضح.`}
      />

      <AdminFlash ok={ok} error={error} okText="تم تحديث الطلب." />

      <div className="flex flex-wrap gap-2">
        <AdminChip href="/admin/leads" active={!status}>
          الكل · {statusRows.length}
        </AdminChip>
        {LEAD_STATUSES.map((s) => (
          <AdminChip
            key={s}
            href={`/admin/leads?status=${s}${q ? `&q=${encodeURIComponent(q)}` : ""}`}
            active={status === s}
          >
            {labels[s] ?? s}
            {counts[s] ? ` · ${counts[s]}` : ""}
          </AdminChip>
        ))}
      </div>

      <AdminToolbar>
        <form className="flex w-full flex-wrap gap-3">
          <input
            name="q"
            defaultValue={q ?? ""}
            placeholder="بحث بالاسم أو الإيميل أو المشروع..."
            className="field-input max-w-md flex-1"
          />
          {status ? <input type="hidden" name="status" value={status} /> : null}
          <SubmitButton pendingLabel="جارٍ البحث…">بحث</SubmitButton>
        </form>
      </AdminToolbar>

      {leads.length === 0 ? (
        <AdminEmpty
          title="لا توجد طلبات"
          description="جرّب تغيير الفلتر أو أرسل طلبًا تجريبيًا من /start."
        />
      ) : (
        <ul className="space-y-4">
          {leads.map((lead) => (
            <li key={lead.id}>
              <LeadCard lead={lead} />
            </li>
          ))}
        </ul>
      )}
    </AdminPage>
  );
}
