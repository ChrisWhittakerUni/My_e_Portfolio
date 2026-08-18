import {
  AudioWaveform,
  Box,
  BrainCircuit,
  CircuitBoard,
  CodeXml,
  UsersRound,
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
      "Through my degree, I've learnt the skill of embedded system programming as well as hardware PCB design.",
    icon: CircuitBoard,
    skills: [
      { name: "Microcontrollers"},
      { name: "Smart Cards"},
      { name: "PCB Design"},
      { name: "Component Selection"},
      { name: "Circuit Board Prototyping"},
    ],
  },
  {
    id: "control-signal",
    title: "Control Systems",
    blurb:
      "Modelling a plant, bounding what you don't know about it, and closing a loop that still behaves at the edges.",
    icon: AudioWaveform,
    skills: [
      { name: "Testing System Responses"},
      { name: "System Dynamics Modeling"},
      { name: "Controller Design"},
      { name: "Software - MATLAB/Simulink"},
      { name: "Physical Implementation"},
      { name: "Iterativce Design"},
    ],
  },
  {
    id: "software-systems",
    title: "Software",
    blurb:
      "I took multiple software courses during my degree, including a third year elective course, giving me a great base in software systems.",
    icon: CodeXml,
    skills: [
      { name: "Java"},
      { name: "C / C++"},
      { name: "Python"},
      { name: "Linux"},
      { name: "Git for Version Control"},
      { name: "TypeScript" },
      { name: "React / React Native"},
      { name: "SQL and Databases"},
    ],
  },
  {
    id: "cad-mechanical",
    title: "3D Modeling & CAD",
    blurb:
      "Through design projects at UCT I taught myself simple CAD modeling and 3D printing. This came in handy when needing specific custom parts.",
    icon: Box,
    skills: [
      { name: "SolidWorks"},
      { name: "Tinkercad"},
      { name: "3D Printing"},
      { name: "Basic Mechanical Drawings"},
    ],
  },
  {
    id: "teamwork",
    title: "Collaboration and Working in a Team",
    blurb:
      "Through group work, projects and courses specifically aimed at teaching effective teamwork (EEE4125C), I've learnt how to operate in a diverse group to achieve a common goal.",
    icon: UsersRound,
    skills: [
      { name: "Teamwork"},
      { name: "Compromise"},
      { name: "Accomodation" },
      { name: "Delegation" },
      { name: "Conflict Resolution" },
      { name: "Learning from Others" },
    ],
  },
];
