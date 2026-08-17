"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, mounted, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "relative grid h-9 w-9 place-items-center rounded-lg border border-border bg-surface",
        "text-muted transition-colors hover:border-accent/50 hover:text-accent",
        className,
      )}
    >
      {/* Icons mount only on the client — the server can't know the theme. */}
      <AnimatePresence initial={false} mode="wait">
        {mounted ? (
          <motion.span
            key={isDark ? "moon" : "sun"}
            initial={{ opacity: 0, rotate: -70, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 70, scale: 0.7 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="grid place-items-center"
          >
            {isDark ? <Moon size={17} /> : <Sun size={17} />}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </button>
  );
}
