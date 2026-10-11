import type { CategoryId } from "./taxonomy.ts";

/** How much page a project gets. */
export type Tier =
  | "flagship" // full case study: graphic, stats, notes, gallery
  | "standard" // own page; sections render only when data exists
  | "note"; // listed on the index as an expandable row, no page of its own

export type Status = "active" | "complete" | "paused" | "archived";

/** Interactive graphic shown at the top of a project page. Registered in app/components/specimens.tsx. */
export type SpecimenId = "spectrogram" | "bedmesh" | "particles" | "model";

export type Beat = {
  label: string;
  title: string;
  intent?: string;
  body: string;
  facts?: string[];
};

/** `file` is relative to public/projects/<slug>/ */
export type MediaInput = {
  file: string;
  alt: string;
  caption: string;
  ratio: "wide" | "portrait" | "square";
  kind?: "image" | "video";
  /** a chart/diagram rather than a photo: shown in the gallery, never used as a card thumbnail */
  figure?: boolean;
  /** videos only: still frame shown before playback and as the card thumbnail */
  poster?: string;
};

export type Stat = { to: number; label: string; prefix?: string; suffix?: string; decimals?: number; text?: string };

export type Dossier = {
  architecture: string;
  decisions: string[];
  tools: string[];
};

export type ProjectInput = {
  slug: string;
  name: string;
  tier: Tier;
  status: Status;
  /** free-text shown next to the status dot, e.g. "V1 CAD complete, V2 in progress" */
  statusNote?: string;
  start: number;
  /** omit for a single-year project; "present" while ongoing */
  end?: number | "present";
  /** homepage rank (1 = first); also the number shown on its cards. Leave out to keep it off the homepage showcase. */
  featured?: number;
  categories: CategoryId[];
  skills?: string[];
  role?: string;
  /** short descriptor under the title, e.g. "Mechanical Systems & Robot Kinematics". Falls back to the category names. */
  domain?: string;
  /** one line, <= 160 chars: cards, lists, meta description */
  summary: string;
  /** card title for the homepage showcase, when different from `name` */
  headline?: string;
  /** small label above the headline on the homepage showcase */
  kicker?: string;
  /** longer intro on the project page */
  deck?: string;
  /** the headline result, in a sentence */
  proof?: string;
  links?: { repo?: string; demo?: string; paper?: string; writeup?: string };
  stats?: Stat[];
  specimen?: SpecimenId;
  /** GLB, relative to public/projects/<slug>/ */
  model?: string;
  /** image used on cards (relative to public/projects/<slug>/). Defaults to the still, then the first photo. */
  cover?: string;
  /** short muted loop played when a card is hovered (relative to public/projects/<slug>/) */
  preview?: string;
  /** x, y, z rotation in degrees applied to the GLB so it sits upright (CAD exports vary) */
  modelRotation?: [number, number, number];
  /** still image for the 3D viewer fallback, relative to public/projects/<slug>/ */
  still?: string;
  media?: MediaInput[];
  notes?: Beat[];
  dossier?: Dossier;
  seo?: { title?: string; description?: string; ogTitle?: string; ogDescription?: string };
};

export type Media = Omit<MediaInput, "file" | "poster"> & { src: string; poster?: string };

export type Project = Omit<ProjectInput, "media" | "model" | "still" | "cover" | "preview"> & {
  media: Media[];
  preview?: string;
  model?: string;
  still?: string;
  /** best thumbnail for cards: first image, else the 3D still */
  thumb?: string;
  thumbIsFigure?: boolean;
  href?: string; // undefined for tier "note"
};

export type ExperienceItem = {
  title: string;
  role: string;
  when: string;
  summary: string;
  proof: string;
  /** slug of the related project, if any */
  project?: string;
};
