export type Locale = "en" | "es";

export type LocalizedString = Partial<Record<Locale, string>>;

export type VisibilityRole =
  | "fullstack"
  | "frontend"
  | "backend"
  | "test-automation"
  | "all";

export interface BaseEntry {
  id: string;
  visibleFor?: VisibilityRole[];
}

export interface Profile {
  name: string;
  title: LocalizedString;
  email: string;
  location: LocalizedString;
  links: {
    label: string;
    url: string;
  }[];
  summary: LocalizedString;
  shortSummary: LocalizedString;
  roleSummaries: Partial<
    Record<Exclude<VisibilityRole, "all">, LocalizedString>
  >;
}

export interface Experience extends BaseEntry {
  company: string;
  role: LocalizedString;
  startDate: string;
  endDate?: string;
  description: LocalizedString;
  highlights: LocalizedString[];
  keywords: string[];
}

export interface Project extends BaseEntry {
  name: string;
  description: LocalizedString;
  url?: string;
  github?: string;
  keywords: string[];
}

export interface SkillSet extends BaseEntry {
  category: LocalizedString;
  skills: string[];
}

export interface Education extends BaseEntry {
  institution: string;
  degree: LocalizedString;
  startDate: string;
  endDate: string;
}

export interface ReasoningCase extends BaseEntry {
  title: LocalizedString;
  scenario: LocalizedString;
  approach: LocalizedString;
}

export interface CV {
  profile: Profile;
  experience: Experience[];
  projects: Project[];
  skills: SkillSet[];
  education: Education[];
  reasoning: ReasoningCase[];
}
