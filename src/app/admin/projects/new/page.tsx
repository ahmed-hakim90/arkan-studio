import { ProjectEditor } from "@/components/admin/ProjectEditor";
import { AdminBackLink, AdminHeader, AdminPage } from "@/components/admin/ui";
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
    thinking: L,
    solution: L,
    impact: L,
    behindInterface: {
      surfaceAction: L,
      chain: [],
      punchline: L,
    },
    techRationale: [],
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
    <AdminPage>
      <AdminBackLink href="/admin/projects" label="المشاريع" />
      <AdminHeader
        title="مشروع جديد"
        description="أدخل الأساسيات أولًا، ثم أكمل النموذج الغني للـ Control Room."
      />
      <ProjectEditor project={project} published sortOrder={99} isNew />
    </AdminPage>
  );
}
