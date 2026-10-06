import type { Dict } from "./types";

export const en: Dict = {
  lang: "en",
  name: "Danyil",
  fullName: "Danyil Rudnytskyi",
  initials: "DR",
  role: "Web developer",
  meta: {
    title: "Danyil Rudnytskyi | Websites and Telegram bots for small business",
    description:
      "I build websites, Telegram bots and simple automation for small businesses. Based in Kyiv, working remotely.",
    cvTitle: "Danyil Rudnytskyi | Full-stack developer CV",
    cvDescription: "Junior full-stack developer: Python, TypeScript, Next.js, FastAPI, Telegram bots.",
  },
  nav: {
    work: "Work",
    services: "Services",
    process: "Process",
    cv: "CV",
    home: "Home",
    langLabel: "UA",
    langAria: "Українська версія",
    theme: "Switch theme",
    skip: "Skip to content",
  },
  contactCta: "Message me",
  hero: {
    badge: "Open to new projects",
    greeting: "Hi, I'm",
    lead: "I build",
    words: ["websites", "Telegram bots", "automation"],
    tail: "for small businesses.",
    srText: "I build websites, Telegram bots and automation for small businesses.",
    secondary: "See my work",
    socialLabel: "Contacts",
    photoAlt: "Danyil Rudnytskyi",
    carouselLabel: "My work",
    prev: "Previous project",
    next: "Next project",
    open: "Open site",
  },
  work: {
    title: "Work",
    open: "Open site",
    labels: { concept: "Concept", demo: "Demo", ngo: "For an NGO" },
    items: {
      meliation: {
        title: "Meliation",
        text: "Concept site for an apparel sourcing agent in Istanbul. Two languages, CSS animations, a one-tap WhatsApp brief.",
        alt: "First screen of the Meliation site: the headline and a ribbon of fabric",
      },
      humanCapacity: {
        title: "Human Capacity",
        text: "Landing page for an authorial cultural project: an interview archive and charity auctions supporting veterans.",
        alt: "First screen of the Human Capacity site with a colourful geometric mosaic",
      },
      sheepland: {
        title: "Sheepland",
        text: "Site for an eco-farm near Kyiv: cabins, photo sessions and a booking form on the first screen.",
        alt: "First screen of the Sheepland site with green hills and a booking form",
      },
      aero8: {
        title: "AERO8",
        text: "Demo site for a fuel station network: fuel prices, station map, filters and a trip calculator.",
        alt: "First screen of the AERO8 site with a green fuel station",
      },
      flowerSeason: {
        title: "Christmas by Flower Season",
        text: "Site for holiday decor, corporate gifts and team workshops.",
        alt: "First screen of the Christmas by Flower Season site with a candle and fir branches",
      },
    },
  },
  services: {
    title: "What I can build for you",
    priceFrom: "from",
    items: [
      {
        title: "Website or landing page",
        text: "A page that explains what you do and brings in leads. Looks right on phones and loads fast. Multi-page sites from $300.",
        examples: ["Service landing page", "Business card site", "Event page"],
      },
      {
        title: "Telegram bot",
        text: "A bot that takes orders, books clients or answers common questions while you are busy.",
        examples: ["Appointment booking", "Order intake", "FAQ answers"],
      },
      {
        title: "Automation",
        text: "I remove manual busywork: site leads straight into a spreadsheet, Telegram alerts, simple reports.",
        examples: ["Leads to Google Sheets", "Telegram alerts", "Connecting services via API"],
      },
    ],
    maintenance: {
      title: "Support after launch",
      text: "I keep the site running and make small edits, up to 2 hours a month.",
      perMonth: "a month",
    },
  },
  process: {
    title: "How we will work",
    steps: [
      { verb: "We talk", text: "A short call about your business, your clients and what the site or bot should do." },
      { verb: "We agree on a plan", text: "Structure, timeline and price before any work starts, so there are no surprises later." },
      { verb: "You see a preview", text: "You get a link to the work in progress and send feedback along the way." },
      { verb: "I launch it", text: "Domain, hosting, checks on real phones, and a walkthrough of how to use it." },
    ],
  },
  contact: {
    title: "Need a website or a bot?",
    text: "Send a few sentences about your business. I will reply and suggest how to build it.",
    emailLabel: "Email",
    githubLabel: "GitHub",
  },
  cv: {
    intro:
      "Junior full-stack developer based in Kyiv. I write Python and TypeScript: sites in Next.js, backends in FastAPI, Telegram bots in aiogram. Looking for a junior role and taking freelance projects.",
    educationTitle: "Education",
    education: [
      { place: "Taras Shevchenko National University of Kyiv", detail: "Economic Cybernetics, studying online" },
      { place: "Griffith College, Dublin", detail: "Computing Science, two years" },
    ],
    stackTitle: "Stack",
    stack: [
      { group: "Frontend", items: ["TypeScript", "React", "Next.js", "Tailwind CSS"] },
      { group: "Backend", items: ["Python", "FastAPI", "aiogram", "Java"] },
      { group: "Databases", items: ["PostgreSQL", "MySQL", "Qdrant"] },
      { group: "ML", items: ["PyTorch", "YOLO", "OpenCV", "Ollama"] },
      { group: "Tools", items: ["Docker", "Git", "GitHub", "Vercel"] },
    ],
    projectsTitle: "Technical projects",
    projects: [
      {
        name: "VanguardRAG",
        text: "Local RAG pipeline: ask questions about your own documents with no cloud APIs. Four services in Docker Compose.",
        tech: ["FastAPI", "Qdrant", "Ollama", "Streamlit", "Docker"],
        repo: "VanguardRAG",
      },
      {
        name: "Bird Detector",
        text: "Fine-tuned YOLO on a single class to detect birds in video, from dataset to metrics and inference.",
        tech: ["Python", "YOLO", "OpenCV"],
        repo: "bird-detector",
      },
      {
        name: "Crypto Projects",
        text: "Take-home task: the backend pulls CoinGecko data, filters it by business rules and caches it. The frontend shows a searchable, sortable table.",
        tech: ["FastAPI", "httpx", "React", "TypeScript"],
        repo: "test-task",
      },
      {
        name: "Apartment 118 Tournaments",
        text: "Tournament management system: CRUD, REST API and a normalized MySQL schema.",
        tech: ["Next.js", "React", "MySQL"],
        repo: "Apartment-118-Tournaments",
      },
      {
        name: "Household Appliance Inventory",
        text: "Appliance inventory app with data validation and parameterized database queries.",
        tech: ["Next.js", "MySQL", "Tailwind CSS"],
        repo: "household-appliance-inventory",
      },
    ],
    sitesTitle: "Websites",
    sitesText: "The websites I have built are on the home page.",
    languagesTitle: "Languages",
    languages: ["Ukrainian", "English"],
    code: "Code",
  },
  footer: { note: "Built with Next.js and Tailwind CSS." },
};
