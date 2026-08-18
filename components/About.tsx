import { Building, Footprints, GraduationCap, MapPin, Music, Radio, Sprout, Wrench } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/Section";
import { aboutParagraphs, site } from "@/data/site";
import { Activity } from "react";

const facts = [
  { icon: Wrench, label: "Engineering related", value: "In my spare time, I enjoy workinmg on small, fun engineering projects and builds." },
  { icon: Footprints, label: "Outdoor activities", value: "I love running, hiking, camping, fishing an manmy other outdoors activities." },
  { icon: Music, label: "Music", value: "One of my hobbies is listening to musioc and playing when I get time." },
  { icon: Sprout, label: "Gardening", value: "Recently, I've started growing herbs and vegetables to cook with." },
];

export function About() {
  return (
    <Section id="about">
      <SectionHeading
        eyebrow="01 / about"
        title="Who I am, In and Out of Engineering"
        description="Get to know what I'm about, my studies and what I like to do in my spare time."
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
