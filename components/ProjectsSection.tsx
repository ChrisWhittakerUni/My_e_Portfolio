"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useState } from "react";

import { ProjectCard } from "@/components/ProjectCard";
import { ProjectModal } from "@/components/ProjectModal";
import { Section, SectionHeading } from "@/components/Section";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

export function ProjectsSection() {
  const [selected, setSelected] = useState<Project | null>(null);
  const reduceMotion = useReducedMotion();

  const closeModal = useCallback(() => setSelected(null), []);

  return (
    <Section id="projects" bordered>
      <SectionHeading
        eyebrow="03 / projects"
        title="Academic and personal projects:"
        description="Below is a few of the awesome projects I've worked on. Some are part of my degree work and others are personal."
      />

      <motion.div
        layout={!reduceMotion}
        className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {projects.map((project) => (
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

      {projects.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-dashed border-border bg-surface/50 p-10 text-center text-sm text-muted">
          Nothing to display — more on the bench.
        </p>
      ) : null}

      <ProjectModal project={selected} onClose={closeModal} />
    </Section>
  );
}
