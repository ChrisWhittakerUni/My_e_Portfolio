import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/Section";
import { skillCategories } from "@/data/skills";

export function SkillsGrid() {
  return (
    <Section id="skills" bordered>
      <SectionHeading
        eyebrow="02 / skills"
        title="Domains I build in"
        description="Grouped by the kind of problem rather than by tool — most projects pull from three of these at once."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category, index) => {
          const Icon = category.icon;

          return (
            <Reveal
              key={category.id}
              delay={index * 0.05}
              className="h-full"
            >
              <article className="group relative h-full overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg">
                {/* Accent wash that fades in on hover. */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-accent-soft opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />

                <div className="relative">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent transition-transform duration-300 group-hover:scale-105">
                    <Icon size={21} />
                  </span>

                  <h3 className="mt-5 text-lg font-semibold tracking-tight">
                    {category.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {category.blurb}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {category.skills.map((skill) => (
                      <li
                        key={skill.name}
                        title={skill.note}
                        className="numeric cursor-default rounded-md border border-border bg-surface-muted px-2.5 py-1 text-[11px] text-muted transition-colors hover:border-accent/50 hover:text-foreground"
                      >
                        {skill.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
