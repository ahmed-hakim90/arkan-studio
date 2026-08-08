import { Accordion } from "@/components/admin/Accordion";
import { ConfirmSubmit } from "@/components/admin/ConfirmSubmit";
import { PhotoPathPreview } from "@/components/admin/PhotoPathPreview";
import { SubmitButton } from "@/components/admin/SubmitButton";
import {
  AdminBadge,
  AdminCard,
  AdminEmpty,
  AdminFlash,
  AdminHeader,
  AdminPage,
  FieldLabel,
} from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";
import type { TeamRow } from "@/lib/content/types";
import { deleteTeamMemberAction, saveTeamMemberAction } from "../actions";

export const metadata = {
  title: "الفريق",
};

const pillars = [
  "product",
  "experience",
  "frontend",
  "backend",
  "operations",
  "growth",
  "design",
  "ops",
];

function MemberFields({ member }: { member?: Partial<TeamRow> }) {
  return (
    <>
      <div className="grid gap-3 md:grid-cols-2">
        <label className="block">
          <FieldLabel>الاسم عربي</FieldLabel>
          <input
            name="name_ar"
            defaultValue={member?.name?.ar ?? ""}
            className="field-input"
            required
          />
        </label>
        <label className="block">
          <FieldLabel>Name EN</FieldLabel>
          <input
            name="name_en"
            defaultValue={member?.name?.en ?? ""}
            className="field-input"
            required
          />
        </label>
        <label className="block">
          <FieldLabel>الدور عربي</FieldLabel>
          <input
            name="role_ar"
            defaultValue={member?.role?.ar ?? ""}
            className="field-input"
            required
          />
        </label>
        <label className="block">
          <FieldLabel>Role EN</FieldLabel>
          <input
            name="role_en"
            defaultValue={member?.role?.en ?? ""}
            className="field-input"
            required
          />
        </label>
        <label className="block md:col-span-2">
          <FieldLabel>نبذة عربي</FieldLabel>
          <textarea
            name="bio_ar"
            defaultValue={member?.bio?.ar ?? ""}
            className="field-input min-h-20"
            rows={3}
          />
        </label>
        <label className="block md:col-span-2">
          <FieldLabel>Bio EN</FieldLabel>
          <textarea
            name="bio_en"
            defaultValue={member?.bio?.en ?? ""}
            className="field-input min-h-20"
            rows={3}
          />
        </label>
        <label className="block md:col-span-2">
          <FieldLabel>بيعمل إيه (عربي)</FieldLabel>
          <textarea
            name="focus_ar"
            defaultValue={member?.focus?.ar ?? ""}
            className="field-input min-h-20"
            rows={3}
          />
        </label>
        <label className="block md:col-span-2">
          <FieldLabel>Focus EN</FieldLabel>
          <textarea
            name="focus_en"
            defaultValue={member?.focus?.en ?? ""}
            className="field-input min-h-20"
            rows={3}
          />
        </label>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <label className="block">
          <FieldLabel>LinkedIn</FieldLabel>
          <input
            name="linkedin"
            type="url"
            placeholder="https://"
            defaultValue={member?.links?.linkedin ?? ""}
            className="field-input"
            dir="ltr"
          />
        </label>
        <label className="block">
          <FieldLabel>GitHub</FieldLabel>
          <input
            name="github"
            type="url"
            placeholder="https://"
            defaultValue={member?.links?.github ?? ""}
            className="field-input"
            dir="ltr"
          />
        </label>
        <label className="block">
          <FieldLabel>X</FieldLabel>
          <input
            name="x"
            type="url"
            placeholder="https://"
            defaultValue={member?.links?.x ?? ""}
            className="field-input"
            dir="ltr"
          />
        </label>
        <label className="block">
          <FieldLabel>Website</FieldLabel>
          <input
            name="website"
            type="url"
            placeholder="https://"
            defaultValue={member?.links?.website ?? ""}
            className="field-input"
            dir="ltr"
          />
        </label>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        <label className="block">
          <FieldLabel>Pillar</FieldLabel>
          <select
            name="pillar"
            defaultValue={member?.pillar ?? "product"}
            className="field-input"
          >
            {pillars.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <FieldLabel>ترتيب</FieldLabel>
          <input
            name="sort_order"
            type="number"
            defaultValue={member?.sort_order ?? 0}
            className="field-input"
          />
        </label>
        <div className="md:col-span-2">
          <PhotoPathPreview defaultValue={member?.photo_path ?? ""} />
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm font-medium">
        <input type="checkbox" name="active" defaultChecked={member?.active ?? true} />
        ظاهر على الموقع
      </label>
    </>
  );
}

export default async function AdminTeamPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; error?: string }>;
}) {
  const { supabase } = await requireAdmin();
  const sp = await searchParams;
  const { data } = await supabase
    .from("team_members")
    .select("*")
    .order("sort_order", { ascending: true });

  const members = (data ?? []) as TeamRow[];

  return (
    <AdminPage>
      <AdminHeader
        eyebrow="Studio / Team"
        title="الفريق"
        description={`${members.length} عضو — افتح البطاقة للتعديل دون ازدحام الصفحة.`}
      />
      <AdminFlash
        ok={sp.ok}
        error={sp.error}
        errorText="تعذّر الحفظ. راجع الحقول والروابط (HTTPS فقط)."
      />

      {members.length === 0 ? (
        <AdminEmpty
          title="لا أعضاء بعد"
          description="أضف أول عضو في الفريق من النموذج بالأسفل."
        />
      ) : (
        <ul className="space-y-3">
          {members.map((member, index) => (
            <li key={member.id}>
              <Accordion
                defaultOpen={index === 0}
                title={member.name?.ar || member.name?.en || member.id}
                subtitle={`${member.role?.ar || member.role?.en || "—"} · ${member.id}`}
                badge={
                  <span className="flex gap-1.5">
                    {member.active ? (
                      <AdminBadge tone="ok">نشط</AdminBadge>
                    ) : (
                      <AdminBadge>مخفي</AdminBadge>
                    )}
                    <AdminBadge>{member.pillar}</AdminBadge>
                  </span>
                }
              >
                <form action={saveTeamMemberAction} className="space-y-3">
                  <input type="hidden" name="id" value={member.id} />
                  <MemberFields member={member} />
                  <div className="flex flex-wrap items-center gap-3 border-t border-[var(--line)] pt-4">
                    <SubmitButton>حفظ العضو</SubmitButton>
                  </div>
                </form>
                <form action={deleteTeamMemberAction} className="mt-3">
                  <input type="hidden" name="id" value={member.id} />
                  <ConfirmSubmit
                    message={`حذف «${member.name?.ar ?? member.id}» من الفريق؟`}
                    className="text-sm text-[var(--danger)] hover:underline"
                  >
                    حذف العضو
                  </ConfirmSubmit>
                </form>
              </Accordion>
            </li>
          ))}
        </ul>
      )}

      <section className="space-y-3">
        <h2 className="font-display text-xl font-semibold">إضافة عضو</h2>
        <AdminCard className="border-dashed border-[color-mix(in_oklab,var(--volt)_35%,var(--line))]">
          <form action={saveTeamMemberAction} className="space-y-3">
            <MemberFields
              member={{ sort_order: members.length, active: true, pillar: "product" }}
            />
            <SubmitButton pendingLabel="جارٍ الإضافة…">إضافة عضو</SubmitButton>
          </form>
        </AdminCard>
      </section>
    </AdminPage>
  );
}
