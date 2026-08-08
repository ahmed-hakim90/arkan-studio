import { unstable_noStore as noStore } from "next/cache";
import { pillarOrder, team as fileTeam } from "@/content/team";
import type { TeamMember } from "@/content/types";
import { hasSupabaseConfig } from "@/lib/supabase/env";
import { createAnonClient } from "@/lib/supabase/server";
import { rowToTeam, type TeamRow } from "./types";

export { pillarOrder };
export { pillarsForSector } from "@/content/team";

export type CmsTeamMember = TeamMember & { photoPath?: string };

function mergeFileFallback(member: CmsTeamMember): CmsTeamMember {
  const fallback = fileTeam.find((item) => item.id === member.id);
  if (!fallback) return member;

  return {
    ...member,
    bio: member.bio ?? fallback.bio,
    focus: member.focus ?? fallback.focus,
    links: member.links ?? fallback.links,
  };
}

export async function getTeam(): Promise<CmsTeamMember[]> {
  noStore();
  if (!hasSupabaseConfig()) return fileTeam;

  try {
    const supabase = createAnonClient();
    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .eq("active", true)
      .order("sort_order", { ascending: true });

    if (error || !data?.length) return fileTeam;
    return (data as TeamRow[]).map(rowToTeam).map(mergeFileFallback);
  } catch {
    return fileTeam;
  }
}
