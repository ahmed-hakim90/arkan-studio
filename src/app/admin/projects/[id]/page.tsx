import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectEditor } from "@/components/admin/ProjectEditor";
import { AdminBackLink, AdminHeader, AdminPage } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";
import { rowToProject, type ProjectRow } from "@/lib/content/types";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ ok?: string; error?: string }>;
};

export default async function AdminProjectEditPage({ params, searchParams }: Props) {
  const { id } = await params;
  const sp = await searchParams;
  const { supabase } = await requireAdmin();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) notFound();

  const row = data as ProjectRow;
  const project = rowToProject(row);

  return (
    <AdminPage>
      <AdminBackLink href="/admin/projects" label="المشاريع" />
      <AdminHeader
        title={`تعديل: ${project.title.ar}`}
        description={`${project.slug} · ${row.published ? "منشور" : "مسودة"}`}
        actions={
          <Link
            href={`/ar/work/${project.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost-dark text-sm"
          >
            معاينة الموقع ↗
          </Link>
        }
      />
      <ProjectEditor
        project={project}
        published={row.published}
        sortOrder={row.sort_order}
        message={sp.ok ? "ok" : sp.error ? "error" : null}
      />
    </AdminPage>
  );
}
