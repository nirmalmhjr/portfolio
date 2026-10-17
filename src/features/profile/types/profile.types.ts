export interface ExperienceItem {
  company: string;
  companyUrl?: string;
  current?: boolean;
  end: string;
  highlights: string[];
  /** Tech that gets the accent highlight. */
  primaryTech?: string[];
  /** Project slugs (features/projects/constants/projects.ts) built in this role, linked on /resume. */
  projects?: string[];
  role: string;
  /** e.g. "Dec 2024". Leave empty to show only the end label. */
  start: string;
  tech: string[];
}

export interface SkillGroup {
  category: string;
  items: { name: string; primary?: boolean; note?: string }[];
}

export type StrengthIcon = "code" | "dashboard" | "migrate" | "business";

export interface Strength {
  description: string;
  icon: StrengthIcon;
  title: string;
}

export interface Testimonial {
  company?: string;
  name: string;
  quote: string;
  role: string;
}
