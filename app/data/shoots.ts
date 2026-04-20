import { GALLERY, Shot } from "./gallery";

const range = (a: number, b: number) => GALLERY.slice(a - 1, b);
const pick = (...ns: number[]) => ns.map((n) => GALLERY[n - 1]).filter(Boolean);

export type Shoot = {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  year: string;
  role: string;
  mood: string[];
  description: string;
  cover: Shot;
  frames: Shot[];
  tone: "light" | "dark";
};

function make(
  id: string,
  code: string,
  title: string,
  subtitle: string,
  year: string,
  role: string,
  mood: string[],
  description: string,
  coverIdx: number,
  frames: Shot[],
  tone: "light" | "dark" = "light"
): Shoot {
  return {
    id,
    code,
    title,
    subtitle,
    year,
    role,
    mood,
    description,
    cover: GALLERY[coverIdx - 1],
    frames,
    tone,
  };
}

export const SHOOTS: Shoot[] = [
  make(
    "monograph",
    "S/01",
    "Monograph",
    "Editorial · Studio",
    "2024",
    "Editorial",
    ["Tailoring", "Low-key", "Noir"],
    "A quiet, after-hours studio set — suited, unsmiling, tuned. Ten frames held in a single temperature.",
    51,
    range(51, 60),
    "dark"
  ),
  make(
    "black-room",
    "S/02",
    "Black Room",
    "Lookbook · Daylight",
    "2023–2024",
    "Lookbook",
    ["Range", "Daylight", "Motion"],
    "The widest chapter in the book — nineteen frames that move from warm afternoon light to night, across looks and moods. Built for editorial yet dressed like catalogue.",
    35,
    pick(32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 61, 62, 63, 64, 65, 66, 67)
  ),
  make(
    "off-duty",
    "S/03",
    "Off-duty",
    "Test · Studio",
    "2021",
    "Editorial",
    ["Black", "Focus", "Silent"],
    "A six-frame test — heavy black knits, narrow shoulders, one lamp. A conversation with shadow. Silent, operatic, unsold.",
    26,
    range(25, 30),
    "dark"
  ),
  make(
    "late-summer",
    "S/04",
    "Late Summer",
    "Early work · Studio",
    "2021",
    "Editorial",
    ["Denim", "Mono", "Raw"],
    "The earliest frames in the book. A quiet study in posture and stillness — selvedge denim, hard light, bare walls. Un-retouched on purpose. This is where the face learned the camera.",
    13,
    range(8, 22),
    "dark"
  ),
  make(
    "altitude",
    "S/05",
    "Altitude",
    "Candid · On-location",
    "2022",
    "Commercial",
    ["Warm", "Natural", "Travel"],
    "Between castings, between cities — loose shirting, direct eye, no styling. Comfort without compromise. The commercial smile.",
    23,
    pick(23, 24)
  ),
  make(
    "linen",
    "S/06",
    "Linen Studies",
    "Digitals · Reference",
    "2025",
    "Reference",
    ["Bare", "Clean", "Utility"],
    "A tight eight-frame set of reference digitals — plain backdrop, natural light, no styling. Built to read fast.",
    86,
    range(86, 92)
  ),
  make(
    "after-hours",
    "S/07",
    "After Hours",
    "Mixed · Archive",
    "2022–2026",
    "Archive",
    ["Candid", "Press", "Misc"],
    "A nineteen-frame archive — mixed looks, dates and cameras, collected at the back of the book as a loose personal cut.",
    1,
    pick(1, 2, 3, 4, 5, 6, 7, 93, 94, 95, 96, 97, 98, 99, 100, 101),
    "dark"
  ),
  make(
    "campaign-09",
    "S/08",
    "Campaign — 09",
    "Full shoot · Location",
    "2024–2025",
    "Campaign",
    ["Range", "Color", "Movement"],
    "The most complete chapter. Nineteen frames across looks, lights and tempers — from stock‑still to half‑laughing. Proof of range: one face, one book, one full shoot.",
    74,
    pick(44, 45, 46, 47, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82),
    "dark"
  ),
  make(
    "digitals",
    "S/09",
    "Digitals",
    "Polaroid · Agency",
    "2023–2025",
    "Agency",
    ["Neutral", "Honest", "Outdoor"],
    "Agency digitals and outdoor tests — five frames the way casting directors want to see them: plain, proportioned, uncropped.",
    42,
    pick(42, 43, 48, 49, 50)
  ),
];
