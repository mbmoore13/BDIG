import type { MetadataRoute } from "next";
import { navLinks, site } from "@/data/site";

/**
 * Generated at /sitemap.xml. Lists every page so search engines can find them
 * all without having to discover them by following links.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return navLinks.map((link) => ({
    url: new URL(link.href, site.url).toString(),
    lastModified,
    priority: link.href === "/" ? 1 : 0.8,
  }));
}
