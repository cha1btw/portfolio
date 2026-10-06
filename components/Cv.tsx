import Link from "next/link";
import { ArrowUpRight, GithubLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import type { Dict } from "@/content/types";
import { localePath } from "@/lib/paths";
import { contacts, githubUrl, projects } from "@/lib/site";

export function Cv({ dict }: { dict: Dict }) {
  const { cv } = dict;

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-14 md:px-8 md:pt-20">
      <header className="enter max-w-[62ch]">
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
          {dict.name}, {dict.role.toLowerCase()}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted">{cv.intro}</p>
        <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
            <GithubLogo size={18} aria-hidden />
            github.com/{contacts.github}
          </a>
          {contacts.linkedin && (
            <a href={contacts.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
              <LinkedinLogo size={18} aria-hidden />
              LinkedIn
            </a>
          )}
        </div>
      </header>

      <div className="mt-16 grid gap-14 md:grid-cols-12 md:gap-10">
        {/* Left column: the quick facts a recruiter scans first. */}
        <aside className="space-y-12 md:col-span-4">
          <Block title={cv.educationTitle}>
            <ul className="space-y-4">
              {cv.education.map((e) => (
                <li key={e.place}>
                  <p className="font-medium">{e.place}</p>
                  <p className="text-sm text-muted">{e.detail}</p>
                </li>
              ))}
            </ul>
          </Block>

          <Block title={cv.stackTitle}>
            <dl className="space-y-4">
              {cv.stack.map((s) => (
                <div key={s.group}>
                  <dt className="text-sm text-muted">{s.group}</dt>
                  <dd className="mt-1">{s.items.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </Block>

          <Block title={cv.languagesTitle}>
            <p>{cv.languages.join(", ")}</p>
          </Block>
        </aside>

        <div className="space-y-14 md:col-span-8">
          <Block title={cv.projectsTitle}>
            <ul className="grid gap-4 sm:grid-cols-2">
              {cv.projects.map((p) => (
                <li key={p.repo} className="reveal flex flex-col rounded-2xl bg-surface p-5">
                  <h3 className="font-semibold tracking-tight">{p.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.text}</p>
                  <p className="mt-4 font-mono text-xs text-muted">{p.tech.join(" / ")}</p>
                  <a
                    href={`${githubUrl}/${p.repo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1 self-start text-sm font-medium transition-colors hover:text-accent"
                  >
                    {cv.code}
                    <ArrowUpRight size={14} weight="bold" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </Block>

          <Block title={cv.sitesTitle}>
            <p className="text-muted">
              <Link
                href={`${localePath(dict.lang, "")}#work`}
                className="text-ink underline decoration-line decoration-2 underline-offset-4 hover:decoration-accent"
              >
                {cv.sitesText}
              </Link>
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {projects.map((p) => (
                <li key={p.key}>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border border-line px-3 py-1 text-sm transition-colors hover:border-accent"
                  >
                    {dict.work.items[p.key].title}
                    <ArrowUpRight size={12} weight="bold" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </Block>
        </div>
      </div>
    </div>
  );
}

const linkClass =
  "inline-flex items-center gap-2 font-medium underline decoration-line decoration-2 underline-offset-8 transition-colors hover:decoration-accent";

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-5 text-xl font-semibold tracking-tight">{title}</h2>
      {children}
    </section>
  );
}
