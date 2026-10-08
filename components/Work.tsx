import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { Dict } from "@/content/types";
import { projects, type Project } from "@/lib/site";
import { PanImage } from "./ui/pan-image";

// Bento rhythm on desktop: wide + narrow, narrow + wide, then one full-width row.
// Phones get a single column.
const layout = [
  { span: "md:col-span-4", shape: "wide" },
  { span: "md:col-span-2", shape: "narrow" },
  { span: "md:col-span-2", shape: "narrow" },
  { span: "md:col-span-4", shape: "wide" },
  { span: "md:col-span-6", shape: "row" },
] as const;

export function Work({ dict }: { dict: Dict }) {
  return (
    <section id="work" className="mx-auto max-w-6xl px-4 py-20 md:px-8 md:py-28">
      <h2 className="reveal text-3xl font-semibold tracking-tight md:text-4xl">{dict.work.title}</h2>
      <div className="mt-10 grid gap-5 md:grid-cols-6 md:gap-6">
        {projects.map((project, i) => (
          <Card key={project.key} project={project} dict={dict} {...layout[i % layout.length]} />
        ))}
      </div>
    </section>
  );
}

function Card({
  project,
  dict,
  span,
  shape,
}: {
  project: Project;
  dict: Dict;
  span: string;
  shape: "wide" | "narrow" | "row";
}) {
  const copy = dict.work.items[project.key];
  const isRow = shape === "row";
  const imageBox =
    shape === "narrow" ? "aspect-[4/3] md:aspect-auto md:min-h-48 md:flex-1" : "aspect-[2/1]";

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`reveal group flex flex-col gap-5 rounded-2xl bg-surface p-3 transition-colors hover:bg-line/60 ${span} ${
        isRow ? "md:grid md:grid-cols-2 md:items-center md:gap-8" : ""
      }`}
    >
      {/* Hover scrolls the full-page screenshot from top to bottom. */}
      <div className={`pan-frame relative overflow-hidden rounded-xl border border-line ${imageBox}`}>
        <PanImage
          src={project.image}
          alt={copy.alt}
          sizes={shape === "narrow" ? "(min-width: 768px) 32vw, 100vw" : "(min-width: 768px) 64vw, 100vw"}
          mode="hover"
        />
      </div>

      <div className={`px-2 pb-2 ${isRow ? "md:py-4 md:pr-6" : ""}`}>
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-xl font-semibold tracking-tight">{copy.title}</h3>
          {project.status && (
            <span className="rounded-full border border-line px-2.5 py-0.5 text-xs text-muted">
              {dict.work.labels[project.status]}
            </span>
          )}
        </div>
        <p className="mt-2 max-w-[60ch] leading-relaxed text-muted">{copy.text}</p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-xs text-muted">{project.tags.join(" / ")}</p>
          <span className="inline-flex items-center gap-1 text-sm font-medium transition-colors group-hover:text-accent">
            {dict.work.open}
            <ArrowUpRight size={14} weight="bold" aria-hidden />
          </span>
        </div>
      </div>
    </a>
  );
}
