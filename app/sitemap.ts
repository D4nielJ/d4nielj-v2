import { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { postsData } from "@/storage/data/posts";
import siteOptions from "@/lib/siteOptions";

const BASE_URL = siteOptions.BASE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = routing.locales;

  // Static routes
  const staticRoutes = ["", "/about", "/blog", "/projects"];

  const staticEntries = locales.flatMap((locale) =>
    staticRoutes.map((route) => ({
      url: `${BASE_URL}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency:
        route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : route === "/about" ? 0.9 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${BASE_URL}/${l}${route}`]),
        ),
      },
    })),
  );

  // Blog post entries
  const blogEntries = locales.flatMap((locale) =>
    postsData.map((post) => ({
      url: `${BASE_URL}/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${BASE_URL}/${l}/blog/${post.slug}`]),
        ),
      },
    })),
  );

  return [...staticEntries, ...blogEntries];
}
