import { requireAdmin } from "@/lib/admin/auth";
import { saveCopyAction } from "../actions";

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
  searchParams: Promise<{ ns?: string }>;
}) {
  const { supabase } = await requireAdmin();
  const { ns } = await searchParams;
  const namespace = NAMESPACES.includes(ns as (typeof NAMESPACES)[number])
    ? (ns as string)
    : "Hero";

  const { data } = await supabase
    .from("site_copy")
    .select("key, namespace, path, value_ar, value_en")
    .eq("namespace", namespace)
    .order("path", { ascending: true });

  const rows = (data ?? []) as CopyRow[];

  return (
    <main className="px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="font-display text-3xl font-semibold">النصوص</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          تعديل نصوص الموقع (عربي / إنجليزي) حسب القسم
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {NAMESPACES.map((item) => (
            <a
              key={item}
              href={`/admin/copy?ns=${item}`}
              className={`rounded-lg px-3 py-1.5 text-sm ${
                item === namespace
                  ? "bg-[var(--navy)] text-white"
                  : "bg-[var(--surface-2)] text-[var(--muted)]"
              }`}
            >
              {item}
            </a>
          ))}
        </div>

        <ul className="mt-8 space-y-4">
          {rows.map((row) => (
            <li
              key={row.key}
              className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4"
            >
              <p className="text-xs text-[var(--muted)]">{row.key}</p>
              <form action={saveCopyAction} className="mt-3 grid gap-3 md:grid-cols-2">
                <input type="hidden" name="key" value={row.key} />
                <input type="hidden" name="namespace" value={row.namespace} />
                <input type="hidden" name="path" value={row.path} />
                <label className="block">
                  <span className="mb-1 block text-xs text-[var(--muted)]">عربي</span>
                  <textarea
                    name="value_ar"
                    defaultValue={row.value_ar}
                    rows={2}
                    className="field-input"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs text-[var(--muted)]">English</span>
                  <textarea
                    name="value_en"
                    defaultValue={row.value_en}
                    rows={2}
                    className="field-input"
                  />
                </label>
                <div className="md:col-span-2">
                  <button type="submit" className="btn-primary">
                    حفظ السطر
                  </button>
                </div>
              </form>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
