import type { Experience } from "@/types";

/**
 * PLACEHOLDER CONTENT — replace with your real dates, roles and results.
 * Entries render top-to-bottom in the order listed (most recent first).
 * `kind` picks the icon and accent used on the timeline rail.
 */
export const experiences: Experience[] = [
  {
    id: "degree",
    kind: "education",
    title: "BSc (Eng) Electrical & Computer Engineering",
    organization: "University of Cape Town",
    location: "Cape Town, South Africa",
    period: "2023 — 2026 (expected)",
    summary:
      "Four-year accredited engineering degree spanning electronics, control, signal processing, computer systems and software design.",
    highlights: [
      "Deans List Merit Award every year to date.",
      "Final year  thesis project focusing on control systems and biomimicry.",
      ">70% Overall aggregate",
      "Expected to graduate at the end of 2026",
    ],
    tags: [],
  },
  {
    id: "capstone",
    kind: "research",
    title: "Final Year Thesis",
    organization: "University of Cape Town",
    location: "Cape Town, South Africa",
    period: "2026",
    summary:
      "My final year capstone research project is a balance aid for the elderly. It is a wearable reaction wheel which will use a gain scheduling control aproach to dynamically adjust its controller algorithm to work with a wide range of people with varying height and weight. The project uses consertvation of angular momentum and control theory to maintain a 0 degree tilt angle in the coronal plane (stop them from falling over sideways).",
    highlights: [
      "Academic research.",
      "Use of controls theory.",
      "Mechanical desiign and simulation using software such as Matlab and Simulink",
      "Delivery of a physical prototype.",
      "Formal report writing to show the prior research as well as document the project.",
    ],
    tags: [],
  },
  {
    id: "tutor",
    kind: "work",
    title: "Undergraduate Tutor",
    organization: "Department of Mechanical Engineering",
    location: "Cape Town, South Africa",
    period: "2024",
    summary:
      "In my second year, I tutored a first year course in CAD and PCB design.",
    highlights: [
      "Gained valuable experience working in a team with other tutors and teaching staff.",
      "Learnt how to effectively communicate ideas to students struggling to understand a topic.",
      "Improved my own knowledge and ability regarding CAD and PCB design.",
    ],
    tags: [],
  },
  {
    id: "vac_work1",
    kind: "work",
    title: "Intern",
    organization: "FlyingRobot (Pty) Ltd",
    location: "Cape Town, South Africa",
    period: "January 2025",
    summary:
      "In my third year, I interned at an commercial drone company which sell and repair all types of drones for an international client base.",
    highlights: [
      "Got hands on experience with soldering, 3D printing and hardware repairs.",
      "Deveoped embedded systems firmware to allow different strobe light sequences.",
      "Experienced real work place dynamics for the first time.",
    ],
    tags: [],
  },
  {
    id: "vac_work2",
    kind: "work",
    title: "Intern",
    organization: "5DT (5th Dimension Technologies) (Pty) Ltd",
    location: "Pretoria, South Africa",
    period: "July 2025",
    summary:
      "In my third year, I also interned at a VR mining and and heavy vehicle simulator company, which builds and maintains physical simulators to train heavy vehicle drivers on.",
    highlights: [
      "Gathered experience on PCB fault testing, diagnostics and repair.",
      "Researched component options for an update to one of the companies previous PCB design.",
      "Began the design process for the new updated board.",
    ],
    tags: [],
  },
  {
    id: "vac_work3",
    kind: "work",
    title: "Intern",
    organization: "CAP Security NPC",
    location: "Johgannesburg, South Africa",
    period: "July 2026",
    summary:
      "In my final year, I worked at one of the largest non-profit community security companies in South Africa, that does armed response, offsite monitoring, criminal investigations and much more, in an attempt to create safer communities.",
    highlights: [
      "Developed AI systems that help streamline the gatherinng of information the fleet management software used at CAP.",
      "Helped create a guide for non-technical staff to configure dashcam settings.",
      "Met with department heads and was exposed to the business side of a project which involves meeting with stakeholders to understand their needs.",
    ],
    tags: [],
  },
  
];
