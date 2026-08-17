"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useMemo, useState } from "react";

import { ProjectCard } from "@/components/ProjectCard";
import { PROJECT_FILTERS, ProjectFilter } from "@/components/ProjectFilter";
import { ProjectModal } from "@/components/ProjectModal";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/Section";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";
import type { Project, ProjectFilterValue } from "@/types";

export function ProjectsSection() {
  const [filter, setFilter] = useState<ProjectFilterValue>("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const reduceMotion = useReducedMotion();

  const counts = useMemo(() => {
    return Object.fromEntries(
      PROJECT_FILTERS.map((value) => [
        value,
        value === "All"
          ? projects.length
          : projects.filter((project) => project.domains.includes(value)).length,
      ]),
    ) as Record<ProjectFilterValue, number>;
  }, []);

  const visible = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((project) => project.domains.includes(filter)),
    [filter],
  );

  const closeModal = useCallback(() => setSelected(null), []);

  return (
    <Section id="projects" bordered>
      <SectionHeading
        eyebrow="03 / projects"
        title="Things I've designed, built and measured"
        description="Each one shipped as working hardware, a running service, or a defended report. Open a card for the deep dive."
      />

      <Reveal className="mt-8" delay={0.05}>
        <ProjectFilter value={filter} onChange={setFilter} counts={counts} />
      </Reveal>

      <motion.div
        layout={!reduceMotion}
        className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project) => (
            <motion.div
              key={project.slug}
              layout={!reduceMotion}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className={cn(project.featured && "md:col-span-2")}
            >
              <ProjectCard project={project} onOpen={setSelected} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-dashed border-border bg-surface/50 p-10 text-center text-sm text-muted">
          Nothing in this domain yet — more on the bench.
        </p>
      ) : null}

      <ProjectModal project={selected} onClose={closeModal} />
    </Section>
  );
}
