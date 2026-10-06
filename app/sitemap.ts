import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/layout";

// English is the default at the root, Ukrainian lives under /uk.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/`, alternates: { languages: { uk: `${siteUrl}/uk` } } },
    { url: `${siteUrl}/cv`, alternates: { languages: { uk: `${siteUrl}/uk/cv` } } },
  ];
}
