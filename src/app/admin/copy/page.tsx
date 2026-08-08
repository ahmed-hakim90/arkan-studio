import { Accordion } from "@/components/admin/Accordion";
import { SubmitButton } from "@/components/admin/SubmitButton";
import {
  AdminChip,
  AdminEmpty,
  AdminFlash,
  AdminHeader,
  AdminPage,
  AdminToolbar,
  FieldLabel,
} from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";
import { saveCopyAction } from "../actions";

export const metadata = {
  title: "النصوص",
};

const NAMESPACES = [
  "Hero",
  "Capabilities",
  "Studio",
  "Legal",
  "Cookies",
  "Pillars",
  "Home",
  "Meta",
  "Atlas",
  "Nav",
  "Footer",
  "ControlRoom",
  "Start",
] as const;

type CopyRow = {
  key: string;
  namespace: string;
  path: string;
  value_ar: string;
  value_en: string;
};

export default async function AdminCopyPage({
  searchParams,
}: {
  searchParams: Promise<{ ns?: string; q?: string; ok?: string; error?: string }>;
}) {
  const { supabase } = await requireAdmin();
  const { ns, q, ok, error } = await searchParams;
  const namespace = NAMESPACES.includes(ns as (typeof NAMESPACES)[number])
    ? (ns as string)
    : "Hero";

  const [{ data }, countsRes] = await Promise.all([
    supabase
      .from("site_copy")
      .select("key, namespace, path, value_ar, value_en")
      .eq("namespace", namespace)
      .order("path", { ascending: true }),
    supabase.from("site_copy").select("namespace"),
  ]);

  const countMap = new Map<string, number>();
  for (const row of countsRes.data ?? []) {
    const key = String((row as { namespace: string }).namespace);
    countMap.set(key, (countMap.get(key) ?? 0) + 1);
  }

  let rows = (data ?? []) as CopyRow[];
  const needle = q?.trim().toLowerCase();
  if (needle) {
    rows = rows.filter(
      (row) =>
        row.key.toLowerCase().includes(needle) ||
        row.path.toLowerCase().includes(needle) ||
        row.value_ar.toLowerCase().includes(needle) ||
        row.value_en.toLowerCase().includes(needle),
    );
  }

  return (
    <AdminPage>
      <AdminHeader
        eyebrow="Content / Copy"
        title="النصوص"
        description={`${rows.length} سطر في «${namespace}» — عدّل عربي/EN ثم احفظ السطر.`}
      />
      <AdminFlash ok={ok} error={error} okText="تم حفظ السطر." />

      <div className="admin-card admin-card--padded sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-[color-mix(in_oklab,var(--surface)_90%,transparent)]">
        <div className="flex flex-wrap gap-2">
          {NAMESPACES.map((item) => (
            <AdminChip
              key={item}
              href={`/admin/copy?ns=${item}${q ? `&q=${encodeURIComponent(q)}` : ""}`}
              active={item === namespace}
            >
              {item}
              {countMap.get(item) ? ` · ${countMap.get(item)}` : ""}
            </AdminChip>
          ))}
        </div>
      </div>

      <AdminToolbar>
        <form className="flex w-full flex-wrap gap-3">
          <input type="hidden" name="ns" value={namespace} />
          <input
            name="q"
            defaultValue={q ?? ""}
            placeholder="بحث داخل القسم..."
            className="field-input max-w-md flex-1"
          />
          <SubmitButton pendingLabel="جارٍ البحث…">بحث</SubmitButton>
        </form>
      </AdminToolbar>

      {rows.length === 0 ? (
        <AdminEmpty
          title="لا توجد نصوص في هذا القسم"
          description="شغّل seed:cms إن كان الجدول فارغًا، أو جرّب قسمًا آخر."
        />
      ) : (
        <ul className="space-y-2.5">
          {rows.map((row, index) => (
            <li key={row.key}>
              <Accordion
                defaultOpen={Boolean(needle) || index < 2}
                title={row.path}
                subtitle={row.key}
                badge={
                  <span className="max-w-[10rem] truncate text-[10px] text-[var(--muted)]">
                    {(row.value_ar || row.value_en || "—").slice(0, 28)}
                  </span>
                }
              >
                <form action={saveCopyAction} className="grid gap-3 md:grid-cols-2">
                  <input type="hidden" name="key" value={row.key} />
                  <input type="hidden" name="namespace" value={row.namespace} />
                  <input type="hidden" name="path" value={row.path} />
                  <label className="block">
                    <FieldLabel>عربي</FieldLabel>
                    <textarea
                      name="value_ar"
                      defaultValue={row.value_ar}
                      rows={3}
                      className="field-input"
                    />
                  </label>
                  <label className="block">
                    <FieldLabel>English</FieldLabel>
                    <textarea
                      name="value_en"
                      defaultValue={row.value_en}
                      rows={3}
                      className="field-input"
                      dir="ltr"
                    />
                  </label>
                  <div className="md:col-span-2">
                    <SubmitButton>حفظ السطر</SubmitButton>
                  </div>
                </form>
              </Accordion>
            </li>
          ))}
        </ul>
      )}
    </AdminPage>
  );
}
