"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { projectToRow, type ProjectRow } from "@/lib/content/types";
import { isLeadStatus, type LeadStatus } from "@/lib/leads";
import { createClient } from "@/lib/supabase/server";
import type { Project } from "@/content/types";
import { CAPABILITIES, SECTORS, STATUSES, SYSTEM_TYPES } from "@/content/projects";
import { sanitizeTeamLinks } from "@/lib/security/safe-url";

function revalidatePublic() {
  revalidatePath("/", "layout");
  revalidatePath("/admin", "layout");
  revalidatePath("/ar");
  revalidatePath("/en");
  revalidatePath("/ar/work");
  revalidatePath("/en/work");
  revalidatePath("/ar/studio");
  revalidatePath("/en/studio");
  revalidatePath("/ar/team");
  revalidatePath("/en/team");
  revalidatePath("/ar/start");
  revalidatePath("/en/start");
}

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password || password.length < 8) {
    redirect("/admin/login?error=invalid");
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect("/admin/login?error=auth");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login?error=auth");
  }

  const { data: admin } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!admin) {
    await supabase.auth.signOut();
    redirect("/admin/login?error=unauthorized");
  }

  redirect("/admin");
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

async function persistLeadStatus(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  const notes = String(formData.get("admin_notes") ?? "").slice(0, 4000);

  if (!id || !isLeadStatus(status)) {
    return { ok: false as const, reason: "invalid" as const };
  }

  const { supabase } = await requireAdmin();
  const { error } = await supabase
    .from("leads")
    .update({ status: status as LeadStatus, admin_notes: notes })
    .eq("id", id);

  if (error) {
    return { ok: false as const, reason: "save" as const };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/leads");
  return { ok: true as const };
}

export async function updateLeadStatusAction(formData: FormData) {
  const result = await persistLeadStatus(formData);
  if (!result.ok) {
    redirect(`/admin/leads?error=${result.reason}`);
  }
  redirect("/admin/leads?ok=1");
}

/** Client-friendly: updates without redirect (for quick status chips). */
export async function quickUpdateLeadStatusAction(formData: FormData) {
  return persistLeadStatus(formData);
}

function parseJsonField<T>(raw: string, fallback: T): T {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function localized(formData: FormData, base: string) {
  return {
    ar: String(formData.get(`${base}_ar`) ?? "").trim(),
    en: String(formData.get(`${base}_en`) ?? "").trim(),
  };
}

export async function saveProjectAction(formData: FormData) {
  const { supabase } = await requireAdmin();

  const id = String(formData.get("id") ?? "").trim();
  const slug = String(formData.get("slug") ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-");
  if (!id || !slug) {
    redirect("/admin/projects?error=invalid");
  }

  const sector = String(formData.get("sector") ?? "");
  const systemType = String(formData.get("system_type") ?? "");
  const status = String(formData.get("status") ?? "");
  if (
    !SECTORS.includes(sector as (typeof SECTORS)[number]) ||
    !SYSTEM_TYPES.includes(systemType as (typeof SYSTEM_TYPES)[number]) ||
    !STATUSES.includes(status as (typeof STATUSES)[number])
  ) {
    redirect(`/admin/projects/${id}?error=invalid`);
  }

  const capabilities = String(formData.get("capabilities") ?? "")
    .split(",")
    .map((c) => c.trim())
    .filter((c) => CAPABILITIES.includes(c as (typeof CAPABILITIES)[number]));

  const project: Project = {
    id,
    slug,
    title: localized(formData, "title"),
    descriptor: localized(formData, "descriptor"),
    summary: localized(formData, "summary"),
    context: localized(formData, "context"),
    challenge: localized(formData, "challenge"),
    thinking: localized(formData, "thinking"),
    solution: localized(formData, "solution"),
    impact: localized(formData, "impact"),
    behindInterface: (() => {
      const empty = { ar: "", en: "" };
      const fallback = {
        surfaceAction: empty,
        chain: [] as { ar: string; en: string }[],
        punchline: empty,
      };
      const raw = String(formData.get("behind_json") ?? "").trim();
      if (!raw || raw === "null") return fallback;
      return parseJsonField(raw, fallback);
    })(),
    techRationale: parseJsonField(
      String(formData.get("tech_rationale_json") ?? "[]"),
      [],
    ),
    sector: sector as Project["sector"],
    systemType: systemType as Project["systemType"],
    status: status as Project["status"],
    featured: formData.get("featured") === "on",
    region: String(formData.get("region") ?? "")
      .split(",")
      .map((r) => r.trim())
      .filter(Boolean),
    liveUrl: String(formData.get("live_url") ?? "").trim() || undefined,
    roles: parseJsonField(String(formData.get("roles_json") ?? "[]"), []),
    modules: parseJsonField(String(formData.get("modules_json") ?? "[]"), []),
    workflows: parseJsonField(String(formData.get("workflows_json") ?? "[]"), []),
    integrations: parseJsonField(
      String(formData.get("integrations_json") ?? "[]"),
      [],
    ),
    stack: parseJsonField(String(formData.get("stack_json") ?? "[]"), []),
    mass: parseJsonField(String(formData.get("mass_json") ?? "{}"), {}),
    capabilities: capabilities as Project["capabilities"],
    outcomes: parseJsonField(String(formData.get("outcomes_json") ?? "[]"), []),
    arkanScope: parseJsonField(String(formData.get("scope_json") ?? "[]"), []),
    media: parseJsonField(String(formData.get("media_json") ?? "[]"), []),
    relatedProjects: String(formData.get("related") ?? "")
      .split(",")
      .map((r) => r.trim())
      .filter(Boolean),
    scale: parseJsonField(String(formData.get("scale_json") ?? "{}"), {
      complexity: 3,
      modules: 0,
      roles: 0,
      integrations: 0,
    }),
    dna: String(formData.get("dna") ?? "")
      .split(",")
      .map((d) => d.trim())
      .filter(Boolean),
    atlas: parseJsonField(String(formData.get("atlas_json") ?? "{}"), {
      x: 50,
      y: 50,
    }),
  };

  const sortOrder = Number(formData.get("sort_order") ?? 0) || 0;
  const published = formData.get("published") === "on";
  const row = projectToRow(project, sortOrder, published);

  const { error } = await supabase.from("projects").upsert(row, { onConflict: "id" });
  if (error) {
    redirect(`/admin/projects/${id}?error=save`);
  }

  revalidatePublic();
  redirect(`/admin/projects/${id}?ok=1`);
}

export async function deleteProjectAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const { supabase } = await requireAdmin();
  await supabase.from("projects").delete().eq("id", id);
  revalidatePublic();
  redirect("/admin/projects");
}

export async function toggleProjectPublishedAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) {
    redirect("/admin/projects?error=invalid");
  }

  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("projects")
    .select("published")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    redirect("/admin/projects?error=save");
  }

  const { error: updateError } = await supabase
    .from("projects")
    .update({ published: !data.published })
    .eq("id", id);

  if (updateError) {
    redirect("/admin/projects?error=save");
  }

  revalidatePublic();
  redirect("/admin/projects");
}

