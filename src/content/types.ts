export type LocalizedString = {
  ar: string;
  en: string;
};

export type LocalizedText = LocalizedString;

export type ProjectStatus =
  | "operating"
  | "deployed"
  | "evolving"
  | "building"
  | "venture"
  | "concept";

export type Sector =
  | "mobility"
  | "healthcare"
  | "commerce"
  | "operations"
  | "services"
  | "ventures"
  | "other";

export type SystemType =
  | "erp"
  | "operations"
  | "platform"
  | "commerce"
  | "ai"
  | "experience";

export type CapabilityId =
  | "product"
  | "ux"
  | "frontend"
  | "backend"
  | "data"
  | "ai"
  | "integrations"
  | "operations";

export type ProjectScale = {
  complexity: 1 | 2 | 3 | 4 | 5;
  modules: number;
  roles: number;
  integrations: number;
};

export type SystemMass = {
  modules?: number;
  roles?: number;
  workflows?: number;
  interfaces?: number;
  integrations?: number;
  automations?: number;
  dataDomains?: number;
  locations?: number;
};

export type TechLayer = {
  layer:
    | "interface"
    | "application"
    | "data"
    | "business"
    | "intelligence"
    | "payments"
    | "deployment"
    | "frontend"
    | "backend"
    | "ai"
    | "ops";
  items: string[];
  responsibility?: LocalizedString;
};

export type TechRationale = {
  why: LocalizedString;
  detail?: LocalizedString;
  tech?: string[];
};

export type BehindInterface = {
  surfaceAction: LocalizedString;
  chain: LocalizedString[];
  punchline: LocalizedString;
};

export type Role = {
  id: string;
  name: LocalizedString;
  modules?: string[];
  workflows?: string[];
  needs?: LocalizedString;
  sees?: LocalizedString;
  can?: LocalizedString;
};

export type Module = {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  solves?: LocalizedString;
  how?: LocalizedString;
  connects?: LocalizedString;
};

export type Workflow = {
  id: string;
  name: LocalizedString;
  steps: LocalizedString[];
  group?: "customer" | "operations" | "finance" | "management" | "exceptions";
};

export type Integration = {
  id: string;
  category: LocalizedString;
  system: string;
  purpose: LocalizedString;
};

export type Outcome = {
  from: LocalizedString;
  to: LocalizedString;
};

export type ProjectMedia = {
  id: string;
  kind: "ui" | "diagram" | "photo";
  label: LocalizedString;
};

export type Project = {
  id: string;
  slug: string;
  title: LocalizedString;
  descriptor: LocalizedString;
  summary: LocalizedString;
  context: LocalizedString;
  challenge: LocalizedString;
  thinking?: LocalizedString;
  solution: LocalizedString;
  impact: LocalizedString;
  behindInterface?: BehindInterface;
  techRationale?: TechRationale[];

  sector: Sector;
  systemType: SystemType;
  status: ProjectStatus;
  featured: boolean;
  region?: string[];

  roles: Role[];
  modules: Module[];
  workflows: Workflow[];
  integrations: Integration[];
  stack: TechLayer[];
  mass: SystemMass;
  capabilities: CapabilityId[];
  outcomes: Outcome[];
  arkanScope: LocalizedString[];
  media?: ProjectMedia[];
  relatedProjects?: string[];

  /** @deprecated prefer mass — kept for compatibility helpers */
  scale: ProjectScale;
  dna: string[];
  liveUrl?: string;
  atlas: { x: number; y: number };
};

export type TeamMember = {
  id: string;
  name: LocalizedString;
  role: LocalizedString;
  pillar: PillarId;
};

export type PillarId =
  | "product"
  | "experience"
  | "frontend"
  | "backend"
  | "operations"
  | "growth"
  | "design"
  | "ops";
