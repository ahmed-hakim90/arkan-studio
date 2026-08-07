import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectEditor } from "@/components/admin/ProjectEditor";
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
    <main className="px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <Link href="/admin/projects" className="text-sm text-[var(--muted)] hover:text-[var(--fg)]">
          ← المشاريع
        </Link>
        <h1 className="font-display mt-3 text-3xl font-semibold">
          تعديل: {project.title.ar}
        </h1>
        <div className="mt-8">
          <ProjectEditor
            project={project}
            published={row.published}
            sortOrder={row.sort_order}
            message={sp.ok ? "ok" : sp.error ? "error" : null}
          />
        </div>
      </div>
    </main>
  );
}
