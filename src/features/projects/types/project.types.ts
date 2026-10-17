import type { StaticImageData } from "next/image";

export type ProjectKind = "client" | "personal";

export type ProjectStatus =
  | "live"
  | "demo"
  | "launching-soon"
  | "in-progress"
  | "shipped";

export type ProjectMedia =
  /** A tall full-page screenshot that scrolls on hover. */
  | { type: "scroll"; image: StaticImageData; alt: string; badge?: string }
  /** A single viewport screenshot that zooms slightly on hover. */
  | { type: "image"; image: StaticImageData; alt: string }
  /**
   * Drag to compare an old design with the redesign. Both images are saved
   * full-page screenshots, so this keeps working after the old site is gone.
   * On hover, both pages scroll down together.
   */
  | {
      type: "compare";
      before: StaticImageData;
      after: StaticImageData;
      beforeAlt: string;
      afterAlt: string;
      afterLabel?: string;
    }
  /** No screenshot yet (unlaunched work). */
  | { type: "placeholder" };

export interface Project {
  /** Share of the work, shown as meters on the featured card. */
  contribution?: { label: string; value: number; display: string }[];
  description: string;
  /** Address shown in the browser frame. */
  displayUrl: string;
  featured?: boolean;
  /** Keep the entry but leave it off the site (e.g. while a demo is down). */
  hidden?: boolean;
  kind: ProjectKind;
  /** For learning builds: what the project taught me. */
  learned?: string;
  linkLabel?: string;
  media: ProjectMedia;
  /** What Nirmal personally built. */
  myPart: string;
  /** Placeholder cards (e.g. unlaunched work) have no link or "my part". */
  placeholder?: boolean;
  primaryTech?: string[];
  slug: string;
  status: ProjectStatus;
  /** Overrides the default status text, e.g. "Shipped 2025". */
  statusLabel?: string;
  tech: string[];
  title: string;
  /** Public link, if the project can be visited. */
  url?: string;
}

/** A small early build, shown on the "Where it started" path. */
export interface SmallBuild {
  image: StaticImageData;
  /** One plain line on what building it taught me. */
  learned: string;
  tech: string;
  title: string;
  url: string;
}

export interface SmallBuildStep {
  builds: SmallBuild[];
  note: string;
  title: string;
}
