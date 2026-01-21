import {
  CV,
  Locale,
  LocalizedString,
  VisibilityRole,
  BaseEntry,
  Profile,
  Experience,
  Project,
  SkillSet,
  Education,
  ReasoningCase,
} from "@/storage/schema/cv";

// Resolved types (localized strings become plain strings)
export interface ResolvedProfile {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  links: { label: string; url: string }[];
  summary: string;
  roleSummary?: string;
}

export interface ResolvedExperience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  description: string;
  highlights: string[];
  keywords: string[];
}

export interface ResolvedProject {
  id: string;
  name: string;
  description: string;
  url?: string;
  github?: string;
  keywords: string[];
}

export interface ResolvedSkillSet {
  id: string;
  category: string;
  skills: string[];
}

export interface ResolvedEducation {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
}

export interface ResolvedReasoningCase {
  id: string;
  title: string;
  scenario: string;
  approach: string;
}

export interface ResolvedCV {
  profile: ResolvedProfile;
  experience: ResolvedExperience[];
  projects: ResolvedProject[];
  skills: ResolvedSkillSet[];
  education: ResolvedEducation[];
  reasoning: ResolvedReasoningCase[];
}

const DEFAULT_LOCALE: Locale = "en";

function resolveString(localized: LocalizedString, locale: Locale): string {
  return localized[locale] ?? localized[DEFAULT_LOCALE] ?? "";
}

function isVisibleFor(entry: BaseEntry, role: VisibilityRole): boolean {
  if (!entry.visibleFor || entry.visibleFor.length === 0) return true;
  return entry.visibleFor.includes("all") || entry.visibleFor.includes(role);
}

function resolveProfile(
  profile: Profile,
  locale: Locale,
  role: VisibilityRole,
): ResolvedProfile {
  const roleSummary =
    profile.roleSummaries[role as Exclude<VisibilityRole, "all">];
  return {
    name: profile.name,
    title: resolveString(profile.title, locale),
    email: profile.email,
    phone: profile.phone,
    location: resolveString(profile.location, locale),
    links: profile.links,
    summary: resolveString(profile.summary, locale),
    roleSummary: roleSummary ? resolveString(roleSummary, locale) : undefined,
  };
}

function resolveExperience(
  exp: Experience,
  locale: Locale,
): ResolvedExperience {
  return {
    id: exp.id,
    company: exp.company,
    role: resolveString(exp.role, locale),
    startDate: exp.startDate,
    endDate: exp.endDate,
    description: resolveString(exp.description, locale),
    highlights: exp.highlights.map((h) => resolveString(h, locale)),
    keywords: exp.keywords,
  };
}

function resolveProject(proj: Project, locale: Locale): ResolvedProject {
  return {
    id: proj.id,
    name: proj.name,
    description: resolveString(proj.description, locale),
    url: proj.url,
    github: proj.github,
    keywords: proj.keywords,
  };
}

function resolveSkillSet(skillSet: SkillSet, locale: Locale): ResolvedSkillSet {
  return {
    id: skillSet.id,
    category: resolveString(skillSet.category, locale),
    skills: skillSet.skills,
  };
}

function resolveEducation(edu: Education, locale: Locale): ResolvedEducation {
  return {
    id: edu.id,
    institution: edu.institution,
    degree: resolveString(edu.degree, locale),
    startDate: edu.startDate,
    endDate: edu.endDate,
  };
}

function resolveReasoning(
  reasoning: ReasoningCase,
  locale: Locale,
): ResolvedReasoningCase {
  return {
    id: reasoning.id,
    title: resolveString(reasoning.title, locale),
    scenario: resolveString(reasoning.scenario, locale),
    approach: resolveString(reasoning.approach, locale),
  };
}

export function getCVByRole(
  cv: CV,
  locale: Locale,
  role: VisibilityRole,
): ResolvedCV {
  return {
    profile: resolveProfile(cv.profile, locale, role),
    experience: cv.experience
      .filter((exp) => isVisibleFor(exp, role))
      .map((exp) => resolveExperience(exp, locale)),
    projects: cv.projects
      .filter((proj) => isVisibleFor(proj, role))
      .map((proj) => resolveProject(proj, locale)),
    skills: cv.skills
      .filter((skill) => isVisibleFor(skill, role))
      .map((skill) => resolveSkillSet(skill, locale)),
    education: cv.education
      .filter((edu) => isVisibleFor(edu, role))
      .map((edu) => resolveEducation(edu, locale)),
    reasoning: cv.reasoning
      .filter((r) => isVisibleFor(r, role))
      .map((r) => resolveReasoning(r, locale)),
  };
}
