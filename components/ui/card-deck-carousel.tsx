"use client";

import * as React from "react";
import Image, { type StaticImageData } from "next/image";
import { ArrowUpRight, CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr";

/*
 * Card deck carousel, after the 21st.dev "card-deck-carousel" (that one needs a
 * 21st.dev account to install). Images lie in a pile like loose prints:
 * - drag or flick the top card in any direction and it flies off, then slides
 *   back under the pile;
 * - the buttons, left/right arrow keys and autoplay do the same;
 * - autoplay runs only while the deck is on screen, and pauses while the pointer
 *   is over it or right after someone interacts;
 * - with reduced motion cards swap without flying and autoplay is off.
 */

export type DeckSlide = {
  image: StaticImageData;
  title: string;
  caption: string;
  alt: string;
  href?: string;
};

type Drag = { id: number; x: number; y: number; startX: number; startY: number; lastX: number; lastY: number; lastT: number; vx: number; vy: number };

// Each card keeps its own tilt so the pile looks hand-stacked, not mechanical.
const TILTS = [-5, 4, -2.5, 6, -3.5, 2];
const VISIBLE = 4; // cards drawn under the top one
const FLY_MS = 380;

export function CardDeckCarousel({
  slides,
  aspect = "16 / 10",
  autoplay = 5000,
  prevLabel = "Previous",
  nextLabel = "Next",
  openLabel = "Open",
  ariaLabel = "Carousel",
  initialIndex = 0,
}: {
  slides: DeckSlide[];
  aspect?: string;
  autoplay?: number;
  prevLabel?: string;
  nextLabel?: string;
  openLabel?: string;
  ariaLabel?: string;
  initialIndex?: number;
}) {
  const n = slides.length;
  // order[0] is the card on top; the rest follow down the pile.
  const [order, setOrder] = React.useState(() =>
    Array.from({ length: n }, (_, i) => (i + initialIndex) % n),
  );
  const [drag, setDrag] = React.useState<Drag | null>(null);
  // A card that is flying off: where it goes, and whether it is coming back in from there.
  const [flight, setFlight] = React.useState<{ id: number; x: number; y: number; entering: boolean } | null>(null);
  const busy = React.useRef(false);
  const lastTouch = React.useRef(0);
  const hovering = React.useRef(false);
  const reduced = React.useRef(false);
  const inView = React.useRef(false);
  const root = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Autoplay only while the deck is visible, so nobody misses the first card.
    const io = new IntersectionObserver(([entry]) => {
      inView.current = entry.isIntersecting;
      if (entry.isIntersecting) lastTouch.current = performance.now();
    }, { threshold: 0.5 });
    if (root.current) io.observe(root.current);
    return () => io.disconnect();
  }, []);

  const top = order[0];

  // Send the top card off in a direction, then tuck it under the pile.
  const sendBack = React.useCallback(
    (dx: number, dy: number) => {
      if (busy.current || n < 2) return;
      if (reduced.current) {
        setOrder((o) => [...o.slice(1), o[0]]);
        return;
      }
      busy.current = true;
      const len = Math.hypot(dx, dy) || 1;
      setFlight({ id: order[0], x: (dx / len) * 700, y: (dy / len) * 420, entering: false });
      window.setTimeout(() => {
        setOrder((o) => [...o.slice(1), o[0]]);
        setFlight(null);
        busy.current = false;
      }, FLY_MS);
    },
    [n, order],
  );

  // Bring the bottom card back on top, flying in from the left.
  const bringBack = React.useCallback(() => {
    if (busy.current || n < 2) return;
    const last = order[n - 1];
    if (reduced.current) {
      setOrder((o) => [o[n - 1], ...o.slice(0, n - 1)]);
      return;
    }
    busy.current = true;
    setFlight({ id: last, x: -700, y: -60, entering: true });
    setOrder((o) => [o[n - 1], ...o.slice(0, n - 1)]);
    // Two frames: first paint it off-screen on top, then let it glide in.
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setFlight(null);
        window.setTimeout(() => (busy.current = false), FLY_MS);
      }),
    );
  }, [n, order]);

  const next = React.useCallback(() => {
    lastTouch.current = performance.now();
    sendBack(-1, -0.15);
  }, [sendBack]);
  const prev = React.useCallback(() => {
    lastTouch.current = performance.now();
    bringBack();
  }, [bringBack]);

  // Autoplay waits while the pointer is over the deck or right after an interaction.
  React.useEffect(() => {
    if (!autoplay || n < 2) return;
    const timer = window.setInterval(() => {
      if (reduced.current || document.hidden || !inView.current || hovering.current || drag) return;
      if (performance.now() - lastTouch.current < autoplay) return;
      sendBack(-1, -0.15);
    }, autoplay);
    return () => window.clearInterval(timer);
  }, [autoplay, n, drag, sendBack]);

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (busy.current) return;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* Capture is a nicety; dragging still works without it. */
    }
    lastTouch.current = performance.now();
    setDrag({ id: top, x: 0, y: 0, startX: e.clientX, startY: e.clientY, lastX: e.clientX, lastY: e.clientY, lastT: e.timeStamp, vx: 0, vy: 0 });
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!drag) return;
    const dt = Math.max(1, e.timeStamp - drag.lastT);
    setDrag({
      ...drag,
      x: e.clientX - drag.startX,
      y: e.clientY - drag.startY,
      // Smoothed speed in px per ms, so a flick counts even if the drag was short.
      vx: 0.7 * ((e.clientX - drag.lastX) / dt) + 0.3 * drag.vx,
      vy: 0.7 * ((e.clientY - drag.lastY) / dt) + 0.3 * drag.vy,
      lastX: e.clientX,
      lastY: e.clientY,
      lastT: e.timeStamp,
    });
  }

  function onPointerUp() {
    if (!drag) return;
    const far = Math.hypot(drag.x, drag.y) > 110;
    const fast = Math.hypot(drag.vx, drag.vy) > 0.6;
    setDrag(null);
    lastTouch.current = performance.now();
    if (far || fast) sendBack(drag.x + drag.vx * 200, drag.y + drag.vy * 200);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") next();
    else if (e.key === "ArrowLeft") prev();
    else return;
    e.preventDefault();
  }

  const current = slides[top];

  return (
    <div
      ref={root}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onPointerEnter={() => (hovering.current = true)}
      onPointerLeave={() => (hovering.current = false)}
      className="mx-auto w-full max-w-2xl outline-none focus-visible:rounded-2xl focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-8 focus-visible:ring-offset-bg"
    >
      <div className="relative w-full" style={{ aspectRatio: aspect }}>
        {order.map((id, depth) => {
          const slide = slides[id];
          const isTop = depth === 0;
          const tilt = TILTS[id % TILTS.length];
          const flying = flight?.id === id;
          const dragging = drag?.id === id;

          let transform: string;
          if (flying) {
            transform = `translate(${flight.x}px, ${flight.y}px) rotate(${flight.x * 0.03}deg)`;
          } else if (dragging) {
            transform = `translate(${drag.x}px, ${drag.y}px) rotate(${drag.x * 0.04}deg)`;
          } else if (isTop) {
            transform = `rotate(${tilt * 0.2}deg)`;
          } else {
            const d = Math.min(depth, VISIBLE);
            transform = `translate(${d * 6}px, ${-d * 10}px) rotate(${tilt}deg) scale(${1 - d * 0.035})`;
          }

          return (
            <div
              key={id}
              aria-hidden={!isTop}
              onPointerDown={isTop ? onPointerDown : undefined}
              onPointerMove={isTop ? onPointerMove : undefined}
              onPointerUp={isTop ? onPointerUp : undefined}
              onPointerCancel={isTop ? onPointerUp : undefined}
              className={`absolute inset-0 overflow-hidden rounded-2xl bg-surface ring-1 ring-line shadow-[0_30px_60px_-28px_rgb(0_0_0/0.5)] ${
                isTop ? "cursor-grab touch-none active:cursor-grabbing" : ""
              } ${dragging ? "" : "transition-[transform,opacity] duration-[380ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"}`}
              style={{
                transform,
                // The flying card stays on top until it lands under the pile.
                zIndex: flying && !flight.entering ? n + 1 : n - depth,
                opacity: flying || depth > VISIBLE ? 0 : 1,
              }}
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                draggable={false}
                sizes="(min-width: 768px) 42rem, 92vw"
                placeholder="blur"
                className="pointer-events-none select-none object-cover object-left-top"
              />
            </div>
          );
        })}
      </div>

      {/* Caption row: previous, title + caption, counter, next. */}
      <div className="mt-10 flex items-center gap-4 sm:gap-6">
        <button type="button" onClick={prev} aria-label={prevLabel} className={roundButton}>
          <CaretLeft size={16} weight="bold" aria-hidden />
        </button>
        <div key={top} className="min-w-0 flex-1 animate-[enter_0.5s_cubic-bezier(0.16,1,0.3,1)_both] motion-reduce:animate-none">
          <p className="truncate text-xl font-semibold tracking-tight">
            {current.href ? (
              <a href={current.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:underline">
                {current.title}
                <ArrowUpRight size={15} weight="bold" aria-label={openLabel} />
              </a>
            ) : (
              current.title
            )}
          </p>
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted">{current.caption}</p>
        </div>
        <p className="hidden font-mono text-xs tracking-widest text-muted sm:block" aria-live="polite">
          <span className="text-ink">{String(top + 1).padStart(2, "0")}</span> / {String(n).padStart(2, "0")}
        </p>
        <button type="button" onClick={next} aria-label={nextLabel} className={roundButton}>
          <CaretRight size={16} weight="bold" aria-hidden />
        </button>
      </div>
    </div>
  );
}

const roundButton =
  "grid size-11 shrink-0 place-items-center rounded-full border border-line bg-bg text-ink transition-colors hover:border-ink";
