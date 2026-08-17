"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "theme";

/**
 * Runs before paint (injected in the document head) so the correct theme is
 * on <html> for the very first frame — no flash of the wrong background.
 * Dark is the default when nothing has been stored.
 */
export const themeInitScript = `(function(){try{var s=localStorage.getItem("${THEME_STORAGE_KEY}");var d=s!=="light";var e=document.documentElement;e.classList.toggle("dark",d);e.style.colorScheme=d?"dark":"light";}catch(err){document.documentElement.classList.add("dark");}})();`;

/* --------------------------------------------------------------------------
 * The <html> class list is the source of truth — it is set by themeInitScript
 * before React boots. Reading it through useSyncExternalStore keeps React in
 * sync with that external state without a setState-in-effect round trip.
 * ------------------------------------------------------------------------ */

const listeners = new Set<() => void>();

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
  };
}

function emit() {
  for (const listener of listeners) listener();
}

const getThemeSnapshot = (): Theme =>
  document.documentElement.classList.contains("dark") ? "dark" : "light";

/** The server can't know the visitor's choice; dark is the documented default. */
const getServerThemeSnapshot = (): Theme => "dark";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
  emit();
}

interface ThemeContextValue {
  theme: Theme;
  /** False during SSR and hydration; true once the real theme is readable. */
  mounted: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(
    subscribe,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  // Follow the OS only while the visitor has made no explicit choice.
  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: light)");

    const onChange = (event: MediaQueryListEvent) => {
      if (localStorage.getItem(THEME_STORAGE_KEY)) return;
      applyTheme(event.matches ? "light" : "dark");
    };

    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    applyTheme(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Private mode or blocked storage — the theme still applies for this visit.
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(getThemeSnapshot() === "dark" ? "light" : "dark");
  }, [setTheme]);

  const value = useMemo(
    () => ({ theme, mounted, setTheme, toggleTheme }),
    [theme, mounted, setTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside a <ThemeProvider>");
  }
  return context;
}
