import {
  Briefcase,
  CircuitBoard,
  FlaskConical,
  GraduationCap,
  Users,
  type LucideIcon,
} from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/Section";
import { experiences } from "@/data/experience";
import type { ExperienceKind } from "@/types";

const KIND_META: Record<ExperienceKind, { icon: LucideIcon; label: string }> = {
  education: { icon: GraduationCap, label: "Education" },
  research: { icon: FlaskConical, label: "Research" },
  work: { icon: Briefcase, label: "Work" },
};

export function Timeline() {
  return (
    <Section id="experience" bordered>
      <SectionHeading
        eyebrow="04 / experience"
        title="Education, Research and Work Experience"
        description="Here's a detailed list of what I've been up to over the last 4 years in terms of education and work experience."
      />

      <ol className="relative mt-12 before:absolute before:bottom-4 before:left-[19px] before:top-4 before:w-px before:bg-border before:content-['']">
        {experiences.map((entry, index) => {
          const { icon: Icon, label } = KIND_META[entry.kind];

          return (
            <li key={entry.id} className="relative pb-8 pl-14 last:pb-0">
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 grid h-10 w-10 place-items-center rounded-xl border border-border bg-surface text-accent"
              >
                <Icon size={18} />
              </span>

              <Reveal delay={index * 0.05}>
                <article className="group rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:border-accent/50 hover:shadow-lg">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className="numeric rounded-md bg-accent-soft px-2 py-1 text-[11px] uppercase tracking-wider text-accent">
                      {label}
                    </span>
                    <span className="numeric text-xs text-muted">{entry.period}</span>
                  </div>

                  <h3 className="mt-3 text-lg font-semibold tracking-tight">
                    {entry.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    {entry.organization}
                    {entry.location ? (
                      <>
                        <span aria-hidden="true"> · </span>
                        {entry.location}
                      </>
                    ) : null}
                  </p>

                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    {entry.summary}
                  </p>

                  <ul className="mt-4 space-y-2">
                    {entry.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex gap-3 text-sm leading-relaxed text-muted"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
                        />
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  {entry.tags && entry.tags.length > 0 ? (
                    <ul className="mt-5 flex flex-wrap gap-1.5">
                      {entry.tags.map((tag) => (
                        <li
                          key={tag}
                          className="numeric rounded-md border border-border bg-surface-muted px-2.5 py-1 text-[11px] text-muted"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