export async function saveTeamMemberAction(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id =
    String(formData.get("id") ?? "").trim() ||
    String(formData.get("name_en") ?? "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-") ||
    randomUUID();

  const links = sanitizeTeamLinks({
    linkedin: formData.get("linkedin"),
    github: formData.get("github"),
    x: formData.get("x"),
    website: formData.get("website"),
  });

  const { error } = await supabase.from("team_members").upsert(
    {
      id,
      name: localized(formData, "name"),
      role: localized(formData, "role"),
      bio: localized(formData, "bio"),
      focus: localized(formData, "focus"),
      links,
      pillar: String(formData.get("pillar") ?? "product"),
      photo_path: String(formData.get("photo_path") ?? "").trim() || null,
      sort_order: Number(formData.get("sort_order") ?? 0) || 0,
      active: formData.get("active") === "on",
    },
    { onConflict: "id" },
  );

  if (error) {
    redirect("/admin/team?error=save");
  }

  revalidatePublic();
  redirect("/admin/team?ok=1");
}

export async function deleteTeamMemberAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const { supabase } = await requireAdmin();
  await supabase.from("team_members").delete().eq("id", id);
  revalidatePublic();
  redirect("/admin/team");
}

export async function saveSettingsAction(formData: FormData) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("site_settings").upsert(
    {
      id: 1,
      legal_name: String(formData.get("legal_name") ?? "").trim(),
      name: localized(formData, "name"),
      tagline: localized(formData, "tagline"),
      description: localized(formData, "description"),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      whatsapp: String(formData.get("whatsapp") ?? "").trim(),
      location: localized(formData, "location"),
      social: {
        github: String(formData.get("github") ?? "").trim(),
        linkedin: String(formData.get("linkedin") ?? "").trim(),
        x: String(formData.get("x") ?? "").trim(),
      },
    },
    { onConflict: "id" },
  );

  if (error) {
    redirect("/admin/settings?error=save");
  }

  revalidatePublic();
  redirect("/admin/settings?ok=1");
}

