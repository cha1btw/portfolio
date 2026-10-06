import type { Dict } from "@/content/types";

export function Process({ dict }: { dict: Dict }) {
  return (
    <section id="process" className="mx-auto max-w-6xl px-4 py-20 md:px-8 md:py-28">
      <h2 className="reveal text-3xl font-semibold tracking-tight md:text-4xl">{dict.process.title}</h2>
      {/* A line runs through all steps on desktop; on phones the steps stack with a line on the left. */}
      <ol className="mt-12 grid gap-10 border-l border-line pl-6 md:grid-cols-4 md:gap-8 md:border-l-0 md:border-t md:pl-0 md:pt-8">
        {dict.process.steps.map((step) => (
          <li key={step.verb} className="reveal relative">
            <span
              aria-hidden
              className="absolute -left-[29px] top-2 size-2.5 rounded-full bg-accent md:-top-[37px] md:left-0"
            />
            <h3 className="text-lg font-semibold tracking-tight">{step.verb}</h3>
            <p className="mt-2 leading-relaxed text-muted">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
