"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { useEffect, useRef } from "react";

import { LINK_ICONS } from "@/components/ProjectCard";
import type { Project } from "@/types";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  // Escape to close, and lock the page behind the overlay.
  useEffect(() => {
    if (!project) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    // Move focus into the dialog once it is mounted.
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 60);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      previouslyFocused.current?.focus?.();
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          key="project-modal"
          className="fixed inset-0 z-[60] flex items-end justify-center overflow-y-auto p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Close project details"
            onClick={onClose}
            className="fixed inset-0 -z-10 cursor-default bg-slate-950/70 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative my-0 w-full max-w-3xl overflow-hidden rounded-t-2xl border border-border bg-surface shadow-2xl sm:my-8 sm:rounded-2xl"
          >
            <header className="sticky top-0 z-10 flex items-start gap-4 border-b border-border bg-surface/95 px-6 py-5 backdrop-blur-md sm:px-8">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  {project.domains.map((domain) => (
                    <span
                      key={domain}
                      className="numeric rounded-md border border-accent/30 bg-accent-soft px-2 py-1 text-[11px] text-accent"
                    >
                      {domain}
                    </span>
                  ))}
                  <span className="numeric text-[11px] text-muted">
                    {project.period}
                  </span>
                </div>
                <h2
                  id="project-modal-title"
                  className="mt-3 text-2xl font-semibold tracking-tight"
                >
                  {project.title}
                </h2>
                <p className="numeric mt-1 text-xs text-muted">{project.role}</p>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border bg-surface text-muted transition-colors hover:border-accent/60 hover:text-accent"
              >
                <X size={17} />
              </button>
            </header>

            <div className="space-y-8 px-6 py-7 sm:px-8">
              <p className="text-base leading-relaxed text-muted">
                {project.overview}
              </p>

              <div>
                <h3 className="numeric text-xs uppercase tracking-[0.18em] text-accent">
                  Results
                </h3>
                <dl className="mt-4 grid gap-4 sm:grid-cols-3">
                  {project.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-xl border border-border bg-surface-muted p-4"
                    >
                      <dt className="sr-only">{metric.label}</dt>
                      <dd>
                        <span className="numeric block text-lg font-semibold text-accent">
                          {metric.value}
                        </span>
                        <span className="mt-1 block text-xs leading-snug text-muted">
                          {metric.label}
                        </span>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div>
                <h3 className="numeric text-xs uppercase tracking-[0.18em] text-accent">
                  Engineering highlights
                </h3>
                <ul className="mt-4 space-y-3">
                  {project.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3 text-sm leading-relaxed">
                      <Check
                        size={16}
                        className="mt-0.5 shrink-0 text-accent"
                        aria-hidden="true"
                      />
                      <span className="text-muted">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="numeric text-xs uppercase tracking-[0.18em] text-accent">
                  Stack
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="numeric rounded-md border border-border bg-surface-muted px-2.5 py-1 text-xs text-muted"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {project.links.length > 0 ? (
              <footer className="flex flex-wrap gap-3 border-t border-border bg-surface-muted/40 px-6 py-5 sm:px-8">
                {project.links.map((link) => {
                  const Icon = LINK_ICONS[link.kind];
                  const isExternal = link.href.startsWith("http");

                  return (
                    <a
                      key={`${link.kind}-${link.label}`}
                      href={link.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noreferrer noopener" : undefined}
                      className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm transition-colors hover:border-accent/60 hover:text-accent"
                    >
                      <Icon size={15} />
                      {link.label}
                    </a>
                  );
                })}
              </footer>
            ) : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
