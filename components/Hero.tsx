import Image from "next/image";
import { EnvelopeSimple, GithubLogo, LinkedinLogo, TelegramLogo } from "@phosphor-icons/react/dist/ssr";
import type { Dict } from "@/content/types";
import { contacts, githubUrl, photo, telegramUrl } from "@/lib/site";
import { ContactButton } from "./ContactButton";
import { ConstellationGrid } from "./ui/constellation-grid";
import { RotatingWords } from "./ui/rotating-words";

export function Hero({ dict }: { dict: Dict }) {
  const socials = [
    telegramUrl && { href: telegramUrl, label: "Telegram", Icon: TelegramLogo },
    { href: githubUrl, label: "GitHub", Icon: GithubLogo },
    contacts.linkedin && { href: contacts.linkedin, label: "LinkedIn", Icon: LinkedinLogo },
    contacts.email && { href: `mailto:${contacts.email}`, label: contacts.email, Icon: EnvelopeSimple },
  ].filter(Boolean) as { href: string; label: string; Icon: typeof GithubLogo }[];

  return (
    <section className="relative isolate overflow-hidden">
      {/* Interactive spring mesh behind everything, fading out towards the edges. */}
      <ConstellationGrid className="[mask-image:radial-gradient(ellipse_75%_70%_at_60%_45%,black_30%,transparent_100%)]" />
      {/* Soft light behind the text so it stays readable over the mesh. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-0 -z-10 size-[44rem] rounded-full bg-glow opacity-80 blur-3xl"
      />

      <div className="mx-auto grid min-h-[calc(100dvh-4rem)] max-w-6xl items-center gap-10 px-4 py-12 md:gap-14 md:grid-cols-12 md:px-8 md:py-20">
        <div className="md:col-span-7">
          <p className="enter inline-flex items-center gap-2.5 rounded-lg border border-line bg-bg/70 px-3.5 py-2 text-sm backdrop-blur">
            {/* Real availability state, not decoration. */}
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            {dict.hero.badge}
          </p>

          <h1
            className="enter mt-8 text-[2.75rem] font-semibold leading-[1.04] tracking-[-0.035em] sm:text-5xl lg:text-[4rem]"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            {dict.hero.greeting}
            <br />
            <span className="lg:whitespace-nowrap">{dict.fullName}</span>
          </h1>

          <p
            className="enter mt-7 text-2xl leading-snug text-muted md:text-[1.75rem]"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            {/* Visual line: "I build <rotating word>", then the tail. Screen readers get srText. */}
            <span aria-hidden>{dict.hero.lead} </span>
            <RotatingWords words={dict.hero.words} srText={dict.hero.srText} className="font-semibold text-ink" />
            <br aria-hidden />
            <span aria-hidden>{dict.hero.tail}</span>
          </p>

          <div className="enter mt-10 flex flex-wrap items-center gap-3" style={{ "--i": 3 } as React.CSSProperties}>
            <ContactButton label={dict.contactCta} />
            <a
              href="#work"
              className="inline-flex h-12 items-center rounded-lg border border-line bg-bg/70 px-6 text-[15px] font-medium backdrop-blur transition-colors hover:border-ink"
            >
              {dict.hero.secondary}
            </a>
          </div>

          <ul
            aria-label={dict.hero.socialLabel}
            className="enter mt-8 flex gap-3"
            style={{ "--i": 4 } as React.CSSProperties}
          >
            {socials.map(({ href, label, Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="grid size-11 place-items-center rounded-full border border-line bg-bg/70 text-muted backdrop-blur transition-colors hover:border-ink hover:text-ink"
                >
                  <Icon size={18} aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* On phones the portrait comes first and smaller, so the person is visible right away. */}
        <div className="enter order-first flex md:order-none md:col-span-5 md:justify-end" style={{ "--i": 2 } as React.CSSProperties}>
          <div className="relative size-40 rounded-full bg-bg p-1.5 sm:size-80 sm:p-2 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.45)] ring-1 ring-line lg:size-[22rem]">
            <div className="relative size-full overflow-hidden rounded-full bg-gradient-to-b from-surface to-line">
              {photo ? (
                <Image src={photo} alt={dict.hero.photoAlt} fill priority sizes="(min-width: 1024px) 22rem, (min-width: 640px) 20rem, 10rem" className="object-cover" placeholder="blur" />
              ) : (
                <span
                  role="img"
                  aria-label={dict.hero.photoAlt}
                  className="grid size-full place-items-center text-7xl font-semibold tracking-tight text-muted/60 lg:text-8xl"
                >
                  {dict.initials}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

