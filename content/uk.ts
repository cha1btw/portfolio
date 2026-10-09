import type { Dict } from "./types";

export const uk: Dict = {
  lang: "uk",
  name: "Даниіл",
  fullName: "Даниіл Рудницький",
  initials: "ДР",
  role: "Веброзробник",
  meta: {
    title: "Даниіл Рудницький | Сайти та Telegram-боти для малого бізнесу",
    description:
      "Роблю сайти, Telegram-ботів і просту автоматизацію для малого бізнесу. Київ, працюю віддалено.",
    cvTitle: "Даниіл Рудницький | Резюме full-stack розробника",
    cvDescription: "Початківець full-stack розробник: Python, TypeScript, Next.js, FastAPI, Telegram-боти.",
  },
  nav: {
    work: "Роботи",
    services: "Послуги",
    process: "Як працюю",
    cv: "Резюме",
    home: "На головну",
    langLabel: "EN",
    langAria: "English version",
    theme: "Змінити тему",
    skip: "Перейти до змісту",
  },
  contactCta: "Написати мені",
  hero: {
    badge: "Відкритий до нових проєктів",
    greeting: "Привіт, я",
    lead: "Роблю",
    words: ["сайти", "Telegram-ботів", "автоматизацію"],
    tail: "для малого бізнесу.",
    srText: "Роблю сайти, Telegram-ботів і автоматизацію для малого бізнесу.",
    secondary: "Дивитись роботи",
    socialLabel: "Контакти",
    photoAlt: "Даниіл Рудницький",
    carouselLabel: "Мої роботи",
  },
  work: {
    title: "Роботи",
    open: "Відкрити сайт",
    labels: { concept: "Концепт", demo: "Демо", ngo: "Для громадської організації" },
    items: {
      meliation: {
        title: "Meliation",
        text: "Концепт сайту для агента з виробництва одягу в Стамбулі. Дві мови, CSS-анімації, заявка у WhatsApp в один клік.",
        alt: "Скриншот усієї сторінки сайту Meliation: від заголовка «Від тканини до готової колекції» до контактів",
      },
      humanCapacity: {
        title: "Human Capacity",
        text: "Лендинг авторського культурного проєкту: архів інтерв’ю та благодійні аукціони на підтримку ветеранів.",
        alt: "Скриншот усієї сторінки сайту Human Capacity з кольоровою геометричною мозаїкою",
      },
      sheepland: {
        title: "Sheepland",
        text: "Сайт сімейної ферми у Васильківських Карпатах: вівці й кози, фермерська кухня, фотосесії та будиночок із сауною.",
        alt: "Скриншот усієї сторінки сайту Sheepland: ферма, ціни, галерея та форма запису",
      },
      aero8: {
        title: "AERO8",
        text: "Демо сайту мережі АЗС: ціни на пальне, карта станцій, фільтри та калькулятор поїздки.",
        alt: "Скриншот усієї сторінки сайту AERO8: ціни на пальне, карта станцій і калькулятор",
      },
      flowerSeason: {
        title: "Christmas by Flower Season",
        text: "Сайт святкового оформлення, корпоративних подарунків і майстер-класів для команд.",
        alt: "Скриншот усієї сторінки сайту Christmas by Flower Season: декор, подарунки та майстер-класи",
      },
    },
  },
  services: {
    title: "Що можу зробити для вас",
    priceFrom: "від",
    items: [
      {
        title: "Сайт або лендинг",
        text: "Сторінка, яка пояснює, що ви робите, і приводить заявки. Добре виглядає на телефоні та швидко відкривається.",
        examples: ["Лендинг послуги", "Сайт-візитка", "Сторінка події"],
      },
      {
        title: "Telegram-бот",
        text: "Бот приймає замовлення, записує клієнтів або відповідає на типові питання, поки ви зайняті.",
        examples: ["Запис на послугу", "Прийом замовлень", "Відповіді на часті питання"],
      },
      {
        title: "Автоматизація",
        text: "Прибираю ручну рутину: заявки з сайту одразу в таблицю, сповіщення в Telegram, прості звіти.",
        examples: ["Заявки в Google Таблиці", "Сповіщення в Telegram", "Зв’язок сервісів через API"],
      },
    ],
    maintenance: {
      title: "Підтримка після запуску",
      text: "Слідкую, щоб сайт працював, і вношу дрібні правки до 2 годин на місяць.",
      perMonth: "на місяць",
    },
  },
  process: {
    title: "Як ми працюватимемо",
    steps: [
      { verb: "Обговорюємо", text: "Коротка розмова: що за бізнес, хто ваші клієнти і що має робити сайт чи бот." },
      { verb: "Узгоджуємо план", text: "Структура, терміни й вартість до початку роботи, щоб наприкінці не було сюрпризів." },
      { verb: "Показую проміжну версію", text: "Ви бачите сайт за посиланням ще до запуску і даєте правки по ходу." },
      { verb: "Запускаю", text: "Домен, хостинг, перевірка на телефонах. Пояснюю, як усім користуватися." },
    ],
  },
  contact: {
    title: "Є задача для сайту чи бота?",
    text: "Напишіть кілька речень про ваш бізнес. Я відповім і запропоную, як це можна зробити.",
    emailLabel: "Пошта",
    githubLabel: "GitHub",
  },
  cv: {
    intro:
      "Початківець full-stack розробник з Києва. Пишу на Python і TypeScript: сайти на Next.js, бекенди на FastAPI, Telegram-боти на aiogram. Шукаю позицію junior і беру проєкти на фрилансі.",
    educationTitle: "Освіта",
    education: [
      { place: "КНУ імені Тараса Шевченка", detail: "Економічна кібернетика, навчаюсь онлайн" },
      { place: "Griffith College, Дублін", detail: "Computing Science, два курси" },
    ],
    stackTitle: "Технології",
    stack: [
      { group: "Frontend", items: ["TypeScript", "React", "Next.js", "Tailwind CSS"] },
      { group: "Backend", items: ["Python", "FastAPI", "aiogram", "Java"] },
      { group: "Бази даних", items: ["PostgreSQL", "MySQL", "Qdrant"] },
      { group: "ML", items: ["PyTorch", "YOLO", "OpenCV", "Ollama"] },
      { group: "Інструменти", items: ["Docker", "Git", "GitHub", "Vercel"] },
    ],
    projectsTitle: "Технічні проєкти",
    projects: [
      {
        name: "VanguardRAG",
        text: "Локальний RAG-пайплайн: питання до власних документів без хмарних API. Чотири сервіси в Docker Compose.",
        tech: ["FastAPI", "Qdrant", "Ollama", "Streamlit", "Docker"],
        repo: "VanguardRAG",
      },
      {
        name: "Bird Detector",
        text: "Донавчання YOLO на одному класі та детекція птахів на відео: від датасету до метрик і інференсу.",
        tech: ["Python", "YOLO", "OpenCV"],
        repo: "bird-detector",
      },
      {
        name: "Crypto Projects",
        text: "Тестове завдання: бекенд бере дані з CoinGecko, фільтрує за бізнес-правилами й кешує. Фронтенд показує таблицю з пошуком і сортуванням.",
        tech: ["FastAPI", "httpx", "React", "TypeScript"],
        repo: "test-task",
      },
      {
        name: "Apartment 118 Tournaments",
        text: "Система керування турнірами: CRUD, REST API та нормалізована схема MySQL.",
        tech: ["Next.js", "React", "MySQL"],
        repo: "Apartment-118-Tournaments",
      },
      {
        name: "Household Appliance Inventory",
        text: "Облік побутової техніки з валідацією даних і параметризованими запитами до бази.",
        tech: ["Next.js", "MySQL", "Tailwind CSS"],
        repo: "household-appliance-inventory",
      },
    ],
    sitesTitle: "Сайти",
    sitesText: "Сайти, які я зробив, зібрані на головній сторінці.",
    languagesTitle: "Мови",
    languages: ["Українська", "Англійська"],
    code: "Код",
  },
  footer: { note: "Сайт зроблений на Next.js і Tailwind CSS." },
};
