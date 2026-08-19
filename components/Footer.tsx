import { ArrowUp, Mail } from "lucide-react";

import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import { containerClass } from "@/components/Section";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";
import type { IconComponent } from "@/types";

const socials: { href: string; label: string; Icon: IconComponent }[] = [
  { href: site.socials.github.href, label: site.socials.github.label, Icon: GithubIcon },
  {
    href: site.socials.linkedin.href,
    label: site.socials.linkedin.label,
    Icon: LinkedinIcon,
  },
  { href: `mailto:${site.email}`, label: "Email", Icon: Mail },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div
        className={cn(
          containerClass,
          "flex flex-col gap-8 py-12 md:flex-row md:items-start md:justify-between",
        )}
      >
        <div className="max-w-sm">
          <p className="text-sm font-semibold tracking-tight">{site.name}</p>
          <p className="numeric mt-1 text-xs text-accent">{site.title}</p>
          

          <div className="mt-5 flex items-center gap-1">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                title={label}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
                className="grid h-10 w-10 place-items-center rounded-lg text-muted transition-colors hover:bg-surface hover:text-accent"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-2 sm:flex sm:flex-col">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition-colors hover:text-accent"
            >
              {item.label}
            </a>
          ))}
          <a
            href={site.resumeUrl}
            download
            className="text-sm text-muted transition-colors hover:text-accent"
          >
            Résumé
          </a>
        </nav>

        <a
          href="#top"
          className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-muted transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent"
        >
          <ArrowUp size={15} />
          Back to top
        </a>
      </div>

      <div className={cn(containerClass, "border-t border-border py-6")}>
        <p className="numeric text-xs text-muted">
          © {new Date().getFullYear()} {site.name} · Built with Next.js, Tailwind CSS
          and Framer Motion.
        </p>
      </div>
    </footer>
  );
}
