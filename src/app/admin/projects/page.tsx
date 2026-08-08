import Link from "next/link";
import { ConfirmSubmit } from "@/components/admin/ConfirmSubmit";
import { SubmitButton } from "@/components/admin/SubmitButton";
import {
  AdminBadge,
  AdminCard,
  AdminChip,
  AdminEmpty,
  AdminFlash,
  AdminHeader,
  AdminListRow,
  AdminPage,
  AdminToolbar,
} from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";
import { rowToProject, type ProjectRow } from "@/lib/content/types";
import { deleteProjectAction, toggleProjectPublishedAction } from "../actions";

export const metadata = {
  title: "المشاريع",
};

export default async function AdminProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; q?: string; filter?: string }>;
}) {
  const { supabase } = await requireAdmin();
  const sp = await searchParams;
  const filter = sp.filter ?? "all";
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    return (
      <AdminPage>
        <AdminHeader title="المشاريع" />
        <AdminFlash error="1" errorText="تعذر تحميل المشاريع." />
      </AdminPage>
    );
  }

  const all = ((data ?? []) as ProjectRow[]).map((row) => ({
    project: rowToProject(row),
    row,
  }));

  const publishedCount = all.filter(({ row }) => row.published).length;
  const draftCount = all.length - publishedCount;
  const featuredCount = all.filter(({ project }) => project.featured).length;

  let items = all;
  if (filter === "published") items = all.filter(({ row }) => row.published);
  if (filter === "draft") items = all.filter(({ row }) => !row.published);
  if (filter === "featured") items = all.filter(({ project }) => project.featured);

  const needle = sp.q?.trim().toLowerCase();
  if (needle) {
    items = items.filter(
      ({ project }) =>
        project.title.ar.toLowerCase().includes(needle) ||
        project.title.en.toLowerCase().includes(needle) ||
        project.slug.includes(needle) ||
        project.id.toLowerCase().includes(needle),
    );
  }

  const filterQs = (f: string) => {
    const params = new URLSearchParams();
    if (f !== "all") params.set("filter", f);
    if (sp.q) params.set("q", sp.q);
    const qs = params.toString();
    return qs ? `/admin/projects?${qs}` : "/admin/projects";
  };

  return (
    <AdminPage>
      <AdminHeader
        eyebrow="Systems / Projects"
        title="المشاريع"
        description={`${all.length} نظام · ${publishedCount} منشور · ${draftCount} مسودة`}
        actions={
          <Link href="/admin/projects/new" className="btn-primary">
            مشروع جديد
          </Link>
        }
      />

      <AdminFlash error={sp.error} errorText="تعذّر حفظ أو حذف المشروع." />

      <div className="flex flex-wrap gap-2">
        <AdminChip href={filterQs("all")} active={filter === "all"}>
          الكل · {all.length}
        </AdminChip>
        <AdminChip href={filterQs("published")} active={filter === "published"}>
          منشور · {publishedCount}
        </AdminChip>
        <AdminChip href={filterQs("draft")} active={filter === "draft"}>
          مسودة · {draftCount}
        </AdminChip>
        <AdminChip href={filterQs("featured")} active={filter === "featured"}>
          مميز · {featuredCount}
        </AdminChip>
      </div>

      <AdminToolbar>
        <form className="flex w-full flex-wrap gap-3">
          {filter !== "all" ? <input type="hidden" name="filter" value={filter} /> : null}
          <input
            name="q"
            defaultValue={sp.q ?? ""}
            placeholder="بحث بالعنوان أو الـ slug..."
            className="field-input max-w-md flex-1"
          />
          <SubmitButton pendingLabel="جارٍ البحث…">بحث</SubmitButton>
        </form>
      </AdminToolbar>

      {items.length === 0 ? (
        <AdminEmpty
          title="لا توجد مشاريع"
          description="أنشئ أول نظام لعرضه في الـ Atlas وControl Rooms."
          action={
            <Link href="/admin/projects/new" className="btn-primary">
              مشروع جديد
            </Link>
          }
        />
      ) : (
        <AdminCard padded={false}>
          <ul className="divide-y divide-[var(--line)]">
            {items.map(({ project, row }) => (
              <li key={project.id}>
                <AdminListRow>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium tracking-tight">
                        {project.title.ar}{" "}
                        <span className="text-[var(--muted)]">/ {project.title.en}</span>
                      </p>
                      {row.published ? (
                        <AdminBadge tone="ok">منشور</AdminBadge>
                      ) : (
                        <AdminBadge>مسودة</AdminBadge>
                      )}
                      {project.featured ? <AdminBadge tone="signal">مميز</AdminBadge> : null}
                    </div>
                    <p className="mt-1 text-xs text-[var(--muted)]">
                      <span className="font-mono">{project.slug}</span>
                      {" · "}
                      {project.status} · {project.sector} · ترتيب {row.sort_order}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <form action={toggleProjectPublishedAction}>
                      <input type="hidden" name="id" value={project.id} />
                      <button
                        type="submit"
                        className="rounded-lg border border-[var(--line)] px-3 py-2 text-xs font-semibold text-[var(--muted)] transition hover:border-[var(--ink)] hover:text-[var(--fg)]"
                      >
                        {row.published ? "إلغاء النشر" : "نشر"}
                      </button>
                    </form>
                    <Link
                      href={`/ar/work/${project.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost-dark text-sm"
                    >
                      معاينة
                    </Link>
                    <Link
                      href={`/admin/projects/${project.id}`}
                      className="btn-primary text-sm !min-h-10 !px-3 !py-2"
                    >
                      تعديل
                    </Link>
                    <form action={deleteProjectAction}>
                      <input type="hidden" name="id" value={project.id} />
                      <ConfirmSubmit
                        message={`حذف المشروع «${project.title.ar}» نهائيًا؟`}
                        className="rounded-lg px-3 py-2 text-sm text-[var(--danger)] hover:bg-[color-mix(in_oklab,var(--danger)_8%,white)]"
                      >
                        حذف
                      </ConfirmSubmit>
                    </form>
                  </div>
                </AdminListRow>
              </li>
            ))}
          </ul>
        </AdminCard>
      )}
    </AdminPage>
  );
}
