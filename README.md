# Chris Whittaker — E-Portfolio

A single-page engineering portfolio built with **Next.js 16 (App Router)**, **Tailwind CSS v4**,
**Framer Motion** and **Lucide** icons. Dark mode by default (deep slate `#0f172a` with cyan accent
glows), light mode one click away, and all content driven from typed data files.

```bash
npm run dev     # http://localhost:3000
npm run build   # production build + type check
npm run lint    # eslint
npm start       # serve the production build
```

## Editing the content

You should rarely need to touch a component. Everything a visitor reads lives in `/data`:

| File                 | Contains                                                          |
| -------------------- | ----------------------------------------------------------------- |
| `data/site.ts`       | Name, title, summary, focus badges, socials, nav links, hero spec sheet, About copy |
| `data/skills.ts`     | The five skill categories and their pills (`note` becomes a tooltip) |
| `data/projects.ts`   | Project cards and their deep-dive modal content                    |
| `data/experience.ts` | Timeline entries (education, research, lab, work, leadership)      |

Types for all of it are in `types/index.ts`, so a bad entry fails the build rather than the page.

**The copy, metrics and links in `data/projects.ts` and `data/experience.ts` are placeholders.**
They show the *shape* of a strong entry — a figure plus what it measures — but the numbers are
illustrative, not verified. Replace them before publishing.

A few specifics:

- **Adding a project** — append to `projects` in `data/projects.ts`. `featured: true` makes a card
  span both columns. Link kinds are `github`, `demo` and `report`; each maps to an icon in
  `components/ProjectCard.tsx`.
- **Adding a filter pill** — add the domain to `PROJECT_DOMAINS` in `types/index.ts`. The pill,
  its count and the filtering all follow automatically.
- **Résumé** — replace `public/resume.pdf`. The current file is a generated placeholder
  (`node scripts/generate-placeholder-resume.mjs` rebuilds it).
- **Skill category icons** — any icon from `lucide-react`, imported directly in `data/skills.ts`.

## Contact form

`components/ContactForm.tsx` validates on blur and on submit (name, email format, message length),
traps bots with a hidden honeypot field, and posts to `app/api/contact/route.ts`, which re-validates
server-side.

Delivery is opt-in. Copy `.env.example` to `.env.local` and set `RESEND_API_KEY` to send mail via
[Resend](https://resend.com). Without a key the endpoint returns a clear "not configured" response
and the UI points the visitor at the direct `mailto:` link — it never pretends a message was sent.

## Theming

Semantic tokens (`--background`, `--surface`, `--border`, `--accent`, …) are defined once per theme
in `app/globals.css` and exposed to Tailwind through `@theme inline`, so utilities like
`bg-surface`, `text-muted` and `border-border` work in both modes without a single `dark:` prefix.

The theme class is written to `<html>` by a blocking script in `app/layout.tsx` before first paint,
so there's no flash of the wrong background. `components/ThemeProvider.tsx` reads that class through
`useSyncExternalStore`, persists the choice to `localStorage`, and follows the OS setting only until
the visitor picks a side.

Custom utilities in `globals.css`: `bg-grid` (graph paper), `bg-glow` (hero accent glows),
`mask-fade-b`, `card-surface`, and `numeric` (monospace + tabular figures for metrics and specs).

## Structure

```
app/
  layout.tsx              fonts, metadata, theme bootstrap
  page.tsx                section assembly + Person JSON-LD
  globals.css             design tokens, base layer, custom utilities
  api/contact/route.ts    server-side validation + optional Resend delivery
components/               Navbar, Hero, About, SkillsGrid, ProjectsSection,
                          ProjectCard, ProjectFilter, ProjectModal, Timeline,
                          Contact, ContactForm, Footer, Section, Reveal,
                          ThemeProvider, ThemeToggle, BrandIcons
data/                     all editable content
types/                    Project, Skill, Experience, SiteConfig
lib/utils.ts              `cn()` — clsx + tailwind-merge
```

Motion is centralised in `components/Reveal.tsx` (scroll fade-up) and collapses to a plain wrapper
under `prefers-reduced-motion`, which the base layer also honours for CSS transitions and smooth
scrolling.
