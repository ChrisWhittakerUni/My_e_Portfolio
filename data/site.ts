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
  "Hi, my name is Chris and I'm an aspiring engineer. My degree is in Electrical and computer engineering but honestly I am interested in all things engineering. From mechanical to chemical, I love understanding how things work and working on projects where I can turn my ideas into real life products.",
  "Behind the scenes there's more to unpack though. Balance is key, and as crazy as it may sound, I do have hobbies unrelated to my degree.",
  "I'm an avid runner and enjoy hiking, fishing and most other outdoors activities. Despite being a bit out of practice, I enjoy playing guitar and listening to music. Most recently I've begun gardening and am enjoying growing and cooking with my own herbs.",
];
