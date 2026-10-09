# Danyil Rudnytskyi: portfolio

Personal site of a full-stack developer who builds websites, Telegram bots and simple automation for small businesses.

**Live:** https://danyil-rudnytskyi.vercel.app

English at `/` (default), Ukrainian at `/uk`, CV at `/cv` and `/uk/cv`.

## What's inside

- **Hero** with a portrait, a rotating "I build ..." line and an interactive constellation grid: a canvas mesh held by springs (Hooke's law), pushed by the cursor, with shockwaves on fast sweeps.
- **Curved row** of the sites' first screens streaming around a cylinder (every picture is cut into 16 strips, each turned a few degrees), and a work grid where a hover scrolls through each full page.
- **Work grid, services, process, contact block.**
- **Light and dark theme** with a circular reveal from the toggle (View Transitions API), set before first paint so there is no flash.

## Stack

Next.js 16 (App Router, static pages), React 19, TypeScript, Tailwind CSS 4, Geist fonts, Phosphor icons. No animation libraries: motion is CSS and small canvas/React components. Deployed on Vercel.

## Run locally

```bash
npm install
npm run dev
```

## Keeping the pictures fresh

The pictures are screenshots of the live sites, taken by `scripts/update-shots.mjs`:

```bash
npm run shots            # re-take them; only files that visibly changed are replaced
npm run shots -- --force # replace everything
```

`.github/workflows/refresh-shots.yml` runs this every day and commits real changes, which redeploys the site. To add a site, put it in `SITES` in the script and in `projects` in `lib/site.ts`.

## Where to edit

- `lib/site.ts`: contacts, project links and status labels, prices, portrait.
- `content/en.ts`, `content/uk.ts`: every visible text.
- `public/work/` (full pages) and `public/work/hero/` (first screens): project screenshots, made by `npm run shots`.
- `components/ui/`: the interactive pieces (constellation grid, curved row, scrolling screenshots, rotating words, theme toggle).
