import type { SiteConfig } from "@/types";

/**
 * Global site content. Everything a visitor reads outside of the
 * projects / skills / experience lists lives here.
 */
export const site: SiteConfig = {
  name: "Chris Whittaker",
  title: "Electronics & Computer Engineer",
  summary:
    "I'm a passionate engineering student, but there's a lot more to me than that. Use the navigation bar above, or simply scroll down to explore my e-portfolio. To change between light and dark themes, use the top right button. For more information, download my resume in the top right corner and be sure to click into my projects to get a deep dive on them!",
  focusAreas: [
    "Embedded Systems",
    "Power Electronics",
    "ML & Computer Vision",
    "Control Systems",
    "Full-Stack Dev",
  ],
  location: "Cape Town, South Africa",
  email: "chriswhittaker2004@gmail.com",
  resumeUrl: "/Chris_Whittaker_CV.pdf",
  socials: {
    github: {
      label: "GitHub",
      href: "https://github.com/ChrisWhittakerUni",
      handle: "@ChrisWhittakerUni",
    },
    linkedin: {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/chris-whittaker-b939b5363/",
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
  ],
};

/** Longer-form bio, rendered as paragraphs in the About section. */
export const aboutParagraphs: string[] = [
  "Hi, my name is Chris and I'm an aspiring engineer. My degree is in Electrical and computer engineering, but honestly I am interested in all things engineering. From mechanical to chemical, I love understanding how things work and working on projects where I can turn my ideas into real life products.",
  "Behind the scenes, there's more to unpack though. Balance is key, and as crazy as it may sound, I do have hobbies unrelated to my degree.",
  "I'm an avid runner and enjoy hiking, fishing and most other outdoors activities. Despite being a bit out of practice, I enjoy playing guitar and listening to music. Most recently I've begun gardening and am enjoying growing and cooking with my own herbs.",
];
