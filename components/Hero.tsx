"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, Mail, MapPin } from "lucide-react";

import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import { containerClass } from "@/components/Section";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";
import type { IconComponent } from "@/types";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  const reduceMotion = useReducedMotion();
  const socials: { href: string; label: string; Icon: IconComponent }[] = [
    {
      href: site.socials.github.href,
      label: site.socials.github.label,
      Icon: GithubIcon,
    },
    {
      href: site.socials.linkedin.href,
      label: site.socials.linkedin.label,
      Icon: LinkedinIcon,
    },
    { href: `mailto:${site.email}`, label: "Email", Icon: Mail },
  ];

  return (
    <section id="top" className="relative isolate overflow-hidden">
      {/* Ambient background: accent glows over faint graph paper. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-glow"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-grid mask-fade-b"
      />

      <div
        className={cn(
          containerClass,
          "grid items-center gap-14 pb-20 pt-20 sm:pt-28 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:pb-28",
        )}
      >
        <motion.div
          variants={reduceMotion ? undefined : container}
          initial={reduceMotion ? undefined : "hidden"}
          animate={reduceMotion ? undefined : "show"}
        >
          <motion.p
            variants={item}
            className="numeric inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1.5 text-xs text-muted backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Available for 2026 graduate roles
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-6xl"
          >
            {site.name}
          </motion.h1>

          <motion.p
            variants={item}
            className="numeric mt-3 text-base text-accent sm:text-lg"
          >
            {site.title}
          </motion.p>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {site.summary}
          </motion.p>

          <motion.ul variants={item} className="mt-7 flex flex-wrap gap-2">
            {site.focusAreas.map((area) => (
              <li
                key={area}
                className="rounded-full border border-border bg-surface/70 px-3 py-1.5 text-xs text-muted backdrop-blur-sm transition-colors hover:border-accent/50 hover:text-foreground sm:text-sm"
              >
                {area}
              </li>
            ))}
          </motion.ul>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-transform hover:-translate-y-0.5"
            >
              View projects
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-3 text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent"
            >
              Get in touch
            </a>

            <div className="ml-1 flex items-center gap-1">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  title={label}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
                  className="grid h-11 w-11 place-items-center rounded-lg text-muted transition-colors hover:bg-surface hover:text-accent"
                >
                  <Icon size={19} />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.p
            variants={item}
            className="mt-7 flex items-center gap-2 text-sm text-muted"
          >
            <MapPin size={15} className="text-accent" />
            {site.location}
          </motion.p>
        </motion.div>

        {/* Mono spec sheet — the "engineering" counterweight to the copy. */}
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div
            aria-hidden="true"
            className="absolute -inset-4 -z-10 rounded-3xl bg-accent/10 blur-2xl"
          />
          <div className="overflow-hidden rounded-2xl border border-border bg-surface/85 shadow-lg backdrop-blur-sm">
            <div className="flex items-center gap-2 border-b border-border bg-surface-muted/60 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
              <span className="numeric ml-2 text-xs text-muted">~/profile.cfg</span>
            </div>

            <dl className="numeric divide-y divide-border text-sm">
              {site.specs.map((spec) => (
                <div
                  key={spec.key}
                  className="flex flex-col gap-1 px-4 py-3.5 sm:flex-row sm:items-baseline sm:gap-4"
                >
                  <dt className="w-28 shrink-0 text-xs uppercase tracking-wider text-accent">
                    {spec.key}
                  </dt>
                  <dd className="text-muted">{spec.value}</dd>
                </div>
              ))}
            </dl>

            <div className="border-t border-border bg-surface-muted/40 px-4 py-3">
              <p className="numeric flex items-center gap-2 text-xs text-muted">
                <span className="text-accent">$</span>
                <span>whoami</span>
                <span
                  aria-hidden="true"
                  className="inline-block h-3.5 w-1.5 animate-pulse bg-accent"
                />
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
