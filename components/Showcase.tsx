import type { Dict } from "@/content/types";
import { projects } from "@/lib/site";
import { CardDeckCarousel } from "./ui/card-deck-carousel";

// The real sites as a pile of cards right under the hero: flick the top one away to see the next.
export function Showcase({ dict }: { dict: Dict }) {
  const slides = projects.map((p) => ({
    image: p.image,
    title: dict.work.items[p.key].title,
    caption: dict.work.items[p.key].text,
    alt: dict.work.items[p.key].alt,
    href: p.url,
  }));

  return (
    <section aria-label={dict.hero.carouselLabel} className="border-y border-line px-4 py-20 md:py-28">
      <CardDeckCarousel
        slides={slides}
        ariaLabel={dict.hero.carouselLabel}
        prevLabel={dict.hero.prev}
        nextLabel={dict.hero.next}
        openLabel={dict.hero.open}
      />
    </section>
  );
}
