import type { Dict } from "@/content/types";
import { projects } from "@/lib/site";
import { TiltedGridHero } from "./ui/tilted-grid-hero";

// The sites as a row of first-screen pictures bending round a cylinder, streaming past under the hero.
// The pictures are refreshed from the live sites by `npm run shots` (see scripts/update-shots.mjs).
// The band is decorative; every site is listed with a link in the work section below.
export function Showcase({ dict }: { dict: Dict }) {
  const images = projects.map((p) => ({ src: p.hero.src, alt: dict.work.items[p.key].title }));

  return (
    <section aria-label={dict.hero.carouselLabel} className="reveal border-y border-line">
      <TiltedGridHero
        images={images}
        className="h-[280px] w-full md:h-[clamp(340px,52svh,500px)]"
        tileHeight={54}
        axis={50}
        speed={5}
        curve={66}
        gap={16}
      />
    </section>
  );
}
