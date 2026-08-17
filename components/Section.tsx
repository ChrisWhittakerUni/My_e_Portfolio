import type { ReactNode } from "react";

import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

/** Shared horizontal rhythm for every section on the page. */
export const containerClass = "mx-auto w-full max-w-6xl px-5 sm:px-8";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <Reveal className={cn("max-w-2xl", className)}>
      <p className="numeric flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-accent">
        <span aria-hidden="true" className="h-px w-6 bg-accent/60" />
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  /** Adds a hairline divider above the section. */
  bordered?: boolean;
}

export function Section({ id, children, className, bordered }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24 py-20 sm:py-28",
        bordered && "border-t border-border",
        className,
      )}
    >
      <div className={containerClass}>{children}</div>
    </section>
  );
}
