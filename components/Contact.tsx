import { Mail, MapPin } from "lucide-react";

import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/Section";
import { site } from "@/data/site";
import type { IconComponent } from "@/types";

interface Channel {
  icon: IconComponent;
  label: string;
  value: string;
  href: string | null;
}

const channels: Channel[] = [
  {
    icon: Mail,
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    icon: LinkedinIcon,
    label: site.socials.linkedin.label,
    value: site.socials.linkedin.handle,
    href: site.socials.linkedin.href,
  },
  {
    icon: GithubIcon,
    label: site.socials.github.label,
    value: site.socials.github.handle,
    href: site.socials.github.href,
  },
  {
    icon: MapPin,
    label: "Location",
    value: site.location,
    href: null,
  },
];

export function Contact() {
  return (
    <Section id="contact" bordered>
      <SectionHeading
        eyebrow="05 / contact"
        title="Let's build something that has to work"
        description="Graduate roles, internships, or a hardware problem that needs a second pair of eyes — the inbox is open."
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-14">
        <Reveal>
          <ul className="space-y-3">
            {channels.map(({ icon: Icon, label, value, href }) => {
              const isExternal = href?.startsWith("http") ?? false;

              const inner = (
                <>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                    <Icon size={18} />
                  </span>
                  <span className="min-w-0">
                    <span className="numeric block text-[11px] uppercase tracking-wider text-muted">
                      {label}
                    </span>
                    <span className="mt-0.5 block truncate text-sm">{value}</span>
                  </span>
                </>
              );

              return (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noreferrer noopener" : undefined}
                      className="flex items-center gap-4 rounded-xl border border-border bg-surface p-4 transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-md"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 rounded-xl border border-border bg-surface p-4">
                      {inner}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
