import type { LucideIcon } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

/**
 * Any icon that takes a `size` prop — a Lucide icon, or one of the hand-rolled
 * brand marks in `components/BrandIcons.tsx`.
 */
export type IconComponent = ComponentType<
  SVGProps<SVGSVGElement> & { size?: number | string }
>;

/* -------------------------------------------------------------------------- */
/*                                  Projects                                   */
/* -------------------------------------------------------------------------- */

/**
 * The single source of truth for project domains. Adding an entry here
 * automatically adds a filter pill to the projects section.
 */
export const PROJECT_DOMAINS = [
  "Embedded & Hardware",
  "Control Systems",
  "Machine Learning",
  "Software & Web",
] as const;

export type ProjectDomain = (typeof PROJECT_DOMAINS)[number];

/** Filter pill values: every domain, plus the catch-all. */
export type ProjectFilterValue = "All" | ProjectDomain;

export type ProjectLinkKind = "github" | "demo" | "report";

export interface ProjectLink {
  kind: ProjectLinkKind;
  label: string;
  href: string;
}

/** A headline number worth putting on a card, e.g. `94.1% / Dice score`. */
export interface ProjectMetric {
  value: string;
  label: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  period: string;
  image?: string;
  video?: string; // e.g. "/videos/chargeapp-demo.mp4"
  metrics: ProjectMetric[];
  overview: string;
  role: string;
  featured?: boolean;
}
/* -------------------------------------------------------------------------- */
/*                                   Skills                                    */
/* -------------------------------------------------------------------------- */

export interface Skill {
  name: string;
  /** Optional qualifier rendered in the tooltip, e.g. "4-layer, KiCad". */
  note?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  blurb: string;
  icon: LucideIcon;
  skills: Skill[];
}

/* -------------------------------------------------------------------------- */
/*                            Experience & Education                           */
/* -------------------------------------------------------------------------- */

export type ExperienceKind =
  | "education"
  | "research"
  | "work";

export interface Experience {
  id: string;
  kind: ExperienceKind;
  title: string;
  organization: string;
  location?: string;
  period: string;
  summary: string;
  highlights: string[];
  tags?: string[];
}

/* -------------------------------------------------------------------------- */
/*                                    Site                                     */
/* -------------------------------------------------------------------------- */

export interface NavItem {
  label: string;
  href: `#${string}`;
}

export interface SocialLink {
  label: string;
  href: string;
  handle: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  summary: string;
  /** Short focus areas rendered as hero badges. */
  focusAreas: string[];
  location: string;
  email: string;
  resumeUrl: string;
  socials: {
    github: SocialLink;
    linkedin: SocialLink;
  };
  nav: NavItem[];
  /** Mono-font "spec sheet" rendered beside the hero copy. */
  specs: { key: string; value: string }[];
}
