# Danyil Rudnytskyi: portfolio

Personal site of a full-stack developer who builds websites, Telegram bots and simple automation for small businesses.

**Live:** https://danyil-rudnytskyi.vercel.app

English at `/` (default), Ukrainian at `/uk`, CV at `/cv` and `/uk/cv`.

## What's inside

- **Hero** with a portrait, a rotating "I build ..." line and an interactive constellation grid: a canvas mesh held by springs (Hooke's law), pushed by the cursor, with shockwaves on fast sweeps.
- **Card deck** of real project screenshots: flick the top card away and it slides back under the pile. Buttons, arrow keys and autoplay that only runs while the deck is on screen.
- **Work grid, services with starting prices, process, contact block.**
- **Light and dark theme** with a circular reveal from the toggle (View Transitions API), set before first paint so there is no flash.
- Everything respects `prefers-reduced-motion`.

## Stack

Next.js 16 (App Router, static pages), React 19, TypeScript, Tailwind CSS 4, Geist fonts, Phosphor icons. No animation libraries: motion is CSS and small canvas/React components. Deployed on Vercel.

## Run locally

```bash
npm install
npm run dev
```

## Where to edit

- `lib/site.ts`: contacts, project links and status labels, prices, portrait.
- `content/en.ts`, `content/uk.ts`: every visible text.
- `public/work/*.jpg`: project screenshots (1440x720, taken with headless Chrome).
- `components/ui/`: the interactive pieces (constellation grid, card deck, rotating words, theme toggle).
