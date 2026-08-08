import { LeadQuickStatus } from "@/components/admin/LeadQuickStatus";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { AdminBadge, FieldLabel } from "@/components/admin/ui";
import { LEAD_STATUSES, type Lead } from "@/lib/leads";
import { updateLeadStatusAction } from "@/app/admin/actions";

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

function statusTone(status: string): "signal" | "ok" | "muted" | "danger" | "ink" {
  if (status === "new") return "signal";
  if (status === "contacted") return "ok";
  if (status === "closed") return "ink";
  if (status === "spam") return "danger";
  return "muted";
}

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

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="admin-lead__spec">
      <p className="tech-label text-[10px] text-[var(--muted)]">{label}</p>
      <p className="mt-1.5 text-sm font-semibold tracking-tight">{value}</p>
    </div>
  );
}

export function LeadCard({ lead }: { lead: Lead }) {
  const isNew = lead.status === "new";

  return (
    <article className={`admin-lead ${isNew ? "admin-lead--new" : ""}`}>
      <header className="admin-lead__head">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="tech-label text-[10px] text-[var(--signal)]">
              INQUIRY / {lead.id.slice(0, 8).toUpperCase()}
            </p>
            <AdminBadge tone={statusTone(lead.status)}>
              {labels[lead.status] ?? lead.status}
            </AdminBadge>
          </div>
          <h2 className="font-display mt-2 text-2xl font-semibold tracking-tight">
            {lead.name}
          </h2>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            <a
              href={`mailto:${lead.email}`}
              className="font-medium text-[var(--volt)] underline-offset-2 hover:underline"
              dir="ltr"
            >
              {lead.email}
            </a>
            <span className="tech-label text-[10px] text-[var(--muted)]">
              {formatDate(lead.created_at)}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-start gap-2 sm:items-end">
          {lead.source_project ? (
            <p className="tech-label text-[10px] text-[var(--muted)]">
              SOURCE / {lead.source_project}
            </p>
          ) : (
            <p className="tech-label text-[10px] text-[var(--muted)]">SOURCE / START</p>
          )}
          <a href={`mailto:${lead.email}`} className="btn-ghost-dark text-sm !min-h-10 !px-3 !py-2">
            مراسلة
          </a>
        </div>
      </header>

      <div className="admin-lead__specs" aria-label="مواصفات الطلب">
        <Spec label="نوع النظام" value={labels[lead.system_type] ?? lead.system_type} />
        <Spec label="السوق" value={labels[lead.market] ?? lead.market} />
        <Spec label="الحجم" value={labels[lead.scale] ?? lead.scale} />
        <Spec label="اللغة" value={labels[lead.language] ?? lead.language} />
      </div>

      <div className="admin-lead__body">
        <div>
          <p className="tech-label text-[10px] text-[var(--muted)]">الرسالة</p>
          <div className="admin-lead__message mt-2">
            {lead.message ? (
              <p>{lead.message}</p>
            ) : (
              <p className="text-[var(--muted)]">لا توجد رسالة مرفقة.</p>
            )}
          </div>
        </div>

        {lead.admin_notes ? (
          <dl className="admin-dl">
            <div>
              <dt className="tech-label text-[10px] text-[var(--muted)]">ملاحظة سابقة</dt>
              <dd className="text-sm">{lead.admin_notes}</dd>
            </div>
          </dl>
        ) : null}

        <div>
          <p className="tech-label mb-2 text-[10px] text-[var(--muted)]">تغيير سريع للحالة</p>
          <LeadQuickStatus
            id={lead.id}
            current={lead.status}
            notes={lead.admin_notes ?? ""}
          />
        </div>
      </div>

      <form action={updateLeadStatusAction} className="admin-lead__actions">
        <input type="hidden" name="id" value={lead.id} />
        <div className="grid gap-3 sm:grid-cols-[10rem_1fr_auto]">
          <label className="block">
            <FieldLabel>الحالة</FieldLabel>
            <select name="status" defaultValue={lead.status} className="field-input">
              {LEAD_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {labels[s] ?? s}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <FieldLabel>ملاحظات المتابعة</FieldLabel>
            <input
              name="admin_notes"
              defaultValue={lead.admin_notes}
              className="field-input"
              maxLength={4000}
              placeholder="ماذا تم؟ ماذا بعد؟"
            />
          </label>
          <div className="flex items-end">
            <SubmitButton className="btn-primary w-full sm:w-auto">حفظ المتابعة</SubmitButton>
          </div>
        </div>
      </form>
    </article>
  );
}
