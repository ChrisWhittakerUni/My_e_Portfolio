import type { SiteConfig } from "@/types";

/**
 * Global site content. Everything a visitor reads outside of the
 * projects / skills / experience lists lives here.
 */
export const site: SiteConfig = {
  name: "Chris Whittaker",
  title: "Electronics & Computer Engineer",
  summary:
    "I design across the whole stack of a system — from gate drivers and PCB layout, through control loops and signal processing, up to the apps and models that make the hardware useful.",
  focusAreas: [
    "Embedded Systems",
    "Power Electronics",
    "ML & Computer Vision",
    "Control Systems",
    "Full-Stack Dev",
  ],
  location: "Cape Town, South Africa",
  email: "chriswhittaker2004@gmail.com",
  resumeUrl: "/resume.pdf",
  socials: {
    github: {
      label: "GitHub",
      href: "https://github.com/WHTCHR013",
      handle: "@WHTCHR013",
    },
    linkedin: {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/chris-whittaker",
      handle: "/in/chris-whittaker",
    },
  },
  nav: [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ],
  specs: [
    { key: "focus", value: "embedded • control • ML" },
    { key: "toolchain", value: "STM32CubeIDE / KiCad / PyTorch" },
    { key: "bench", value: "LTspice, MATLAB, scope + logic analyser" },
    { key: "status", value: "open to 2026 graduate roles" },
  ],
};

/** Longer-form bio, rendered as paragraphs in the About section. */
export const aboutParagraphs: string[] = [
  "I'm an Electrical & Computer Engineering student who likes problems that refuse to stay in one discipline. Most of my work starts at a breadboard or a SPICE deck and ends in a repo — a levitation rig that needed a robust controller, a CT scan pipeline that needed a segmentation model, a campus payment card that needed both firmware and an app.",
  "What I care about is the seam between layers: the timing budget between an interrupt and a PWM edge, the noise floor that decides whether a sensor reading is real, the difference between a model that scores well and one that behaves in a clinic. That's usually where the interesting failures live.",
  "Right now I'm finishing my degree, building things on the bench, and looking for graduate work where hardware and software have to agree with each other.",
];
