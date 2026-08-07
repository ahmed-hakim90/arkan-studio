import type {
  BehindInterface,
  Integration,
  LocalizedString,
  Module,
  ProjectScale,
  Role,
  SystemMass,
  TechRationale,
  Workflow,
} from "./types";

export function L(ar: string, en: string): LocalizedString {
  return { ar, en };
}

export function mod(
  id: string,
  nameAr: string,
  nameEn: string,
  descAr: string,
  descEn: string,
  solvesAr: string,
  solvesEn: string,
  howAr: string,
  howEn: string,
  connectsAr: string,
  connectsEn: string,
): Module {
  return {
    id,
    name: L(nameAr, nameEn),
    description: L(descAr, descEn),
    solves: L(solvesAr, solvesEn),
    how: L(howAr, howEn),
    connects: L(connectsAr, connectsEn),
  };
}

export function role(
  id: string,
  nameAr: string,
  nameEn: string,
  needsAr: string,
  needsEn: string,
  seesAr: string,
  seesEn: string,
  canAr: string,
  canEn: string,
  modules: string[] = [],
  workflows: string[] = [],
): Role {
  return {
    id,
    name: L(nameAr, nameEn),
    needs: L(needsAr, needsEn),
    sees: L(seesAr, seesEn),
    can: L(canAr, canEn),
    modules,
    workflows,
  };
}

export function wf(
  id: string,
  ar: string,
  en: string,
  steps: [string, string][],
  group?: Workflow["group"],
): Workflow {
  return {
    id,
    name: L(ar, en),
    steps: steps.map(([a, e]) => L(a, e)),
    group,
  };
}

export function integ(
  id: string,
  catAr: string,
  catEn: string,
  system: string,
  purAr: string,
  purEn: string,
): Integration {
  return {
    id,
    category: L(catAr, catEn),
    system,
    purpose: L(purAr, purEn),
  };
}

export function behind(
  surfaceAr: string,
  surfaceEn: string,
  chain: [string, string][],
  punchAr: string,
  punchEn: string,
): BehindInterface {
  return {
    surfaceAction: L(surfaceAr, surfaceEn),
    chain: chain.map(([a, e]) => L(a, e)),
    punchline: L(punchAr, punchEn),
  };
}

export function techWhy(
  whyAr: string,
  whyEn: string,
  detailAr?: string,
  detailEn?: string,
  tech?: string[],
): TechRationale {
  return {
    why: L(whyAr, whyEn),
    detail:
      detailAr && detailEn ? L(detailAr, detailEn) : undefined,
    tech,
  };
}

export function scaleFromMass(
  mass: SystemMass,
  complexity: ProjectScale["complexity"],
): ProjectScale {
  return {
    complexity,
    modules: mass.modules ?? 0,
    roles: mass.roles ?? 0,
    integrations: mass.integrations ?? 0,
  };
}
