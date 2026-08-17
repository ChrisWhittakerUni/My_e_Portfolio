import type { Project } from "@/types";

/**
 * PLACEHOLDER CONTENT — swap the copy, metrics and links for your own.
 * The numbers below are illustrative examples of the *shape* of a good
 * metric (a figure plus what it measures), not verified results.
 *
 * Every field is rendered generically, so adding a seventh project or a new
 * link kind needs no component changes. Order here is display order;
 * `featured: true` makes a card span two columns on large screens.
 */
export const projects: Project[] = [
  {
    slug: "chargeapp",
    title: "ChargeApp",
    tagline:
      "Contactless campus payments — an NFC smart-card reader, a mobile wallet, and the ledger between them.",
    period: "2025 — present",
    domains: ["Software & Web", "Embedded & Hardware"],
    stack: ["React Native", "Expo", "Supabase", "ESP32", "PN532", "TypeScript"],
    featured: true,
    role: "Solo — firmware, mobile app and backend schema",
    overview:
      "A full payment loop for campus vendors: an ESP32 reader authenticates an ISO 14443 smart card over SPI, exchanges a signed payload with a Supabase backend, and settles the balance while a React Native wallet app shows the transaction landing in near real time. The interesting engineering is in the failure modes — a card pulled mid-transaction, a reader that loses Wi-Fi between debit and confirm, two taps racing on the same balance. Settlement is idempotent per transaction nonce, and the reader keeps a local write-ahead queue so an offline tap reconciles when the link returns.",
    metrics: [
      { value: "< 400 ms", label: "tap to on-screen confirmation" },
      { value: "AES-256", label: "card payload encryption" },
      { value: "0", label: "double-spends across 1 200 test taps" },
    ],
    highlights: [
      "Idempotent settlement keyed on a per-tap nonce, so a retried request can never debit twice.",
      "Row-level security in Postgres: a wallet row is readable only by its owner, and balances move exclusively through a stored procedure.",
      "Offline-tolerant reader with a local write-ahead queue that reconciles on reconnect.",
      "Expo app with biometric unlock, live balance subscription and a searchable transaction history.",
    ],
    links: [
      { kind: "github", label: "Source", href: "https://github.com/WHTCHR013" },
      { kind: "demo", label: "Demo video", href: "#" },
    ],
  },
  {
    slug: "ct-segmentation",
    title: "CT Organ Segmentation",
    tagline:
      "A U-Net segmentation pipeline for abdominal CT, built to be honest about the slices it gets wrong.",
    period: "2025",
    domains: ["Machine Learning"],
    stack: ["PyTorch", "OpenCV", "pydicom", "NumPy", "Python"],
    featured: true,
    role: "Model, data pipeline and evaluation",
    overview:
      "A segmentation pipeline that reads raw DICOM series, applies Hounsfield-unit windowing and per-volume normalisation, and trains a U-Net with residual encoder blocks. Most of the work was upstream of the model: misaligned slices, inconsistent slice thickness and patient-level leakage between splits all cost more accuracy than any architecture change. Evaluation is patient-wise rather than slice-wise, and the report surfaces the worst-performing volumes instead of only the mean, because a model that fails on one whole patient is a different problem from one that fails on scattered slices.",
    metrics: [
      { value: "94.1%", label: "mean Dice on held-out patients" },
      { value: "0.89", label: "IoU, worst-decile volumes" },
      { value: "3.2×", label: "faster than the manual contouring baseline" },
    ],
    highlights: [
      "DICOM ingest with HU windowing, spacing resampling and slice-order repair for misaligned series.",
      "Patient-level train/val/test splits to eliminate the leakage that inflated the first round of scores.",
      "Augmentation tuned for anatomy — elastic deformation and intensity jitter, no vertical flips.",
      "Per-volume error reporting so the failure cases are visible rather than averaged away.",
    ],
    links: [
      { kind: "github", label: "Source", href: "https://github.com/WHTCHR013" },
      { kind: "report", label: "Technical report (PDF)", href: "#" },
    ],
  },
  {
    slug: "class-a-amplifier",
    title: "Class-A Audio Power Amplifier",
    tagline:
      "A discrete 15 W single-ended output stage taken from SPICE deck to a populated four-layer board.",
    period: "2025",
    domains: ["Embedded & Hardware"],
    stack: ["LTspice", "KiCad", "Discrete BJT", "SolidWorks", "Bench Test"],
    role: "Design, layout, assembly and characterisation",
    overview:
      "A single-ended Class-A amplifier designed the slow way: bias point and small-signal response solved by hand, confirmed in LTspice across component tolerance and temperature, then laid out as a four-layer board with a star ground and a deliberately short feedback path. The output stage idles hot by definition, so the thermal design drove the mechanical design — a SolidWorks enclosure with a sized heatsink and a thermal model that had to agree with the measured junction rise. Measured THD tracked the simulation to within a factor of two, which was the real result: the model was trustworthy.",
    metrics: [
      { value: "15 W", label: "into 8 Ω, single-ended Class-A" },
      { value: "< 0.05%", label: "THD at 1 kHz, rated power" },
      { value: "±0.2 dB", label: "flatness, 20 Hz – 20 kHz" },
    ],
    highlights: [
      "Bias network with thermal compensation that holds the quiescent point across a 40 °C rise.",
      "Four-layer layout with star grounding and a feedback path routed away from the output current loop.",
      "LTspice Monte Carlo over component tolerances before committing to a board spin.",
      "SolidWorks enclosure with a heatsink sized from the measured thermal resistance, not the datasheet figure.",
    ],
    links: [
      { kind: "report", label: "Design report (PDF)", href: "#" },
      { kind: "github", label: "Schematics & layout", href: "https://github.com/WHTCHR013" },
    ],
  },
  {
    slug: "qft-maglev",
    title: "QFT Robust Control — Magnetic Levitation",
    tagline:
      "A Quantitative Feedback Theory controller for an open-loop unstable plant with genuinely uncertain parameters.",
    period: "2025",
    domains: ["Control Systems"],
    stack: ["MATLAB", "Simulink", "QFT Toolbox", "System ID", "C"],
    role: "Modelling, controller synthesis and rig validation",
    overview:
      "Magnetic levitation is the honest test case for robust control: open-loop unstable, nonlinear in the gap, and with a coil inductance that drifts as the electromagnet heats. I identified the plant from step and swept-sine data, built uncertainty templates over the operating envelope, and shaped a controller against Nichols bounds for stability, tracking and disturbance rejection simultaneously. The controller was then discretised and run on the physical rig, where the measured settling time landed within a few percent of simulation — and, more usefully, it stayed stable at the envelope corners where a nominal-design PID did not.",
    metrics: [
      { value: "±3%", label: "measured vs simulated settling time" },
      { value: "6 dB / 45°", label: "worst-case gain / phase margin" },
      { value: "40%", label: "of the envelope where nominal PID went unstable" },
    ],
    highlights: [
      "Plant uncertainty templates generated across the full levitation-gap operating envelope.",
      "Simultaneous loop shaping against robust stability, tracking and disturbance-rejection bounds.",
      "Pre-filter design to separate tracking shape from the robustness constraint.",
      "Discretised to fixed-step C and validated on hardware, not just in simulation.",
    ],
    links: [
      { kind: "report", label: "Design report (PDF)", href: "#" },
    ],
  },
  {
    slug: "stm32-motor-drive",
    title: "STM32 BLDC Motor Drive",
    tagline:
      "Field-oriented control on an STM32F4 with a custom three-phase gate-driver board and CAN telemetry.",
    period: "2024 — 2025",
    domains: ["Embedded & Hardware", "Control Systems"],
    stack: ["STM32F4", "C", "FOC", "KiCad", "CAN Bus", "Logic Analyser"],
    role: "Firmware and power-stage design",
    overview:
      "A three-phase BLDC drive built to understand field-oriented control from the timer peripheral upward. Phase currents are sampled by the ADC triggered mid-PWM-cycle to catch the true average, run through Clarke and Park transforms, and closed with cascaded current and speed loops at 20 kHz. The power stage is a custom board with bootstrapped half-bridge gate drivers, shunt-based current sensing and hardware overcurrent trip wired directly to the timer break input — so a fault kills the gates in hardware before firmware ever finds out about it. Telemetry streams over CAN to a host plotter for live loop tuning.",
    metrics: [
      { value: "20 kHz", label: "current loop, centre-aligned PWM" },
      { value: "< 2 µs", label: "hardware overcurrent trip to gate shutdown" },
      { value: "18%", label: "cooler than the six-step baseline at rated load" },
    ],
    highlights: [
      "ADC sampling injected at the PWM centre so phase current is read at its true average.",
      "Timer break input wired to the comparator trip — gates shut down in hardware, independent of firmware.",
      "Dead-time and bootstrap refresh tuned on the bench with a differential probe.",
      "CAN telemetry at 1 kHz feeding a host-side plotter for live loop tuning.",
    ],
    links: [
      { kind: "github", label: "Firmware", href: "https://github.com/WHTCHR013" },
    ],
  },
  {
    slug: "homebase-energy",
    title: "HomeBase Energy Monitor",
    tagline:
      "Non-invasive household energy monitoring with an ESP32 sensor node and a live web dashboard.",
    period: "2024",
    domains: ["Software & Web", "Embedded & Hardware"],
    stack: ["ESP32", "MQTT", "Next.js", "Supabase", "Recharts", "SolidWorks"],
    role: "Sensor node, ingest pipeline and dashboard",
    overview:
      "A split-core current transformer clamped over the mains feed, sampled by an ESP32 that computes true RMS power locally and publishes over MQTT rather than shipping raw samples. The backend downsamples into time buckets on write, so the dashboard can render a year of history without pulling a million rows. Built during a stretch of scheduled load shedding, so the dashboard is explicitly outage-aware: it distinguishes a genuine zero-power reading from a node that has simply gone dark, which turned out to matter more than any of the charting.",
    metrics: [
      { value: "±2%", label: "against a reference meter" },
      { value: "1 Hz", label: "true-RMS publish rate per node" },
      { value: "12 mo", label: "history rendered from pre-bucketed rows" },
    ],
    highlights: [
      "True-RMS computed on-device so the network carries readings, not raw ADC samples.",
      "Write-time downsampling into time buckets, keeping dashboard queries flat as history grows.",
      "Outage-aware UI that separates 'no power' from 'no data' instead of plotting a misleading zero.",
      "3D-printed clamp-on enclosure designed around the CT and the board outline.",
    ],
    links: [
      { kind: "github", label: "Source", href: "https://github.com/WHTCHR013" },
      { kind: "demo", label: "Live dashboard", href: "#" },
    ],
  },
];
