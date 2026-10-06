import type { Dict } from "@/content/types";
import { maintenancePrice, servicePrices } from "@/lib/site";

export function Services({ dict }: { dict: Dict }) {
  return (
    <section id="services" className="border-y border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-12 md:px-8 md:py-28">
        <h2 className="reveal text-3xl font-semibold tracking-tight text-balance md:sticky md:top-28 md:col-span-4 md:self-start md:text-4xl">
          {dict.services.title}
        </h2>

        <div className="divide-y divide-line md:col-span-8">
          {dict.services.items.map((service, i) => {
            const price = servicePrices[i];
            return (
              <article key={service.title} className="reveal py-8 first:pt-0 last:pb-0">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="text-2xl font-semibold tracking-tight">{service.title}</h3>
                  {price != null && (
                    <p className="font-mono text-sm text-muted">
                      {dict.services.priceFrom} ${price}
                    </p>
                  )}
                </div>
                <p className="mt-3 max-w-[60ch] leading-relaxed text-muted">{service.text}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {service.examples.map((example) => (
                    <li key={example} className="rounded-full bg-bg px-3 py-1 text-sm">
                      {example}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}

          {maintenancePrice != null && (
            <div className="reveal flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-8 last:pb-0">
              <div>
                <h3 className="text-lg font-semibold tracking-tight">{dict.services.maintenance.title}</h3>
                <p className="mt-2 max-w-[60ch] leading-relaxed text-muted">{dict.services.maintenance.text}</p>
              </div>
              <p className="font-mono text-sm text-muted">
                ${maintenancePrice} {dict.services.maintenance.perMonth}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
