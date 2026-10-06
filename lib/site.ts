import type { StaticImageData } from "next/image";
import type { ProjectKey } from "@/content/types";

import meliation from "@/public/work/meliation.jpg";
import humanCapacity from "@/public/work/human-capacity.jpg";
import sheepland from "@/public/work/sheepland.jpg";
import aero8 from "@/public/work/aero8.jpg";
import flowerSeason from "@/public/work/flower-season.jpg";
import me from "@/public/me.jpg";

// Portrait for the hero circle (square, public/me.jpg). Set to null to show the initials instead.
export const photo: StaticImageData | null = me;

// A link that is left empty is not rendered.
export const contacts = {
  telegram: "rudnytsky1", // username without @
  email: "danyarudnytskyi@gmail.com",
  github: "cha1btw",
  linkedin: "https://www.linkedin.com/in/danyil-rudnytskyi-50ba2a330",
};

export const telegramUrl = contacts.telegram ? `https://t.me/${contacts.telegram}` : null;
export const githubUrl = `https://github.com/${contacts.github}`;

// Primary contact: Telegram if set, otherwise email, otherwise GitHub so the button never points nowhere.
export const primaryContactUrl =
  telegramUrl ?? (contacts.email ? `mailto:${contacts.email}` : githubUrl);

// "from $X" per service, in the same order as dict.services.items. null hides the price.
export const servicePrices: (number | null)[] = [150, 100, 50];

// Monthly support after launch, in USD. null hides the line.
export const maintenancePrice: number | null = 50;

export type Project = {
  key: ProjectKey;
  url: string;
  image: StaticImageData;
  // Shown as a label on the card. null means a real project for a small business.
  status: "concept" | "demo" | "ngo" | null;
  tags: string[];
};

// Order matters: the first project gets the wide card.
export const projects: Project[] = [
  {
    key: "meliation",
    url: "https://meliation-concept.vercel.app",
    image: meliation,
    status: "concept",
    tags: ["Next.js", "Tailwind", "UA / EN"],
  },
  {
    key: "humanCapacity",
    url: "https://human-capacity.vercel.app",
    image: humanCapacity,
    status: "ngo",
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    key: "sheepland",
    url: "https://sheepland.vercel.app",
    image: sheepland,
    status: null,
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    key: "aero8",
    url: "https://aero8-cha1btw.vercel.app",
    image: aero8,
    status: "demo",
    tags: ["React", "Vite", "TypeScript"],
  },
  {
    key: "flowerSeason",
    url: "https://flower-season.vercel.app",
    image: flowerSeason,
    status: null,
    tags: ["Next.js", "Tailwind"],
  },
];
