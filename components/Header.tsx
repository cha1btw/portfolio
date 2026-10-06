import Link from "next/link";
import type { Dict } from "@/content/types";
import { localePath, otherLang } from "@/lib/paths";
import { ContactButton } from "./ContactButton";
import { ThemeToggle } from "./ui/circular-theme-reveal";

export function Header({ dict, page }: { dict: Dict; page: "home" | "cv" }) {
  const home = localePath(dict.lang, "");
  const path = page === "home" ? "" : "/cv";
  const anchors = [
    { href: `${home}#work`, label: dict.nav.work },
    { href: `${home}#services`, label: dict.nav.services },
    { href: `${home}#process`, label: dict.nav.process },
  ];

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-bg/85 backdrop-blur-md">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-bg"
      >
        {dict.nav.skip}
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 md:gap-6 md:px-8">
        <Link href={home} className="font-semibold tracking-tight" aria-label={dict.nav.home}>
          {dict.name}
        </Link>

        <nav className="ml-auto flex items-center gap-4 text-sm text-muted md:gap-7">
          {anchors.map((a) => (
            <a key={a.href} href={a.href} className="hidden transition-colors hover:text-ink md:inline">
              {a.label}
            </a>
          ))}
          <Link
            href={localePath(dict.lang, "/cv")}
            aria-current={page === "cv" ? "page" : undefined}
            className="transition-colors hover:text-ink aria-[current=page]:text-ink"
          >
            {dict.nav.cv}
          </Link>
          <Link
            href={localePath(otherLang(dict.lang), path)}
            hrefLang={otherLang(dict.lang)}
            aria-label={dict.nav.langAria}
            className="font-mono text-xs transition-colors hover:text-ink"
          >
            {dict.nav.langLabel}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle label={dict.nav.theme} />
          <ContactButton label={dict.contactCta} compact />
        </div>
      </div>
    </header>
  );
}
