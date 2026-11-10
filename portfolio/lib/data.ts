export const profile = {
  name: "Paras Kumar",
  role: "Embedded Systems & VLSI Engineer",
  city: "New Delhi, India",
  email: "para230104011@iiitmanipur.ac.in",
  github: "https://github.com/paras-1556",
  linkedin: "https://linkedin.com/in/p-a-r-a-s-804795310",
};

export const heroStats = [
  { v: "7.28", l: "CGPA out of 10" },
  { v: "4–5", l: "PCBs designed & fabricated" },
  { v: "GATE ’26", l: "Qualified, ECE" },
];

export const workStats = [
  { v: "5", l: "Projects" },
  { v: "4–5", l: "Boards fabricated" },
  { v: "2", l: "Four-layer revisions" },
];

export const projects = [
  {
    title: "Smart USB Storage PCB with Power and Temperature Monitoring", year: "2026",
    bullets: [
      "Designed a 4-layer PCB integrating USB2244 and eMMC storage with RP2040-based control.",
      "Added dual INA226 power monitors, a TMP119 temperature sensor and an OLED status interface.",
      "Built hierarchical schematics, component placement and power-delivery design.",
      "Routed high-speed USB/eMMC and planned BGA escapes.",
    ],
    tech: ["KiCad", "4-layer PCB", "RP2040", "USB2244", "eMMC", "INA226", "TMP119"],
  },
  {
    title: "Multi-Board PCB Design", year: "2026",
    bullets: [
      "Independently designed and fabricated 4–5 PCBs end to end.",
      "Boards include a breadboard power supply, a compact solar power supply and an MCU-based datalogger (RTC + EEPROM).",
      "Iterated across two 4-layer revisions.",
    ],
    tech: ["KiCad", "Power supply", "RTC", "EEPROM"],
  },
  {
    title: "Digital IC Design in CMOS", year: "Academic + personal",
    bullets: [
      "Designed and simulated a 4-bit Hybrid Ripple Carry Adder in CMOS (lab project).",
      "Implemented a library of combinational and sequential circuits: multiplexers, decoders, flip-flops and FSMs.",
      "Used the instance-based schematic method in Cadence Virtuoso.",
    ],
    tech: ["Cadence Virtuoso", "CMOS", "FSMs"],
  },
  {
    title: "Autonomous Line Follower & Bluetooth-Controlled Robot", year: "Personal project",
    bullets: [
      "Built an ATmega328P robot with IR sensors and an L298N motor driver.",
      "Used proportional control for path following.",
      "Added HC-05 Bluetooth control over UART with command parsing.",
      "Switches between autonomous and manual modes.",
    ],
    tech: ["Embedded C", "ATmega328P", "UART", "HC-05", "L298N"],
  },
  {
    title: "Touchless Virtual Mouse System", year: "Personal project",
    bullets: [
      "Built a real-time hand-tracking pipeline.",
      "Gesture-based cursor control and click detection.",
      "Works without any physical hardware.",
    ],
    tech: ["Python", "OpenCV", "MediaPipe"],
  },
];

export const tools = [
  "Cadence Virtuoso", "KiCad", "CMOS", "Embedded C", "Arduino", "ATmega328P", "RP2040", "GPIO", "Timers", "Interrupts", "PWM", "ADC",
  "UART", "I2C", "SPI", "USB", "Bluetooth (HC-05)", "C", "C++", "Python", "Perl", "TCL", "Bash", "Git", "Linux", "VS Code",
  "Arduino IDE", "Oscilloscope", "Scilab", "OpenCV", "MediaPipe", "Logic synthesis", "Timing analysis",
];

export const record = [
  { when: "Summer 2026", title: "Semiconductor Intern", org: "IIT (BHU) Varanasi", text: "From 8 June 2026. Hands-on internship in the semiconductor domain, working alongside faculty and lab researchers on devices and lab methodology." },
  { when: "2026", title: "GATE 2026 qualified", org: "Electronics & Communication (ECE)", text: "Qualified the Graduate Aptitude Test in Engineering in ECE." },
  { when: "2023 – 2027", title: "B.Tech, Electronics & Communication (VLSI)", org: "IIIT Senapati, Imphal, Manipur", text: "CGPA 7.28 / 10, VLSI specialisation." },
  { when: "Certifications", title: "Bootcamp on Electronics for Unmanned Aerial Systems, Sensors & Communication", org: "IIT (ISM) Dhanbad, hosted at IIIT Manipur", text: "Also: Arduino Programming Fundamentals (IIT Bombay Spoken Tutorial, 100%) and Scilab Training (IIT Bombay Spoken Tutorial)." },
  { when: "Collegiate", title: "Basketball and Athletics", org: "Inter-IIIT Sports Meets (IIIT Allahabad, IIIT Gwalior)", text: "Represented IIIT Manipur at the 2nd and 4th meets across three years." },
  { when: "Until 2022", title: "State-level Basketball, Haryana", org: "Under-14, Under-17 and Under-19", text: "Competed at state level through three age groups." },
];

export const skills = [
  { g: "VLSI & IC design", t: "Cadence Virtuoso, CMOS technology, logic synthesis, timing analysis, digital logic design" },
  { g: "PCB design", t: "KiCad schematic capture and layout, 2- and 4-layer boards, USB/eMMC routing, BGA escape planning" },
  { g: "Embedded systems", t: "Embedded C, Arduino (ATmega328P), RP2040, GPIO, timers, interrupts, PWM, ADC" },
  { g: "Protocols", t: "UART, I2C, SPI, USB, Bluetooth (HC-05), wireless communication" },
  { g: "Programming", t: "C, C++, Python, Perl, TCL, Bash" },
  { g: "Tools", t: "Git, Linux, VS Code, Arduino IDE, oscilloscope, Scilab, OpenCV, MediaPipe" },
];

export const principles = [
  { h: "Own the whole board", t: "I take a design from schematic to fabricated hardware myself." },
  { h: "Iterate on revisions", t: "Each revision teaches something, like the two four-layer spins of my datalogger boards." },
  { h: "Measure, then trust", t: "Oscilloscope and circuit debugging come before any claim that it works." },
  { h: "Structure the design", t: "Hierarchical schematics keep complex boards readable." },
];
