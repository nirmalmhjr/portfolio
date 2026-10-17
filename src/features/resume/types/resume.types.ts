export interface ResumeLink {
  href: string;
  label: string;
  /** Shown after the link, e.g. "preview". */
  note?: string;
}

export interface ResumeRow {
  label: string;
  value: string;
}

export interface ResumeJob {
  company: string;
  dates: string;
  highlights: string[];
  key: string;
  role: string;
  sites: ResumeLink[];
}

export interface ResumeProject {
  description: string;
  key: string;
  link?: ResumeLink;
  tech: string;
  title: string;
}
