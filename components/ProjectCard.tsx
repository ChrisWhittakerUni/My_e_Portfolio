"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
}

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface p-6",
        "transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-xl sm:p-7"
      )}
    >
      {/* Hover wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-accent-soft opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="relative flex flex-1 flex-col">
        <header className="flex items-center justify-between">
          <span className="numeric text-[11px] text-muted">
            {project.period}
          </span>
        </header>

        <h3 className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="text-left after:absolute after:inset-0 after:content-[''] hover:text-accent focus-visible:outline-none"
            aria-label={`Open details for ${project.title}`}
          >
            {project.title}
          </button>
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-muted">
          {project.tagline}
        </p>

        {/* Full Image Display Container (No Cropping) */}
        {project.image ? (
          <div className="mt-4 flex h-56 w-full items-center justify-center overflow-hidden rounded-xl border border-border bg-surface-muted">
            <Image
              src={project.image}
              alt={project.title}
              width={800}
              height={450}
              className="max-h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ) : null}

        {/* Full-width Metrics Section */}
        {project.metrics && project.metrics.length > 0 ? (
          <dl className="mt-auto pt-5 border-t border-border grid grid-cols-1 gap-3">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="w-full">
                <dt className="sr-only">{metric.label}</dt>
                <dd>
                  <span className="numeric block text-base font-semibold text-accent">
                    {metric.value}
                  </span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-muted">
                    {metric.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        ) : null}

        <footer className="relative z-10 mt-6 flex items-center justify-end pt-1">
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="inline-flex items-center gap-1 text-xs font-medium text-accent"
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