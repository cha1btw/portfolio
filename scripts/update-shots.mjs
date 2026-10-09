// Re-takes the project screenshots from the live sites.
//
//   npm run shots            take new screenshots, overwrite files that changed
//   npm run shots -- --force overwrite every file
//
// Two images per site:
//   public/work/hero/<name>.webp  first screen, 16:9 (the curved row under the hero)
//   public/work/<name>.webp       the whole page, tall (scrolls on the work cards)
//
// A file is only replaced when the picture really changed (a small perceptual
// difference is ignored), so sites with random or date-dependent bits do not
// make a new commit every day. Chrome is found automatically on macOS; on other
// machines set CHROME_PATH. The GitHub workflow in .github/workflows runs this on
// a schedule and commits the result, which deploys the site again.

import { chromium } from "playwright-core";
import sharp from "sharp";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const force = process.argv.includes("--force");

// Keep in sync with `projects` in lib/site.ts. The names are the file names.
// `settle` is how long to wait after loading before the first-screen shot, so
// entrance animations are over (Meliation's hero clip plays for 6 seconds).
const SITES = {
  meliation: { url: "https://meliation-concept.vercel.app/", settle: 8000 },
  "human-capacity": { url: "https://human-capacity.vercel.app/", settle: 3000 },
  sheepland: { url: "https://sheepland.vercel.app/", settle: 3000 },
  aero8: { url: "https://aero8-cha1btw.vercel.app/", settle: 3000 },
  "flower-season": { url: "https://flower-season.vercel.app/", settle: 3000 },
};

// How different two pictures must be (0 to 255, average per pixel at thumbnail size) to count as an update.
const THRESHOLD = 3;

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
  ];
  const found = candidates.find((p) => p && existsSync(p));
  if (!found) throw new Error("Chrome not found. Install it or set CHROME_PATH.");
  return found;
}

// Average per-pixel difference between two images, compared as 48x48 grayscale thumbnails.
async function difference(a, b) {
  const thumb = (buf) => sharp(buf).resize(48, 48, { fit: "fill" }).grayscale().raw().toBuffer();
  const [x, y] = await Promise.all([thumb(a), thumb(b)]);
  let sum = 0;
  for (let i = 0; i < x.length; i++) sum += Math.abs(x[i] - y[i]);
  return sum / x.length;
}

// Writes the new image if the file is missing, forced, a different size, or visibly different.
async function save(path, buffer, label) {
  mkdirSync(dirname(path), { recursive: true });
  if (existsSync(path) && !force) {
    const old = readFileSync(path);
    const [a, b] = await Promise.all([sharp(old).metadata(), sharp(buffer).metadata()]);
    const sameSize = a.width === b.width && Math.abs(a.height - b.height) < 40;
    const diff = sameSize ? await difference(old, buffer) : Infinity;
    if (diff < THRESHOLD) {
      console.log(`  same      ${label} (diff ${diff.toFixed(2)})`);
      return false;
    }
    console.log(`  CHANGED   ${label} (diff ${diff === Infinity ? "size" : diff.toFixed(2)})`);
  } else {
    console.log(`  written   ${label}`);
  }
  writeFileSync(path, buffer);
  return true;
}

const browser = await chromium.launch({ executablePath: findChrome(), headless: true });
let changed = 0;

for (const [name, { url, settle }] of Object.entries(SITES)) {
  console.log(name, url);
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 810 }, deviceScaleFactor: 1 });
    // Pages that draw random shapes (Human Capacity's mosaic) look the same on every run.
    await page.addInitScript(() => {
      let seed = 123456789;
      Math.random = () => {
        seed = (seed * 16807) % 2147483647;
        return (seed - 1) / 2147483646;
      };
    });
    await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
    await page.waitForTimeout(settle);

    // 1) First screen, exactly as a visitor sees it.
    const first = await page.screenshot({ type: "png" });
    const hero = await sharp(first).resize(1280, 720).webp({ quality: 82 }).toBuffer();
    if (await save(join(root, "public/work/hero", `${name}.webp`), hero, "hero")) changed++;

    // 2) The whole page. Scroll through first so lazy images and reveal-on-scroll fire,
    //    then switch animations off so scroll-driven ones show their final state below the fold.
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < height; y += 500) {
      await page.evaluate((v) => window.scrollTo(0, v), y);
      await page.waitForTimeout(150);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(800);
    await page.addStyleTag({ content: "*{animation:none!important;transition:none!important;animation-timeline:auto!important}" });
    await page.waitForTimeout(400);
    const tall = await page.screenshot({ type: "png", fullPage: true });
    const full = await sharp(tall).resize({ width: 1200 }).webp({ quality: 80, effort: 6 }).toBuffer();
    if (await save(join(root, "public/work", `${name}.webp`), full, "full page")) changed++;

    await page.close();
  } catch (error) {
    // One broken site must not stop the others, and must not wipe its old picture.
    console.log(`  FAILED    ${name}: ${error.message.split("\n")[0]}`);
  }
}

await browser.close();
console.log(changed ? `${changed} file(s) updated.` : "Nothing changed.");
