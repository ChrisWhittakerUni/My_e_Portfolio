"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { ThemeToggle } from "@/components/ThemeToggle";
import { containerClass } from "@/components/Section";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // Empty until a section crosses the middle of the viewport, so nothing is
  // highlighted while the hero is still in view.
  const [active, setActive] = useState<string>("");

  // Solidify the bar once the hero starts scrolling away.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight whichever section is crossing the middle of the viewport.
  useEffect(() => {
    const sections = site.nav
      .map(({ href }) => document.querySelector<HTMLElement>(href))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Escape closes the mobile menu.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const closeMenu = useCallback(() => setOpen(false), []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        "backdrop-blur-md",
        scrolled || open
          ? "border-b border-border bg-background/80 supports-[backdrop-filter]:bg-background/65"
          : "border-b border-transparent bg-background/40",
      )}
    >
      <nav
        aria-label="Primary"
        className={cn(containerClass, "flex h-16 items-center justify-between gap-4")}
      >
        <a
          href="#top"
          className="group flex items-center gap-2.5 rounded-lg py-1 text-sm font-semibold tracking-tight"
        >
          <span className="numeric grid h-8 w-8 place-items-center rounded-lg border border-border bg-surface text-[11px] font-semibold text-accent transition-colors group-hover:border-accent/60">
            CW
          </span>
          <span className="hidden sm:inline">{site.name}</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {site.nav.map((item) => {
            const isActive = active === item.href;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={cn(
                    "relative rounded-lg px-3 py-2 text-sm transition-colors",
                    isActive ? "text-foreground" : "text-muted hover:text-foreground",
                  )}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 -z-10 rounded-lg bg-accent-soft"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={site.resumeUrl}
            download
            className={cn(
              "hidden items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2",
              "text-sm font-medium text-foreground transition-all hover:border-accent/60 hover:text-accent sm:inline-flex",
            )}
          >
            <Download size={15} />
            Resume
          </a>

          <ThemeToggle />

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-surface text-muted transition-colors hover:text-accent md:hidden"
          >
            {open ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border bg-background/95 md:hidden"
          >
            <ul className={cn(containerClass, "flex flex-col gap-1 py-4")}>
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={closeMenu}
                    className={cn(
                      "block rounded-lg px-3 py-2.5 text-sm transition-colors",
                      active === item.href
                        ? "bg-accent-soft text-accent"
                        : "text-muted hover:bg-surface hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href={site.resumeUrl}
                  download
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 rounded-lg border border-border bg-surface px-3 py-2.5 text-sm font-medium transition-colors hover:border-accent/60 hover:text-accent"
                >
                  <Download size={15} />
                  Download résumé
                </a>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
