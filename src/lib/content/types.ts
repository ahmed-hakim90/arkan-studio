import type {
  CapabilityId,
  LocalizedString,
  Outcome,
  Project,
  ProjectMedia,
  ProjectScale,
  Role,
  Module,
  SystemMass,
  TechLayer,
  Workflow,
  Integration,
  TeamMember,
} from "@/content/types";

export type ProjectRow = {
  id: string;
  slug: string;
  title: LocalizedString;
  descriptor: LocalizedString;
  summary: LocalizedString;
  context: LocalizedString;
  challenge: LocalizedString;
  solution: LocalizedString;
  impact: LocalizedString;
  sector: Project["sector"];
  system_type: Project["systemType"];
  status: Project["status"];
  featured: boolean;
  published: boolean;
  region: string[] | null;
  live_url: string | null;
  sort_order: number;
  payload: {
    roles?: Role[];
    modules?: Module[];
    workflows?: Workflow[];
    integrations?: Integration[];
    stack?: TechLayer[];
    mass?: SystemMass;
    capabilities?: CapabilityId[];
    outcomes?: Outcome[];
    arkanScope?: LocalizedString[];
    media?: ProjectMedia[];
    relatedProjects?: string[];
    scale?: ProjectScale;
    dna?: string[];
    atlas?: { x: number; y: number };
    thinking?: LocalizedString;
    behindInterface?: Project["behindInterface"];
    techRationale?: Project["techRationale"];
  } | null;
};

export type TeamRow = {
  id: string;
  name: LocalizedString;
  role: LocalizedString;
  pillar: TeamMember["pillar"];
  photo_path: string | null;
  sort_order: number;
  active: boolean;
};

export type SiteSettingsRow = {
  id: number;
  legal_name: string;
  name: LocalizedString;
  tagline: LocalizedString;
  description: LocalizedString;
  email: string;
  phone: string;
  whatsapp: string;
  location: LocalizedString;
  social: {
    github?: string;
    linkedin?: string;
    x?: string;
  };
};

export type MediaRow = {
  id: string;
  path: string;
  public_url: string;
  kind: string;
  label: LocalizedString;
  mime_type: string | null;
  byte_size: number | null;
  created_at: string;
};

export function rowToProject(row: ProjectRow): Project {
  const payload = row.payload ?? {};
  const mass = payload.mass ?? {};
  const scale: ProjectScale = payload.scale ?? {
    complexity: 3,
    modules: mass.modules ?? 0,
    roles: mass.roles ?? 0,
    integrations: mass.integrations ?? 0,
  };

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    descriptor: row.descriptor,
    summary: row.summary,
    context: row.context,
    challenge: row.challenge,
    thinking: payload.thinking ?? { ar: "", en: "" },
    solution: row.solution,
    impact: row.impact,
    behindInterface: payload.behindInterface ?? {
      surfaceAction: { ar: "", en: "" },
      chain: [],
      punchline: { ar: "", en: "" },
    },
    techRationale: payload.techRationale ?? [],
    sector: row.sector,
    systemType: row.system_type,
    status: row.status,
    featured: row.featured,
    region: row.region ?? undefined,
    liveUrl: row.live_url ?? undefined,
    roles: payload.roles ?? [],
    modules: payload.modules ?? [],
    workflows: payload.workflows ?? [],
    integrations: payload.integrations ?? [],
    stack: payload.stack ?? [],
    mass,
    capabilities: payload.capabilities ?? [],
    outcomes: payload.outcomes ?? [],
    arkanScope: payload.arkanScope ?? [],
    media: payload.media,
    relatedProjects: payload.relatedProjects,
    scale,
    dna: payload.dna ?? [],
    atlas: payload.atlas ?? { x: 50, y: 50 },
  };
}

export function projectToRow(project: Project, sortOrder = 0, published = true) {
  return {
    id: project.id,
    slug: project.slug,
    title: project.title,
    descriptor: project.descriptor,
    summary: project.summary,
    context: project.context,
    challenge: project.challenge,
    solution: project.solution,
    impact: project.impact,
    sector: project.sector,
    system_type: project.systemType,
    status: project.status,
    featured: project.featured,
    published,
    region: project.region ?? [],
    live_url: project.liveUrl ?? null,
    sort_order: sortOrder,
    payload: {
      roles: project.roles,
      modules: project.modules,
      workflows: project.workflows,
      integrations: project.integrations,
      stack: project.stack,
      mass: project.mass,
      capabilities: project.capabilities,
      outcomes: project.outcomes,
      arkanScope: project.arkanScope,
      media: project.media ?? [],
      relatedProjects: project.relatedProjects ?? [],
      scale: project.scale,
      dna: project.dna,
      atlas: project.atlas,
      thinking: project.thinking,
      behindInterface: project.behindInterface,
      techRationale: project.techRationale,
    },
  };
}

export function rowToTeam(row: TeamRow): TeamMember & { photoPath?: string } {
  return {
    id: row.id,
    name: row.name,
    role: row.role,
    pillar: row.pillar,
    photoPath: row.photo_path ?? undefined,
  };
}
