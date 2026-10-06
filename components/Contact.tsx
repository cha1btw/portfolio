import { EnvelopeSimple, GithubLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import type { Dict } from "@/content/types";
import { contacts, githubUrl } from "@/lib/site";
import { ContactButton } from "./ContactButton";

export function Contact({ dict }: { dict: Dict }) {
  // Links with an empty value in lib/site.ts are skipped.
  const links = [
    contacts.email && { href: `mailto:${contacts.email}`, label: contacts.email, Icon: EnvelopeSimple },
    { href: githubUrl, label: `github.com/${contacts.github}`, Icon: GithubLogo },
    contacts.linkedin && { href: contacts.linkedin, label: "LinkedIn", Icon: LinkedinLogo },
  ].filter(Boolean) as { href: string; label: string; Icon: typeof GithubLogo }[];

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 pb-20 md:px-8 md:pb-28">
      <div className="reveal rounded-2xl bg-ink px-6 py-14 text-bg md:px-14 md:py-20">
        <h2 className="max-w-[18ch] text-3xl font-semibold tracking-tight text-balance md:text-5xl">
          {dict.contact.title}
        </h2>
        <p className="mt-5 max-w-[48ch] text-lg leading-relaxed opacity-75">{dict.contact.text}</p>
        <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5">
          <ContactButton label={dict.contactCta} inverted />
          <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
            {links.map(({ href, label, Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 opacity-80 transition-opacity hover:opacity-100"
                >
                  <Icon size={18} aria-hidden />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
