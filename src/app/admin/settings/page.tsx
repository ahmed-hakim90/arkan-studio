import { SubmitButton } from "@/components/admin/SubmitButton";
import {
  AdminCard,
  AdminFlash,
  AdminHeader,
  AdminPage,
  AdminSection,
  FieldLabel,
} from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";
import type { SiteSettingsRow } from "@/lib/content/types";
import { saveSettingsAction } from "../actions";

export const metadata = {
  title: "الإعدادات",
};

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
    <AdminPage>
      <AdminHeader
        eyebrow="Site / Settings"
        title="إعدادات الموقع"
        description="الهوية، بيانات التواصل، والمواقع الاجتماعية الظاهرة في الفوتر وصفحات التواصل."
      />
      <AdminFlash ok={sp.ok} error={sp.error} />

      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
        <form action={saveSettingsAction} className="space-y-6 pb-24">
          <AdminSection title="الهوية" description="الاسم القانوني والهوية ثنائية اللغة">
            <div className="space-y-4">
              <label className="block">
                <FieldLabel>Legal name</FieldLabel>
                <input
                  name="legal_name"
                  defaultValue={settings?.legal_name ?? "Arkan Studio"}
                  className="field-input"
                  required
                />
              </label>
              <div className="grid gap-3 md:grid-cols-2">
                <label className="block">
                  <FieldLabel>الاسم عربي</FieldLabel>
                  <input
                    name="name_ar"
                    defaultValue={settings?.name?.ar ?? ""}
                    className="field-input"
                  />
                </label>
                <label className="block">
                  <FieldLabel>Name EN</FieldLabel>
                  <input
                    name="name_en"
                    defaultValue={settings?.name?.en ?? ""}
                    className="field-input"
                  />
                </label>
                <label className="block">
                  <FieldLabel>الشعار عربي</FieldLabel>
                  <input
                    name="tagline_ar"
                    defaultValue={settings?.tagline?.ar ?? ""}
                    className="field-input"
                  />
                </label>
                <label className="block">
                  <FieldLabel>Tagline EN</FieldLabel>
                  <input
                    name="tagline_en"
                    defaultValue={settings?.tagline?.en ?? ""}
                    className="field-input"
                  />
                </label>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <label className="block">
                  <FieldLabel>الوصف عربي</FieldLabel>
                  <textarea
                    name="description_ar"
                    defaultValue={settings?.description?.ar ?? ""}
                    className="field-input"
                    rows={3}
                  />
                </label>
                <label className="block">
                  <FieldLabel>Description EN</FieldLabel>
                  <textarea
                    name="description_en"
                    defaultValue={settings?.description?.en ?? ""}
                    className="field-input"
                    rows={3}
                  />
                </label>
              </div>
            </div>
          </AdminSection>

          <AdminSection title="التواصل" description="القنوات الظاهرة للعملاء">
            <div className="grid gap-3 md:grid-cols-3">
              <label className="block">
                <FieldLabel>Email</FieldLabel>
                <input
                  name="email"
                  type="email"
                  defaultValue={settings?.email ?? ""}
                  className="field-input"
                  dir="ltr"
                />
              </label>
              <label className="block">
                <FieldLabel>Phone</FieldLabel>
                <input
                  name="phone"
                  defaultValue={settings?.phone ?? ""}
                  className="field-input"
                  dir="ltr"
                />
              </label>
              <label className="block">
                <FieldLabel>WhatsApp URL</FieldLabel>
                <input
                  name="whatsapp"
                  defaultValue={settings?.whatsapp ?? ""}
                  className="field-input"
                  placeholder="https://wa.me/..."
                  dir="ltr"
                />
              </label>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <label className="block">
                <FieldLabel>الموقع عربي</FieldLabel>
                <input
                  name="location_ar"
                  defaultValue={settings?.location?.ar ?? ""}
                  className="field-input"
                />
              </label>
              <label className="block">
                <FieldLabel>Location EN</FieldLabel>
                <input
                  name="location_en"
                  defaultValue={settings?.location?.en ?? ""}
                  className="field-input"
                />
              </label>
            </div>
          </AdminSection>

          <AdminSection title="السوشيال">
            <div className="grid gap-3 md:grid-cols-3">
              <label className="block">
                <FieldLabel>GitHub</FieldLabel>
                <input
                  name="github"
                  defaultValue={settings?.social?.github ?? ""}
                  className="field-input"
                  dir="ltr"
                />
              </label>
              <label className="block">
                <FieldLabel>LinkedIn</FieldLabel>
                <input
                  name="linkedin"
                  defaultValue={settings?.social?.linkedin ?? ""}
                  className="field-input"
                  dir="ltr"
                />
              </label>
              <label className="block">
                <FieldLabel>X</FieldLabel>
                <input
                  name="x"
                  defaultValue={settings?.social?.x ?? ""}
                  className="field-input"
                  dir="ltr"
                />
              </label>
            </div>
          </AdminSection>

          <div className="admin-sticky-save">
            <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-[var(--muted)]">تظهر التغييرات في الفوتر وصفحات التواصل</p>
              <SubmitButton>حفظ الإعدادات</SubmitButton>
            </div>
          </div>
        </form>

        <aside className="space-y-3 lg:sticky lg:top-6 lg:self-start">
          <h2 className="font-display text-lg font-semibold">معاينة سريعة</h2>
          <AdminCard className="space-y-3 bg-[var(--ink)] text-white">
            <p className="text-[10px] font-semibold tracking-[0.16em] text-white/55 uppercase">
              Brand
            </p>
            <p className="font-display text-2xl font-semibold">
              {settings?.name?.ar || settings?.legal_name || "Arkan Studio"}
            </p>
            <p className="text-sm text-white/70">
              {settings?.tagline?.ar || "Systems that run the business."}
            </p>
            <div className="border-t border-white/10 pt-3 text-xs text-white/65 space-y-1.5">
              <p>{settings?.email || "email@example.com"}</p>
              <p>{settings?.phone || "—"}</p>
              <p>{settings?.location?.ar || "—"}</p>
            </div>
          </AdminCard>
          <AdminCard className="text-sm text-[var(--muted)]">
            بعد الحفظ تُحدَّث صفحات الموقع العامة (AR/EN). راجع الفوتر للتأكد من الروابط.
          </AdminCard>
        </aside>
      </div>
    </AdminPage>
  );
}