export async function saveCopyAction(formData: FormData) {
  const { supabase } = await requireAdmin();
  const key = String(formData.get("key") ?? "");
  const namespace = String(formData.get("namespace") ?? "");
  const path = String(formData.get("path") ?? "");
  if (!key || !namespace || !path) {
    redirect("/admin/copy?error=invalid");
  }

  const { error } = await supabase.from("site_copy").upsert(
    {
      key,
      namespace,
      path,
      value_ar: String(formData.get("value_ar") ?? ""),
      value_en: String(formData.get("value_en") ?? ""),
    },
    { onConflict: "key" },
  );

  if (error) {
    redirect(`/admin/copy?ns=${encodeURIComponent(namespace)}&error=save`);
  }

  revalidatePublic();
  revalidatePath("/admin/copy");
  redirect(`/admin/copy?ns=${encodeURIComponent(namespace)}&ok=1`);
}

export async function uploadMediaAction(formData: FormData) {
  const { supabase } = await requireAdmin();
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    redirect("/admin/media?error=file");
  }

  const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
  if (!allowed.includes(file.type) || file.size > 5 * 1024 * 1024) {
    redirect("/admin/media?error=invalid");
  }

  const ext =
    file.type === "image/jpeg"
      ? "jpg"
      : file.type === "image/png"
        ? "png"
        : file.type === "image/webp"
          ? "webp"
          : file.type === "image/gif"
            ? "gif"
            : "svg";

  const path = `uploads/${randomUUID()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const { error: uploadError } = await supabase.storage
    .from("media")
    .upload(path, buffer, { contentType: file.type, upsert: false });

  if (uploadError) {
    redirect("/admin/media?error=upload");
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("media").getPublicUrl(path);

  const labelAr = String(formData.get("label_ar") ?? "").trim() || file.name;
  const labelEn = String(formData.get("label_en") ?? "").trim() || file.name;
  const kind = String(formData.get("kind") ?? "photo");

  await supabase.from("media_assets").insert({
    path,
    public_url: publicUrl,
    kind: ["ui", "diagram", "photo", "other"].includes(kind) ? kind : "photo",
    label: { ar: labelAr, en: labelEn },
    mime_type: file.type,
    byte_size: file.size,
  });

  revalidatePath("/admin/media");
  redirect("/admin/media?ok=1");
}

export async function deleteMediaAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const path = String(formData.get("path") ?? "");
  if (!id || !path) return;

  const { supabase } = await requireAdmin();
  await supabase.storage.from("media").remove([path]);
  await supabase.from("media_assets").delete().eq("id", id);
  revalidatePath("/admin/media");
  redirect("/admin/media");
}

export type { ProjectRow };
