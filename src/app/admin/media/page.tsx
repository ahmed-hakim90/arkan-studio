import { requireAdmin } from "@/lib/admin/auth";
import type { MediaRow } from "@/lib/content/types";
import { deleteMediaAction, uploadMediaAction } from "../actions";

export default async function AdminMediaPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; error?: string }>;
}) {
  const { supabase } = await requireAdmin();
  const sp = await searchParams;
  const { data } = await supabase
    .from("media_assets")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  const assets = (data ?? []) as MediaRow[];

  return (
    <main className="px-6 py-10">
      <div className="mx-auto max-w-5xl space-y-10">
        <div>
          <h1 className="font-display text-3xl font-semibold">الوسائط</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            رفع صور للاستخدام في المشاريع والفريق (حتى 5MB)
          </p>
          {sp.ok ? <p className="mt-3 text-sm text-[var(--ok)]">تم الرفع.</p> : null}
          {sp.error ? (
            <p className="mt-3 text-sm text-[var(--danger)]">فشل الرفع — تحقق من النوع/الحجم.</p>
          ) : null}
        </div>

        <form
          action={uploadMediaAction}
          className="space-y-3 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5"
        >
          <label className="block">
            <span className="mb-1 block text-xs text-[var(--muted)]">ملف الصورة</span>
            <input
              type="file"
              name="file"
              accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
              required
              className="field-input"
            />
          </label>
          <div className="grid gap-3 md:grid-cols-3">
            <input name="label_ar" placeholder="وصف عربي" className="field-input" />
            <input name="label_en" placeholder="Label EN" className="field-input" />
            <select name="kind" defaultValue="photo" className="field-input">
              <option value="photo">photo</option>
              <option value="ui">ui</option>
              <option value="diagram">diagram</option>
              <option value="other">other</option>
            </select>
          </div>
          <button type="submit" className="btn-primary">
            رفع
          </button>
        </form>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {assets.map((asset) => (
            <li
              key={asset.id}
              className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset.public_url}
                alt={asset.label.ar || asset.label.en}
                className="h-40 w-full object-cover"
              />
              <div className="space-y-2 p-3 text-xs">
                <p className="font-medium">{asset.label.ar || asset.label.en}</p>
                <p className="break-all text-[var(--muted)]">{asset.path}</p>
                <p className="break-all text-[var(--muted)]">{asset.public_url}</p>
                <form action={deleteMediaAction}>
                  <input type="hidden" name="id" value={asset.id} />
                  <input type="hidden" name="path" value={asset.path} />
                  <button type="submit" className="text-[var(--danger)]">
                    حذف
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
