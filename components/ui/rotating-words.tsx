"use client";

import * as React from "react";

/*
 * Rotating words, after the 21st.dev "animated-hero" (that one needs a 21st.dev
 * account and pulls in framer-motion). Same idea with CSS transitions only:
 * every word sits in the same grid cell, the current one slides in from below
 * with a slight spring overshoot, the previous one leaves upwards.
 *
 * Screen readers get the whole sentence once (`srText`); the moving part is hidden
 * from them.
 */
export function RotatingWords({
  words,
  srText,
  interval = 2200,
  className = "",
}: {
  words: string[];
  srText: string;
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = React.useState(0);
  const n = words.length;

  React.useEffect(() => {
    if (n < 2) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % n), interval);
    return () => window.clearInterval(timer);
  }, [n, interval]);

  return (
    <>
      <span className="sr-only">{srText}</span>
      {/* A little vertical padding keeps descenders (у, р, g) from being clipped
          without reaching into the next line. */}
      <span aria-hidden className={`relative -my-1 inline-grid overflow-hidden py-1 align-bottom ${className}`}>
        {words.map((word, i) => {
          const offset = (i - index + n) % n;
          const state = offset === 0 ? "current" : offset === n - 1 ? "previous" : "next";
          return (
            <span
              key={word}
              className="col-start-1 row-start-1 whitespace-nowrap transition-[transform,opacity] duration-[600ms] ease-[cubic-bezier(0.34,1.18,0.64,1)]"
              style={{
                transform: state === "current" ? "none" : state === "previous" ? "translateY(-110%)" : "translateY(110%)",
                opacity: state === "current" ? 1 : 0,
              }}
            >
              {word}
            </span>
          );
        })}
      </span>
    </>
  );
}
