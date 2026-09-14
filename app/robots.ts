import type { MetadataRoute } from "next";
import { site } from "@/data/site";

/** Generated at /robots.txt. Allows all crawlers and points them at the sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
