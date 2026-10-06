import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { Dict, Lang } from "@/content/types";
import { themeScript } from "@/lib/theme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

// Mono is only used for small labels below the fold, so it is not preloaded.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  preload: false,
});

export const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f7f6" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0b" },
  ],
};

// Home and CV of each language point at their twin in the other language.
const paths = {
  home: { en: "/", uk: "/uk" },
  cv: { en: "/cv", uk: "/uk/cv" },
} as const;

export function buildMetadata(dict: Dict, page: keyof typeof paths): Metadata {
  const title = page === "home" ? dict.meta.title : dict.meta.cvTitle;
  const description = page === "home" ? dict.meta.description : dict.meta.cvDescription;
  const path = paths[page][dict.lang];

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: path,
      languages: { en: paths[page].en, uk: paths[page].uk, "x-default": paths[page].en },
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: dict.name,
      locale: dict.lang === "uk" ? "uk_UA" : "en_US",
      type: "website",
    },
  };
}

export function RootShell({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    // The theme script sets data-theme before React hydrates, hence suppressHydrationWarning.
    <html lang={lang} className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
      {/* App Router pattern from the "Preventing flash before hydration" guide; the lint rule targets pages/. */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        {/* text/plain on the client stops React's dev warning about rendering scripts; the server copy runs. */}
        <script
          type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
