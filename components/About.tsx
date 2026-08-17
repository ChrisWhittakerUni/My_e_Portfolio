import { GraduationCap, MapPin, Radio, Wrench } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/Section";
import { aboutParagraphs, site } from "@/data/site";

const facts = [
  { icon: GraduationCap, label: "Studying", value: "BSc (Eng) Electrical & Computer Engineering" },
  { icon: Wrench, label: "Working on", value: "Robust control, embedded drives, medical imaging ML" },
  { icon: MapPin, label: "Based in", value: site.location },
  { icon: Radio, label: "Open to", value: "Graduate roles, internships, hardware-adjacent software" },
];

export function About() {
  return (
    <Section id="about">
      <SectionHeading
        eyebrow="01 / about"
        title="Engineer across the hardware–software boundary"
        description="Comfortable at the oscilloscope and in the repo, and most useful where the two have to agree."
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
        <div className="space-y-5">
          {aboutParagraphs.map((paragraph, index) => (
            <Reveal key={paragraph.slice(0, 32)} delay={index * 0.06}>
              <p className="text-base leading-relaxed text-muted">{paragraph}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <ul className="card-surface divide-y divide-border overflow-hidden rounded-2xl">
            {facts.map(({ icon: Icon, label, value }) => (
              <li key={label} className="flex gap-4 p-5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                  <Icon size={17} />
                </span>
                <div className="min-w-0">
                  <p className="numeric text-xs uppercase tracking-wider text-muted">
                    {label}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed">{value}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
