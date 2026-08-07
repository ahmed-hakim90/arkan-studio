import Link from "next/link";
import { ProjectEditor } from "@/components/admin/ProjectEditor";
import { requireAdmin } from "@/lib/admin/auth";
import type { Project } from "@/content/types";

function emptyProject(): Project {
  const id = `NEW-${Date.now().toString(36).toUpperCase()}`;
  const L = { ar: "", en: "" };
  return {
    id,
    slug: "new-system",
    title: { ar: "نظام جديد", en: "New system" },
    descriptor: L,
    summary: L,
    context: L,
    challenge: L,
    solution: L,
    impact: L,
    sector: "operations",
    systemType: "platform",
    status: "concept",
    featured: false,
    region: [],
    roles: [],
    modules: [],
    workflows: [],
    integrations: [],
    stack: [],
    mass: {},
    capabilities: ["product"],
    outcomes: [],
    arkanScope: [],
    media: [],
    relatedProjects: [],
    scale: { complexity: 2, modules: 0, roles: 0, integrations: 0 },
    dna: [],
    atlas: { x: 50, y: 50 },
  };
}

export default async function AdminNewProjectPage() {
  await requireAdmin();
  const project = emptyProject();

  return (
    <main className="px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <Link href="/admin/projects" className="text-sm text-[var(--muted)] hover:text-[var(--fg)]">
          ← المشاريع
        </Link>
        <h1 className="font-display mt-3 text-3xl font-semibold">مشروع جديد</h1>
        <div className="mt-8">
          <ProjectEditor
            project={project}
            published
            sortOrder={99}
            isNew
          />
        </div>
      </div>
    </main>
  );
}
