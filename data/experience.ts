import type { Experience } from "@/types";

/**
 * PLACEHOLDER CONTENT — replace with your real dates, roles and results.
 * Entries render top-to-bottom in the order listed (most recent first).
 * `kind` picks the icon and accent used on the timeline rail.
 */
export const experiences: Experience[] = [
  {
    id: "capstone",
    kind: "research",
    title: "Capstone Research — Deep Learning for Medical Imaging",
    organization: "Department of Electrical Engineering",
    location: "University of Cape Town",
    period: "2026",
    summary:
      "Final-year research project on automated organ segmentation in abdominal CT, covering the full path from raw DICOM ingest to a patient-wise evaluation protocol.",
    highlights: [
      "Built a reproducible training pipeline over a multi-patient DICOM dataset.",
      "Identified and removed patient-level data leakage that had inflated early results.",
      "Wrote the evaluation around worst-case volumes rather than dataset-mean scores.",
    ],
    tags: ["PyTorch", "DICOM", "Computer Vision", "Research"],
  },
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
      "Key coursework: Control Systems, Analogue & Digital Electronics, Signals and Systems, Microcontroller Systems, Data Structures & Algorithms, Machine Learning.",
      "Consistent distinctions in design-heavy and laboratory-assessed courses.",
      "Elective focus on embedded systems and machine learning.",
    ],
    tags: ["Control", "Electronics", "Computer Systems", "Mathematics"],
  },
  {
    id: "tutor",
    kind: "work",
    title: "Undergraduate Tutor — Data Structures & Algorithms",
    organization: "Department of Computer Science",
    location: "University of Cape Town",
    period: "2025",
    summary:
      "Ran weekly tutorials and marked practicals for a large second-year Java course, working one-on-one with students on debugging and complexity analysis.",
    highlights: [
      "Supported a cohort of roughly 200 students across tutorials and consultation hours.",
      "Wrote worked solutions and edge-case test cases used in practical marking.",
      "Coached students through debugging rather than handing over fixes.",
    ],
    tags: ["Java", "Algorithms", "Teaching"],
  },
  {
    id: "labs",
    kind: "lab",
    title: "Practical Laboratory Design Projects",
    organization: "Electrical Engineering Laboratories",
    location: "University of Cape Town",
    period: "2024 — 2025",
    summary:
      "A run of assessed design-and-build practicals where the deliverable was working hardware plus a defensible measurement report.",
    highlights: [
      "Discrete amplifier design: hand-calculated bias point, SPICE verification, bench measurement of THD and bandwidth.",
      "Robust control practical: plant identification on a physical rig and a QFT controller validated against uncertainty bounds.",
      "Microcontroller systems: bare-metal peripheral drivers written against the reference manual, verified with a logic analyser.",
      "Digital systems: HDL design, simulation and FPGA implementation.",
    ],
    tags: ["LTspice", "MATLAB", "STM32", "Instrumentation"],
  },
  {
    id: "leadership",
    kind: "leadership",
    title: "Technical Lead — Student Engineering Projects",
    organization: "Student Engineering Society",
    location: "University of Cape Town",
    period: "2024 — 2025",
    summary:
      "Led small mixed-discipline teams through build projects, owning the technical plan and the integration deadline.",
    highlights: [
      "Split hardware, firmware and software workstreams so they could progress in parallel.",
      "Set up shared Git workflow and review habits for teammates new to version control.",
      "Ran build sessions and design reviews ahead of demo deadlines.",
    ],
    tags: ["Leadership", "Git", "Systems Integration"],
  },
];
