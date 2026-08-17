import {
  AudioWaveform,
  Box,
  BrainCircuit,
  CircuitBoard,
  CodeXml,
} from "lucide-react";

import type { SkillCategory } from "@/types";

/**
 * Skills grid content. Add a category here and it renders automatically —
 * no component changes required. `icon` is any icon from `lucide-react`.
 */
export const skillCategories: SkillCategory[] = [
  {
    id: "embedded-hardware",
    title: "Embedded & Hardware",
    blurb:
      "Firmware on bare metal, and the boards it runs on — from schematic capture to a populated prototype on the bench.",
    icon: CircuitBoard,
    skills: [
      { name: "ESP32", note: "Wi-Fi / BLE, FreeRTOS tasks" },
      { name: "STM32", note: "HAL + register level, CubeIDE" },
      { name: "Smart Cards", note: "ISO 14443, PN532, APDUs" },
      { name: "Microcontrollers", note: "SPI, I²C, UART, CAN, DMA" },
      { name: "LTspice", note: "bias points, AC sweeps, THD" },
      { name: "PCB Design", note: "KiCad, 2–4 layer, DRC clean" },
      { name: "Gate Drivers", note: "half-bridge, dead-time, bootstrap" },
      { name: "Power Amplifiers", note: "Class-A / Class-AB output stages" },
    ],
  },
  {
    id: "control-signal",
    title: "Control & Signal Processing",
    blurb:
      "Modelling a plant, bounding what you don't know about it, and closing a loop that still behaves at the edges.",
    icon: AudioWaveform,
    skills: [
      { name: "Quantitative Feedback Theory", note: "templates + Nichols bounds" },
      { name: "System Dynamics", note: "state-space, linearisation" },
      { name: "Signal Processing", note: "FFT, digital filters, sampling" },
      { name: "MATLAB / Simulink", note: "identification and simulation" },
      { name: "PID & Loop Shaping" },
      { name: "Sensor Fusion", note: "complementary + Kalman filters" },
    ],
  },
  {
    id: "software-systems",
    title: "Software & Systems",
    blurb:
      "The application layer that turns an instrument into a product — APIs, apps, and the plumbing between them.",
    icon: CodeXml,
    skills: [
      { name: "Python", note: "NumPy, pandas, FastAPI" },
      { name: "React / React Native", note: "Expo, Next.js App Router" },
      { name: "Supabase", note: "Postgres, RLS, auth, realtime" },
      { name: "C / C++", note: "embedded C, RAII, STL" },
      { name: "Linux", note: "shell, systemd, cross-compilation" },
      { name: "Git", note: "branching, review, CI" },
      { name: "TypeScript" },
      { name: "SQL" },
    ],
  },
  {
    id: "ai-data",
    title: "AI & Data",
    blurb:
      "Models that have to survive contact with real, messy, sensor-shaped data — and the analysis that proves they did.",
    icon: BrainCircuit,
    skills: [
      { name: "PyTorch", note: "training loops, U-Net, transfer learning" },
      { name: "Computer Vision", note: "OpenCV, segmentation, registration" },
      { name: "DICOM", note: "pydicom, HU windowing, volume slicing" },
      { name: "Data Analytics", note: "statistics, visualisation, reporting" },
      { name: "Algorithmic Modelling", note: "optimisation, simulation" },
      { name: "scikit-learn" },
    ],
  },
  {
    id: "cad-mechanical",
    title: "3D & CAD",
    blurb:
      "Giving the electronics somewhere to live — enclosures, brackets and fixtures that print on the first attempt.",
    icon: Box,
    skills: [
      { name: "SolidWorks", note: "parts, assemblies, drawings" },
      { name: "Enclosure Design", note: "board fit, clearances, thermals" },
      { name: "Parametric Modelling", note: "design tables, configurations" },
      { name: "3D Printing", note: "FDM, tolerancing for fit" },
      { name: "Mechanical Drawings", note: "GD&T basics" },
    ],
  },
];
