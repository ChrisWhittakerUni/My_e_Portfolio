import type { Project } from "@/types";

/**
 * Every field is rendered generically, so adding a new project needs no component changes.
 * Order here is display order; `featured: true` makes a card span two columns on large screens.
 */
export const projects: Project[] = [
  {
    slug: "chargeapp",
    title: "ChargeApp",
    tagline: "Fully Functional Blockchain Payment Scheme",
    period: "2026",
    image: "/images/chargeapp_illustration.jpg",
    featured: true,
    role: "Software and embedded systems firmware development.",
    overview:
      "As part of my vacation work, a colleague and I developed a fully functioning blockchain transaction infrastructure. The idea is to reduce costs, improve speed and increase security, by removing the middleman (banks). The project consisted of hardware card readers, its own backend server, local blockchain infrastructure, client information database, and front end mobile app. My role in the project was to implement the code that allowed the reader to communicate with the programmable bank cards, help develop and manage the database and create the mobile app frontend.",
    metrics: [
      {
        value: "Result",
        label:
          "The project was a success, and illustrated a perfect proof of concept for the idea. Our supervisor signed off on it and gave us full credit for the vacation work.",
      },
    ],
  },
  {
    slug: "micro-mouse",
    title: "Micro-mouse Maize Navigator",
    tagline: "A small two wheeled robot programmed to navigate every cell in a maize, before returning to the start block and stopping there.",
    period: "2025",
    image: "/images/microm.jpeg",
    video: "/images/micromouse.mp4",
    featured: true,
    role: "Firmware development.",
    overview:
      "As part of my third year design course, I was tasked with programming a robot to navigate and explore an unknown maize before returning to the start block and stopping there. This required development of an algorithm to do this as well as use of sensor feedback for things like turning the correct amount and not crashing into walls. All of this was simulated with a virtual micromous in Simulink before testing it on the hardware.",
    metrics: [
      {
        value: "Result",
        label:
          "Although it took many late nights, my micromouse project was a success. It completed the full m,aize, before returning back and stopping in the block it was started in. I received full marks for the demo.",
      },
    ],
  },
  {
    slug: "smart-tv",
    title: "Raspberry-Pi Smart TV",
    tagline: "Using a Raspberry-Pi 5 and a standard monitor to create a smart TV that can stream Youtube, Netflix, DSTVNow, or any other browser accesible site",
    period: "2026",
    image: "/images/smartTV.jpg",
    featured: true,
    role: "Software development.",
    overview:
      "As part of one of my personal projects, I want to use a RaspberryPi5 I have from the ChargeApp project to create a smart TV. A Rasberry Pi 5 is a mini-computer, and so it can access google, and thus netflix, Youtube, DSTVNow or any other site, and then display it on a monitor. The idea is to use some sort of wireless communication such as InfraRed or bluetooth in order to have a remote controller that one coud use to navigate the SmartTV easily.",
    metrics: [
      {
        value: "Desired Result",
        label:
          "To get a functional, easy to use smart TV.",
      },
    ],
  },
];