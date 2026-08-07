import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { rowToProject, type ProjectRow } from "@/lib/content/types";
import { deleteProjectAction } from "../actions";

export default async function AdminProjectsPage() {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    return (
      <main className="px-6 py-10">
        <p className="text-[var(--danger)]">تعذر تحميل المشاريع.</p>
      </main>
    );
  }

  const projects = ((data ?? []) as ProjectRow[]).map(rowToProject);

  return (
    <main className="px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-3xl font-semibold">المشاريع</h1>
            <p className="mt-2 text-sm text-[var(--muted)]">
              {projects.length} نظام — تعديل كامل للنموذج الغني
            </p>
          </div>
          <Link href="/admin/projects/new" className="btn-primary">
            مشروع جديد
          </Link>
        </div>

        <ul className="mt-8 divide-y divide-[var(--line)] rounded-2xl border border-[var(--line)] bg-[var(--surface)]">
          {projects.map((project) => (
            <li
              key={project.id}
              className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"
            >
              <div>
                <p className="font-medium">
                  {project.title.ar}{" "}
                  <span className="text-[var(--muted)]">/ {project.title.en}</span>
                </p>
                <p className="mt-1 text-xs text-[var(--muted)]">
                  {project.slug} · {project.status} · {project.sector}
                  {project.featured ? " · مميز" : ""}
                </p>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/admin/projects/${project.id}`}
                  className="btn-ghost-dark text-sm"
                >
                  تعديل
                </Link>
                <form action={deleteProjectAction}>
                  <input type="hidden" name="id" value={project.id} />
                  <button
                    type="submit"
                    className="rounded-lg px-3 py-2 text-sm text-[var(--danger)] hover:bg-[var(--signal-soft)]"
                  >
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
