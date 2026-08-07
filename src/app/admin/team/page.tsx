import { requireAdmin } from "@/lib/admin/auth";
import type { TeamRow } from "@/lib/content/types";
import { deleteTeamMemberAction, saveTeamMemberAction } from "../actions";

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
    <main className="px-6 py-10">
      <div className="mx-auto max-w-4xl space-y-10">
        <div>
          <h1 className="font-display text-3xl font-semibold">الفريق</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            إدارة أعضاء الاستوديو وترتيبهم وصورهم
          </p>
          {sp.ok ? (
            <p className="mt-3 text-sm text-[var(--ok)]">تم الحفظ.</p>
          ) : null}
        </div>

        <ul className="space-y-6">
          {members.map((member) => (
            <li
              key={member.id}
              className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5"
            >
              <form action={saveTeamMemberAction} className="space-y-3">
                <input type="hidden" name="id" value={member.id} />
                <div className="grid gap-3 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-1 block text-xs text-[var(--muted)]">الاسم عربي</span>
                    <input
                      name="name_ar"
                      defaultValue={member.name.ar}
                      className="field-input"
                      required
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-xs text-[var(--muted)]">Name EN</span>
                    <input
                      name="name_en"
                      defaultValue={member.name.en}
                      className="field-input"
                      required
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-xs text-[var(--muted)]">الدور عربي</span>
                    <input
                      name="role_ar"
                      defaultValue={member.role.ar}
                      className="field-input"
                      required
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-xs text-[var(--muted)]">Role EN</span>
                    <input
                      name="role_en"
                      defaultValue={member.role.en}
                      className="field-input"
                      required
                    />
                  </label>
                </div>
                <div className="grid gap-3 md:grid-cols-3">
                  <label className="block">
                    <span className="mb-1 block text-xs text-[var(--muted)]">Pillar</span>
                    <select
                      name="pillar"
                      defaultValue={member.pillar}
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
                    <span className="mb-1 block text-xs text-[var(--muted)]">ترتيب</span>
                    <input
                      name="sort_order"
                      type="number"
                      defaultValue={member.sort_order}
                      className="field-input"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-xs text-[var(--muted)]">
                      مسار الصورة (من الوسائط)
                    </span>
                    <input
                      name="photo_path"
                      defaultValue={member.photo_path ?? ""}
                      className="field-input"
                    />
                  </label>
                </div>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" name="active" defaultChecked={member.active} />
                  نشط
                </label>
                <div className="flex gap-2">
                  <button type="submit" className="btn-primary">
                    حفظ
                  </button>
                </div>
              </form>
              <form action={deleteTeamMemberAction} className="mt-3">
                <input type="hidden" name="id" value={member.id} />
                <button type="submit" className="text-sm text-[var(--danger)]">
                  حذف العضو
                </button>
              </form>
            </li>
          ))}
        </ul>

        <section className="rounded-2xl border border-dashed border-[var(--line)] bg-[var(--surface)] p-5">
          <h2 className="font-display text-xl">إضافة عضو</h2>
          <form action={saveTeamMemberAction} className="mt-4 space-y-3">
            <div className="grid gap-3 md:grid-cols-2">
              <input name="name_ar" placeholder="الاسم عربي" className="field-input" required />
              <input name="name_en" placeholder="Name EN" className="field-input" required />
              <input name="role_ar" placeholder="الدور عربي" className="field-input" required />
              <input name="role_en" placeholder="Role EN" className="field-input" required />
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              <select name="pillar" className="field-input" defaultValue="product">
                {pillars.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              <input
                name="sort_order"
                type="number"
                defaultValue={members.length}
                className="field-input"
              />
              <input name="photo_path" placeholder="photo path" className="field-input" />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="active" defaultChecked />
              نشط
            </label>
            <button type="submit" className="btn-primary">
              إضافة
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
