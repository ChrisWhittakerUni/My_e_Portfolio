"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { PROJECT_DOMAINS, type ProjectFilterValue } from "@/types";

/** Filter pills: "All" plus every domain declared in `types`. */
export const PROJECT_FILTERS: ProjectFilterValue[] = ["All", ...PROJECT_DOMAINS];

interface ProjectFilterProps {
  value: ProjectFilterValue;
  onChange: (value: ProjectFilterValue) => void;
  /** Number of projects behind each pill, rendered as a superscript count. */
  counts: Record<ProjectFilterValue, number>;
  className?: string;
}

export function ProjectFilter({
  value,
  onChange,
  counts,
  className,
}: ProjectFilterProps) {
  return (
    <div
      role="tablist"
      aria-label="Filter projects by domain"
      className={cn("flex flex-wrap gap-2", className)}
    >
      {PROJECT_FILTERS.map((filter) => {
        const isActive = filter === value;

        return (
          <button
            key={filter}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(filter)}
            className={cn(
              "relative rounded-full border px-4 py-2 text-sm transition-colors",
              isActive
                ? "border-accent/60 text-accent"
                : "border-border bg-surface text-muted hover:border-accent/40 hover:text-foreground",
            )}
          >
            {isActive ? (
              <motion.span
                layoutId="project-filter-pill"
                className="absolute inset-0 -z-10 rounded-full bg-accent-soft"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            ) : null}
            {filter}
            <span className="numeric ml-1.5 text-[11px] opacity-60">
              {counts[filter] ?? 0}
            </span>
          </button>
        );
      })}
    </div>
  );
}
