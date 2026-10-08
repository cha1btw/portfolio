import Image, { type StaticImageData } from "next/image";

/*
 * A tall full-page screenshot shown inside a fixed frame, scrolled from top to
 * bottom so the whole site can be seen, not just its first screen.
 *
 * The frame (the parent) must clip and be a size container (`overflow-hidden`
 * plus the `.pan-frame` class). The slide distance is "frame height minus image
 * height" as `calc(100cqh - 100%)`, so it works for any frame proportions.
 * The motion itself lives in globals.css:
 *   mode "auto"  - plays once, with a short delay (used on the top card of the deck);
 *   mode "hover" - slides down while the pointer is over a `.group` parent and back up after;
 *   mode "still" - stays on the top of the page.
 */

export type PanMode = "auto" | "hover" | "still";

/** Seconds a page takes to scroll through: longer pages take longer, within limits. */
export function panSeconds(src: StaticImageData) {
  const pagesTall = src.height / src.width;
  return Math.round(Math.min(16, Math.max(8, 6 + pagesTall * 1.2)));
}

export function PanImage({
  src,
  alt,
  sizes,
  mode,
  draggable = true,
}: {
  src: StaticImageData;
  alt: string;
  sizes: string;
  mode: PanMode;
  draggable?: boolean;
}) {
  return (
    <div
      className={mode === "auto" ? "pan pan-auto" : mode === "hover" ? "pan pan-hover" : "pan"}
      style={{ "--pan-dur": `${panSeconds(src)}s` } as React.CSSProperties}
    >
      <Image
        src={src}
        alt={alt}
        sizes={sizes}
        placeholder="blur"
        draggable={draggable}
        className="pointer-events-none block h-auto w-full select-none"
      />
    </div>
  );
}
