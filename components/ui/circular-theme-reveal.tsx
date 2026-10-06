"use client";

import * as React from "react";
import { Moon, Sun } from "@phosphor-icons/react/dist/ssr";
import { THEME_STORAGE_KEY } from "@/lib/theme";

/*
 * Circular theme reveal, adapted from the CircularThemeReveal component.
 * The original wraps its own full-screen surface with scoped colours; here the
 * same View Transition trick switches the whole site instead: light grows out
 * of the toggle as a circle, dark closes in from the edges back onto it.
 *
 * The theme lives in <html data-theme>, set before paint by `themeScript`
 * (lib/theme.ts, inlined in lib/layout.tsx) so there is no flash of the wrong theme.
 */

type Theme = "light" | "dark";

type TransitionDocument = Document & {
  startViewTransition?: (update: () => void) => {
    ready: Promise<void>;
    finished: Promise<void>;
    skipTransition: () => void;
  };
};

export function ThemeToggle({ label, duration = 700 }: { label: string; duration?: number }) {
  const locked = React.useRef(false);
  const button = React.useRef<HTMLButtonElement>(null);

  async function toggle() {
    if (locked.current) return;
    locked.current = true;

    const root = document.documentElement;
    const next: Theme = root.dataset.theme === "dark" ? "light" : "dark";
    const commit = () => {
      root.dataset.theme = next;
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        /* Storage is optional, the theme still switches for this visit. */
      }
    };

    const doc = document as TransitionDocument;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!doc.startViewTransition || reduced || !button.current) {
      // A direct change avoids blank overlays in browsers without View Transitions.
      commit();
      locked.current = false;
      return;
    }

    // The circle is centred on the toggle and reaches the farthest corner of the screen.
    const b = button.current.getBoundingClientRect();
    const x = b.left + b.width / 2;
    const y = b.top + b.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const zero = `circle(0px at ${x}px ${y}px)`;
    const full = `circle(${radius}px at ${x}px ${y}px)`;

    // Tells the CSS which snapshot sits on top (see globals.css).
    root.dataset.reveal = next;
    const transition = doc.startViewTransition(commit);
    // Always restore the live page, even if the browser stalls on a snapshot.
    const watchdog = window.setTimeout(() => transition.skipTransition(), duration + 1500);
    try {
      await transition.ready;
      await root.animate(
        { clipPath: next === "light" ? [zero, full] : [full, zero] },
        {
          duration,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          pseudoElement: `::view-transition-${next === "light" ? "new" : "old"}(root)`,
        },
      ).finished;
    } catch {
      /* A failed snapshot still leaves the new theme committed. */
    } finally {
      window.clearTimeout(watchdog);
      await transition.finished.catch(() => {});
      delete root.dataset.reveal;
      locked.current = false;
    }
  }

  return (
    <button
      ref={button}
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-ink transition-colors hover:border-accent hover:text-accent"
    >
      {/* Icons swap with CSS from data-theme, so the button renders the same on the server. */}
      <Sun size={17} weight="bold" aria-hidden className="hidden dark:block" />
      <Moon size={17} weight="bold" aria-hidden className="dark:hidden" />
    </button>
  );
}
