export type Lang = "uk" | "en";

export type ProjectKey = "meliation" | "humanCapacity" | "sheepland" | "aero8" | "flowerSeason";

export type Dict = {
  lang: Lang;
  name: string;
  fullName: string;
  initials: string;
  role: string;
  meta: { title: string; description: string; cvTitle: string; cvDescription: string };
  nav: {
    work: string;
    services: string;
    process: string;
    cv: string;
    home: string;
    langLabel: string;
    langAria: string;
    skip: string;
    theme: string;
  };
  contactCta: string;
  hero: {
    badge: string;
    greeting: string;
    // "I build <word>" where the word rotates, then the tail on the next line.
    lead: string;
    words: string[];
    tail: string;
    // The full sentence for screen readers.
    srText: string;
    secondary: string;
    socialLabel: string;
    photoAlt: string;
    carouselLabel: string;
  };
  work: {
    title: string;
    open: string;
    labels: { concept: string; demo: string; ngo: string };
    items: Record<ProjectKey, { title: string; text: string; alt: string }>;
  };
  services: {
    title: string;
    priceFrom: string;
    items: { title: string; text: string; examples: string[] }[];
    maintenance: { title: string; text: string; perMonth: string };
  };
  process: { title: string; steps: { verb: string; text: string }[] };
  contact: { title: string; text: string; emailLabel: string; githubLabel: string };
  cv: {
    intro: string;
    educationTitle: string;
    education: { place: string; detail: string }[];
    stackTitle: string;
    stack: { group: string; items: string[] }[];
    projectsTitle: string;
    projects: { name: string; text: string; tech: string[]; repo: string }[];
    sitesTitle: string;
    sitesText: string;
    languagesTitle: string;
    languages: string[];
    code: string;
  };
  footer: { note: string };
};
