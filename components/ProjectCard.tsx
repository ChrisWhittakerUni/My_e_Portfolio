"use client";

import { ArrowUpRight, ExternalLink, FileText } from "lucide-react";

import { GithubIcon } from "@/components/BrandIcons";
import { cn } from "@/lib/utils";
import type { IconComponent, Project, ProjectLinkKind } from "@/types";

/** Icon per link kind, so `data/projects.ts` never imports a component. */
export const LINK_ICONS: Record<ProjectLinkKind, IconComponent> = {
  github: GithubIcon,
  demo: ExternalLink,
  report: FileText,
};

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
}

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface p-6",
        "transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-xl sm:p-7",
      )}
    >
      {/* Hover wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-accent-soft opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="relative flex flex-1 flex-col">
        <header className="flex flex-wrap items-center gap-2">
          {project.domains.map((domain) => (
            <span
              key={domain}
              className="numeric rounded-md border border-accent/30 bg-accent-soft px-2 py-1 text-[11px] text-accent"
            >
              {domain}
            </span>
          ))}
          <span className="numeric ml-auto text-[11px] text-muted">
            {project.period}
          </span>
        </header>

        <h3 className="mt-4 text-xl font-semibold tracking-tight sm:text-2xl">
          {/* Stretched hit area: the whole card opens the deep dive, while the
              real links below stay clickable via their own stacking context. */}
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="text-left after:absolute after:inset-0 after:content-[''] hover:text-accent focus-visible:outline-none"
            aria-label={`Open details for ${project.title}`}
          >
            {project.title}
          </button>
        </h3>

        <p className="mt-2.5 text-sm leading-relaxed text-muted">
          {project.tagline}
        </p>

        {/* Headline metrics */}
        <dl className="mt-5 grid grid-cols-1 gap-3 border-y border-border py-4 sm:grid-cols-3">
          {project.metrics.map((metric) => (
            <div key={metric.label}>
              <dt className="sr-only">{metric.label}</dt>
              <dd>
                <span className="numeric block text-base font-semibold text-accent">
                  {metric.value}
                </span>
                <span className="mt-0.5 block text-xs leading-snug text-muted">
                  {metric.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="numeric rounded-md border border-border bg-surface-muted px-2.5 py-1 text-[11px] text-muted"
            >
              {tech}
            </li>
          ))}
        </ul>

        <footer className="relative z-10 mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
          {project.links.map((link) => {
            const Icon = LINK_ICONS[link.kind];
            const isExternal = link.href.startsWith("http");

            return (
              <a
                key={`${link.kind}-${link.label}`}
                href={link.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer noopener" : undefined}
                className="inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-accent"
              >
                <Icon size={14} />
                {link.label}
              </a>
            );
          })}

          <button
            type="button"
            onClick={() => onOpen(project)}
            className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-accent"
          >
            Deep dive
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>
        </footer>
      </div>
    </article>
  );
}
