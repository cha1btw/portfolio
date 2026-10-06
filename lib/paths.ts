import type { Lang } from "@/content/types";

// English lives at the root, Ukrainian under /uk.
export function localePath(lang: Lang, path: "" | "/cv") {
  const prefix = lang === "uk" ? "/uk" : "";
  return prefix + path || "/";
}

export function otherLang(lang: Lang): Lang {
  return lang === "uk" ? "en" : "uk";
}
