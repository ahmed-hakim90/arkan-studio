import { ConfirmSubmit } from "@/components/admin/ConfirmSubmit";
import { CopyTextButton } from "@/components/admin/CopyTextButton";
import { MediaDropzone } from "@/components/admin/MediaDropzone";
import { SubmitButton } from "@/components/admin/SubmitButton";
import {
  AdminBadge,
  AdminCard,
  AdminChip,
  AdminEmpty,
  AdminFlash,
  AdminHeader,
  AdminPage,
  FieldLabel,
} from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";
import type { MediaRow } from "@/lib/content/types";
import { deleteMediaAction, uploadMediaAction } from "../actions";

export const metadata = {
  title: "الوسائط",
};

function formatBytes(n: number | null) {
  if (!n) return "—";
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

export default async function AdminMediaPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; error?: string; kind?: string }>;
}) {
  const { supabase } = await requireAdmin();
  const sp = await searchParams;
  let query = supabase
    .from("media_assets")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  if (sp.kind && ["photo", "ui", "diagram", "other"].includes(sp.kind)) {
    query = query.eq("kind", sp.kind);
  }

  const { data } = await query;
  const assets = (data ?? []) as MediaRow[];

  return (
    <AdminPage>
      <AdminHeader
        eyebrow="Library / Media"
        title="الوسائط"
        description="رفع صور للاستخدام في المشاريع والفريق (JPEG/PNG/WebP/GIF/SVG — حتى 5MB)."
      />
      <AdminFlash
        ok={sp.ok}
        error={sp.error}
        okText="تم الرفع بنجاح."
        errorText="فشل الرفع — تحقق من النوع/الحجم أو صلاحيات التخزين."
      />

      <AdminCard>
        <form action={uploadMediaAction} className="space-y-4">
          <MediaDropzone />
          <div className="grid gap-3 md:grid-cols-3">
            <label className="block">
              <FieldLabel>وصف عربي</FieldLabel>
              <input name="label_ar" className="field-input" />
            </label>
            <label className="block">
              <FieldLabel>Label EN</FieldLabel>
              <input name="label_en" className="field-input" />
            </label>
            <label className="block">
              <FieldLabel>النوع</FieldLabel>
              <select name="kind" defaultValue="photo" className="field-input">
                <option value="photo">photo</option>
                <option value="ui">ui</option>
                <option value="diagram">diagram</option>
                <option value="other">other</option>
              </select>
            </label>
          </div>
          <SubmitButton pendingLabel="جارٍ الرفع…">رفع الملف</SubmitButton>
        </form>
      </AdminCard>

      <div className="flex flex-wrap gap-2">
        {["", "photo", "ui", "diagram", "other"].map((kind) => (
          <AdminChip
            key={kind || "all"}
            href={kind ? `/admin/media?kind=${kind}` : "/admin/media"}
            active={(sp.kind ?? "") === kind}
          >
            {kind || "الكل"}
          </AdminChip>
        ))}
      </div>

      {assets.length === 0 ? (
        <AdminEmpty
          title="لا توجد وسائط"
          description="ارفع أول صورة لاستخدام مسارها في الفريق أو المشاريع."
        />
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {assets.map((asset) => (
            <li key={asset.id}>
              <AdminCard padded={false} className="overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset.public_url}
                  alt={asset.label.ar || asset.label.en}
                  className="h-44 w-full object-cover"
                />
                <div className="space-y-2 p-4 text-xs">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium text-sm">
                      {asset.label.ar || asset.label.en}
                    </p>
                    <AdminBadge>{asset.kind}</AdminBadge>
                  </div>
                  <p className="text-[var(--muted)]">
                    {formatBytes(asset.byte_size)} · {asset.mime_type ?? "—"}
                  </p>
                  <div className="flex items-center justify-between gap-2 rounded-lg bg-[var(--surface-2)] px-2 py-1.5">
                    <p className="truncate font-mono" title={asset.path}>
                      {asset.path}
                    </p>
                    <CopyTextButton value={asset.path} label="مسار" />
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <CopyTextButton value={asset.public_url} label="نسخ الرابط" />
                    <form action={deleteMediaAction}>
                      <input type="hidden" name="id" value={asset.id} />
                      <input type="hidden" name="path" value={asset.path} />
                      <ConfirmSubmit
                        message="حذف هذا الملف من التخزين؟"
                        className="text-[var(--danger)] hover:underline"
                      >
                        حذف
                      </ConfirmSubmit>
                    </form>
                  </div>
                </div>
              </AdminCard>
            </li>
          ))}
        </ul>
      )}
    </AdminPage>
  );
}
