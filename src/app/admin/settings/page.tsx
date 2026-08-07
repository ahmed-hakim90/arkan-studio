import { requireAdmin } from "@/lib/admin/auth";
import type { SiteSettingsRow } from "@/lib/content/types";
import { saveSettingsAction } from "../actions";

export default async function AdminSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; error?: string }>;
}) {
  const { supabase } = await requireAdmin();
  const sp = await searchParams;
  const { data } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .maybeSingle();

  const settings = data as SiteSettingsRow | null;

  return (
    <main className="px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-3xl font-semibold">إعدادات الموقع</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          الإيميل والواتساب والسوشيال والهوية
        </p>
        {sp.ok ? <p className="mt-3 text-sm text-[var(--ok)]">تم الحفظ.</p> : null}

        <form action={saveSettingsAction} className="mt-8 space-y-4 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5">
          <label className="block">
            <span className="mb-1 block text-xs text-[var(--muted)]">Legal name</span>
            <input
              name="legal_name"
              defaultValue={settings?.legal_name ?? "Arkan Studio"}
              className="field-input"
              required
            />
          </label>
          <div className="grid gap-3 md:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-xs text-[var(--muted)]">الاسم عربي</span>
              <input
                name="name_ar"
                defaultValue={settings?.name?.ar ?? ""}
                className="field-input"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs text-[var(--muted)]">Name EN</span>
              <input
                name="name_en"
                defaultValue={settings?.name?.en ?? ""}
                className="field-input"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs text-[var(--muted)]">الشعار عربي</span>
              <input
                name="tagline_ar"
                defaultValue={settings?.tagline?.ar ?? ""}
                className="field-input"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs text-[var(--muted)]">Tagline EN</span>
              <input
                name="tagline_en"
                defaultValue={settings?.tagline?.en ?? ""}
                className="field-input"
              />
            </label>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-xs text-[var(--muted)]">الوصف عربي</span>
              <textarea
                name="description_ar"
                defaultValue={settings?.description?.ar ?? ""}
                className="field-input"
                rows={3}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs text-[var(--muted)]">Description EN</span>
              <textarea
                name="description_en"
                defaultValue={settings?.description?.en ?? ""}
                className="field-input"
                rows={3}
              />
            </label>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <label className="block">
              <span className="mb-1 block text-xs text-[var(--muted)]">Email</span>
              <input
                name="email"
                type="email"
                defaultValue={settings?.email ?? ""}
                className="field-input"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs text-[var(--muted)]">Phone</span>
              <input
                name="phone"
                defaultValue={settings?.phone ?? ""}
                className="field-input"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs text-[var(--muted)]">WhatsApp URL</span>
              <input
                name="whatsapp"
                defaultValue={settings?.whatsapp ?? ""}
                className="field-input"
              />
            </label>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-xs text-[var(--muted)]">الموقع عربي</span>
              <input
                name="location_ar"
                defaultValue={settings?.location?.ar ?? ""}
                className="field-input"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs text-[var(--muted)]">Location EN</span>
              <input
                name="location_en"
                defaultValue={settings?.location?.en ?? ""}
                className="field-input"
              />
            </label>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <label className="block">
              <span className="mb-1 block text-xs text-[var(--muted)]">GitHub</span>
              <input
                name="github"
                defaultValue={settings?.social?.github ?? ""}
                className="field-input"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs text-[var(--muted)]">LinkedIn</span>
              <input
                name="linkedin"
                defaultValue={settings?.social?.linkedin ?? ""}
                className="field-input"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs text-[var(--muted)]">X</span>
              <input
                name="x"
                defaultValue={settings?.social?.x ?? ""}
                className="field-input"
              />
            </label>
          </div>
          <button type="submit" className="btn-primary">
            حفظ الإعدادات
          </button>
        </form>
      </div>
    </main>
  );
}
