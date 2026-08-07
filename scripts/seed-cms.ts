/**
 * Seed CMS tables from file-based content.
 * Usage: npx tsx scripts/seed-cms.ts
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { projects } from "../src/content/projects";
import { team } from "../src/content/team";
import { siteConfig } from "../src/lib/site";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const email = process.env.SEED_ADMIN_EMAIL ?? "ahmedabdulhakim90@gmail.com";
const password = process.env.SEED_ADMIN_PASSWORD;

if (!url || !anon) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY");
  process.exit(1);
}
if (!password) {
  console.error("Set SEED_ADMIN_PASSWORD to run seed");
  process.exit(1);
}

const adminPassword: string = password;

const EDITABLE_NAMESPACES = [
  "Hero",
  "Capabilities",
  "Studio",
  "Legal",
  "Cookies",
  "Pillars",
  "Home",
  "Meta",
  "Atlas",
  "Nav",
  "Footer",
  "ControlRoom",
  "Start",
] as const;

type Nested = Record<string, unknown>;

function flatten(
  obj: Nested,
  prefix = "",
): Array<{ path: string; value: string }> {
  const out: Array<{ path: string; value: string }> = [];
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      out.push(...flatten(value as Nested, path));
    } else if (typeof value === "string") {
      out.push({ path, value });
    }
  }
  return out;
}

function projectRow(project: (typeof projects)[number], index: number) {
  const {
    id,
    slug,
    title,
    descriptor,
    summary,
    context,
    challenge,
    solution,
    impact,
    sector,
    systemType,
    status,
    featured,
    region,
    liveUrl,
    roles,
    modules,
    workflows,
    integrations,
    stack,
    mass,
    capabilities,
    outcomes,
    arkanScope,
    media,
    relatedProjects,
    scale,
    dna,
    atlas,
  } = project;

  return {
    id,
    slug,
    title,
    descriptor,
    summary,
    context,
    challenge,
    solution,
    impact,
    sector,
    system_type: systemType,
    status,
    featured,
    published: true,
    region: region ?? [],
    live_url: liveUrl ?? null,
    sort_order: index,
    payload: {
      roles,
      modules,
      workflows,
      integrations,
      stack,
      mass,
      capabilities,
      outcomes,
      arkanScope,
      media: media ?? [],
      relatedProjects: relatedProjects ?? [],
      scale,
      dna,
      atlas,
    },
  };
}

async function main() {
  const supabase = createClient(url!, anon!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { error: authError } = await supabase.auth.signInWithPassword({
    email,
    password: adminPassword,
  });
  if (authError) {
    console.error("Admin login failed", authError.message);
    process.exit(1);
  }

  const rows = projects.map(projectRow);
  const { error: projectsError } = await supabase
    .from("projects")
    .upsert(rows, { onConflict: "id" });
  if (projectsError) {
    console.error("projects seed failed", projectsError.message);
    process.exit(1);
  }
  console.log(`Upserted ${rows.length} projects`);

  const teamRows = team.map((member, index) => ({
    id: member.id,
    name: member.name,
    role: member.role,
    pillar: member.pillar,
    photo_path: null,
    sort_order: index,
    active: true,
  }));
  const { error: teamError } = await supabase
    .from("team_members")
    .upsert(teamRows, { onConflict: "id" });
  if (teamError) {
    console.error("team seed failed", teamError.message);
    process.exit(1);
  }
  console.log(`Upserted ${teamRows.length} team members`);

  const { error: settingsError } = await supabase.from("site_settings").upsert(
    {
      id: 1,
      legal_name: siteConfig.legalName,
      name: siteConfig.name,
      tagline: siteConfig.tagline,
      description: siteConfig.description,
      email: siteConfig.email,
      phone: siteConfig.phone,
      whatsapp: siteConfig.whatsapp,
      location: siteConfig.location,
      social: siteConfig.social,
    },
    { onConflict: "id" },
  );
  if (settingsError) {
    console.error("settings seed failed", settingsError.message);
    process.exit(1);
  }
  console.log("Upserted site_settings");

  const ar = JSON.parse(
    readFileSync(resolve("messages/ar.json"), "utf8"),
  ) as Nested;
  const en = JSON.parse(
    readFileSync(resolve("messages/en.json"), "utf8"),
  ) as Nested;

  const copyRows: Array<{
    key: string;
    namespace: string;
    path: string;
    value_ar: string;
    value_en: string;
  }> = [];

  for (const ns of EDITABLE_NAMESPACES) {
    const arFlat = flatten((ar[ns] as Nested) ?? {}, "");
    const enMap = new Map(
      flatten((en[ns] as Nested) ?? {}, "").map((x) => [x.path, x.value]),
    );
    for (const item of arFlat) {
      copyRows.push({
        key: `${ns}.${item.path}`,
        namespace: ns,
        path: item.path,
        value_ar: item.value,
        value_en: enMap.get(item.path) ?? "",
      });
    }
  }

  // Upsert in chunks
  const chunkSize = 100;
  for (let i = 0; i < copyRows.length; i += chunkSize) {
    const chunk = copyRows.slice(i, i + chunkSize);
    const { error } = await supabase
      .from("site_copy")
      .upsert(chunk, { onConflict: "key" });
    if (error) {
      console.error("site_copy seed failed", error.message);
      process.exit(1);
    }
  }
  console.log(`Upserted ${copyRows.length} site_copy rows`);
  console.log("Seed complete");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
