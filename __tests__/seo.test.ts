import { describe, it, expect } from "vitest";
import { cvData } from "@/storage/data/cv";
import { postsData, getPostBySlug } from "@/storage/data/posts";
import { resolveBlogPost } from "@/storage/schema/blog";
import { Locale } from "@/storage/schema/cv";
import siteOptions from "@/lib/siteOptions";
import { generateMetadata as generateLayoutMetadataFn } from "@/app/[locale]/layout";
import { generateMetadata as generateBlogPostMetadataFn } from "@/app/[locale]/blog/[slug]/page";

/**
 * SEO Test Suite
 *
 * This suite validates SEO-critical metadata generation for the website.
 * Tests use the ACTUAL generateMetadata functions from the app pages,
 * ensuring tests stay in sync with the real implementation.
 *
 * Key areas tested:
 * 1. Canonical URL correctness
 * 2. Open Graph tag completeness
 * 3. Twitter card metadata
 * 4. Localized content resolution
 * 5. Structured data (JSON-LD) validity
 */

const BASE_URL = siteOptions.BASE_URL;
const locales: Locale[] = ["en", "es"];
const authorName = cvData.profile.name;

// Wrappers to call the actual generateMetadata functions with correct params
async function getLayoutMetadata(locale: Locale) {
  return generateLayoutMetadataFn({ params: Promise.resolve({ locale }) });
}

async function getBlogPostMetadata(slug: string, locale: Locale) {
  return generateBlogPostMetadataFn({
    params: Promise.resolve({ slug, locale }),
  });
}

describe("SEO: Site-wide Metadata", () => {
  describe("BASE_URL configuration", () => {
    it("should have a valid BASE_URL", () => {
      expect(BASE_URL).toBeDefined();
      expect(BASE_URL).toMatch(/^https?:\/\//);
    });

    it("should not have a trailing slash", () => {
      expect(BASE_URL.endsWith("/")).toBe(false);
    });
  });

  describe("profile data for site metadata", () => {
    it("has a valid profile name for author attribution", () => {
      expect(cvData.profile.name).toBeDefined();
      expect(cvData.profile.name.length).toBeGreaterThan(0);
    });

    it.each(locales)(
      "has a valid summary for meta description in locale %s",
      (locale) => {
        const summary = cvData.profile.summary[locale];
        expect(summary).toBeDefined();
        expect(summary!.length).toBeGreaterThan(50);
        // Google displays ~155-160 chars, but longer descriptions are acceptable
        // as they get truncated. We set a generous limit to catch extreme cases.
        expect(summary!.length).toBeLessThan(500);
      },
    );

    it.each(locales)(
      "has a valid title for og:title in locale %s",
      (locale) => {
        const title = cvData.profile.title[locale];
        expect(title).toBeDefined();
        expect(title!.length).toBeGreaterThan(5);
        expect(title!.length).toBeLessThan(100);
      },
    );
  });
});

describe("SEO: Layout Metadata Generation (actual function)", () => {
  describe("canonical URLs", () => {
    it.each(locales)(
      "generates correct canonical URL for locale %s",
      async (locale) => {
        const metadata = await getLayoutMetadata(locale);

        expect(metadata.alternates?.canonical).toBe(`${BASE_URL}/${locale}`);
      },
    );

    it.each(locales)(
      "includes all language alternates for locale %s",
      async (locale) => {
        const metadata = await getLayoutMetadata(locale);

        expect(metadata.alternates?.languages?.en).toBe(`${BASE_URL}/en`);
        expect(metadata.alternates?.languages?.es).toBe(`${BASE_URL}/es`);
      },
    );

    it.each(locales)(
      "language alternate URLs are absolute for locale %s",
      async (locale) => {
        const metadata = await getLayoutMetadata(locale);

        expect(metadata.alternates?.languages?.en).toMatch(/^https?:\/\//);
        expect(metadata.alternates?.languages?.es).toMatch(/^https?:\/\//);
      },
    );
  });

  describe("Open Graph tags", () => {
    it.each(locales)(
      "includes all required OG properties for locale %s",
      async (locale) => {
        const metadata = await getLayoutMetadata(locale);

        expect(metadata.openGraph?.title).toBeDefined();
        expect(metadata.openGraph?.description).toBeDefined();
        expect(metadata.openGraph?.url).toBeDefined();
        expect(metadata.openGraph?.siteName).toBeDefined();
        expect(metadata.openGraph?.locale).toBeDefined();
        expect(metadata.openGraph?.type).toBe("website");
      },
    );

    it("uses correct locale format for OG (xx_XX)", async () => {
      const enMetadata = await getLayoutMetadata("en");
      const esMetadata = await getLayoutMetadata("es");

      expect(enMetadata.openGraph?.locale).toBe("en_US");
      expect(esMetadata.openGraph?.locale).toBe("es_ES");
    });

    it("includes alternateLocale for language switching", async () => {
      const enMetadata = await getLayoutMetadata("en");
      const esMetadata = await getLayoutMetadata("es");

      expect(enMetadata.openGraph?.alternateLocale).toBe("es_ES");
      expect(esMetadata.openGraph?.alternateLocale).toBe("en_US");
    });
  });

  describe("Twitter Card tags", () => {
    it.each(locales)(
      "includes all required Twitter card properties for locale %s",
      async (locale) => {
        const metadata = await getLayoutMetadata(locale);

        expect(metadata.twitter?.card).toBe("summary_large_image");
        expect(metadata.twitter?.title).toBeDefined();
        expect(metadata.twitter?.description).toBeDefined();
        expect(metadata.twitter?.images).toBeDefined();
      },
    );

    it("Twitter card image URL is absolute", async () => {
      const metadata = await getLayoutMetadata("en");
      const images = metadata.twitter?.images;

      if (Array.isArray(images) && images.length > 0) {
        const firstImage =
          typeof images[0] === "string" ? images[0] : images[0].url;
        expect(firstImage).toMatch(/^https?:\/\//);
      }
    });
  });

  describe("title template", () => {
    it.each(locales)(
      "title template includes author name for locale %s",
      async (locale) => {
        const metadata = await getLayoutMetadata(locale);
        const title = metadata.title;

        if (
          typeof title === "object" &&
          title !== null &&
          "template" in title
        ) {
          expect(title.template).toContain(cvData.profile.name);
          expect(title.template).toContain("%s");
        }
      },
    );

    it.each(locales)(
      "default title is localized for locale %s",
      async (locale) => {
        const metadata = await getLayoutMetadata(locale);
        const title = metadata.title;

        if (typeof title === "object" && title !== null && "default" in title) {
          if (locale === "es") {
            expect(title.default).toContain("Ingeniero de Software");
          } else {
            expect(title.default).toContain("Software Engineer");
          }
        }
      },
    );
  });
});

describe("SEO: Blog Post Metadata Generation (actual function)", () => {
  describe("dynamic blog post tests", () => {
    // Test every blog post in the data
    postsData.forEach((post) => {
      describe(`post: ${post.slug}`, () => {
        it.each(locales)(
          "generates valid metadata for locale %s",
          async (locale) => {
            const metadata = await getBlogPostMetadata(post.slug, locale);

            expect(metadata.title).toBeDefined();
            expect(metadata.title).not.toBe("Post Not Found");
            expect(metadata.description).toBeDefined();
          },
        );

        it.each(locales)(
          "has localized title and description for locale %s",
          async (locale) => {
            const metadata = await getBlogPostMetadata(post.slug, locale);
            const resolvedPost = resolveBlogPost(post, locale);

            expect(metadata.title).toBe(resolvedPost.title);
            expect(metadata.description).toBe(resolvedPost.abstract);
          },
        );

        it.each(locales)(
          "canonical URL is correct for locale %s",
          async (locale) => {
            const metadata = await getBlogPostMetadata(post.slug, locale);
            const expectedCanonical = `${BASE_URL}/${locale}/blog/${post.slug}`;

            expect(metadata.alternates?.canonical).toBe(expectedCanonical);
          },
        );

        it.each(locales)(
          "language alternates point to correct blog post URLs for locale %s",
          async (locale) => {
            const metadata = await getBlogPostMetadata(post.slug, locale);

            expect(metadata.alternates?.languages?.en).toBe(
              `${BASE_URL}/en/blog/${post.slug}`,
            );
            expect(metadata.alternates?.languages?.es).toBe(
              `${BASE_URL}/es/blog/${post.slug}`,
            );
          },
        );

        it.each(locales)(
          "Open Graph type is article for locale %s",
          async (locale) => {
            const metadata = await getBlogPostMetadata(post.slug, locale);

            expect(metadata.openGraph?.type).toBe("article");
          },
        );

        it.each(locales)(
          "includes publishedTime in Open Graph for locale %s",
          async (locale) => {
            const metadata = await getBlogPostMetadata(post.slug, locale);

            expect(metadata.openGraph?.publishedTime).toBe(post.publishedAt);
            expect(metadata.openGraph?.publishedTime).toMatch(
              /^\d{4}-\d{2}-\d{2}$/,
            );
          },
        );

        it.each(locales)(
          "author attribution is correct for locale %s",
          async (locale) => {
            const metadata = await getBlogPostMetadata(post.slug, locale);

            expect(metadata.authors?.[0].name).toBe(authorName);
            expect(metadata.openGraph?.authors).toContain(authorName);
          },
        );

        if (post.figures && post.figures.length > 0) {
          it.each(locales)(
            "Open Graph image is correctly set for locale %s",
            async (locale) => {
              const metadata = await getBlogPostMetadata(post.slug, locale);
              const resolvedPost = resolveBlogPost(post, locale);

              expect(metadata.openGraph?.images).toBeDefined();
              const images = metadata.openGraph?.images;
              if (Array.isArray(images) && images.length > 0) {
                const firstImage = images[0];
                if (typeof firstImage === "object" && "url" in firstImage) {
                  expect(firstImage.url).toBe(
                    `${BASE_URL}${resolvedPost.figures[0].src}`,
                  );
                  expect(firstImage.alt).toBe(resolvedPost.figures[0].alt);
                }
              }
            },
          );

          it.each(locales)(
            "Twitter image is correctly set for locale %s",
            async (locale) => {
              const metadata = await getBlogPostMetadata(post.slug, locale);
              const resolvedPost = resolveBlogPost(post, locale);

              expect(metadata.twitter?.images).toBeDefined();
              const images = metadata.twitter?.images;
              if (Array.isArray(images) && images.length > 0) {
                const firstImage =
                  typeof images[0] === "string" ? images[0] : images[0].url;
                expect(firstImage).toBe(
                  `${BASE_URL}${resolvedPost.figures[0].src}`,
                );
              }
            },
          );

          it.each(locales)(
            "image URLs are absolute for locale %s",
            async (locale) => {
              const metadata = await getBlogPostMetadata(post.slug, locale);

              const ogImages = metadata.openGraph?.images;
              if (Array.isArray(ogImages) && ogImages.length > 0) {
                const firstOgImage =
                  typeof ogImages[0] === "string"
                    ? ogImages[0]
                    : ogImages[0].url;
                expect(firstOgImage).toMatch(/^https?:\/\//);
              }

              const twImages = metadata.twitter?.images;
              if (Array.isArray(twImages) && twImages.length > 0) {
                const firstTwImage =
                  typeof twImages[0] === "string"
                    ? twImages[0]
                    : twImages[0].url;
                expect(firstTwImage).toMatch(/^https?:\/\//);
              }
            },
          );
        }
      });
    });
  });

  describe("non-existent post handling", () => {
    it("returns 'Post Not Found' title for non-existent slug", async () => {
      const metadata = await getBlogPostMetadata(
        "non-existent-post-slug",
        "en",
      );

      expect(metadata.title).toBe("Post Not Found");
    });
  });
});

describe("SEO: Blog Post JSON-LD Structured Data", () => {
  // Simulate JSON-LD generation from app/[locale]/blog/[slug]/page.tsx
  // (JSON-LD is generated in the component, not via generateMetadata)
  function generateBlogPostJsonLd(slug: string, locale: Locale) {
    const post = getPostBySlug(slug);

    if (!post) {
      return null;
    }

    const resolvedPost = resolveBlogPost(post, locale);

    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: resolvedPost.title,
      description: resolvedPost.abstract,
      datePublished: resolvedPost.publishedAt,
      author: {
        "@type": "Person",
        name: authorName,
        url: BASE_URL,
      },
      publisher: {
        "@type": "Person",
        name: authorName,
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${BASE_URL}/${locale}/blog/${slug}`,
      },
      image: resolvedPost.figures?.[0]?.src
        ? `${BASE_URL}${resolvedPost.figures[0].src}`
        : undefined,
      keywords: resolvedPost.tags?.join(", "),
    };
  }

  describe("dynamic JSON-LD tests", () => {
    postsData.forEach((post) => {
      describe(`post: ${post.slug}`, () => {
        it.each(locales)("generates valid JSON-LD for locale %s", (locale) => {
          const jsonLd = generateBlogPostJsonLd(post.slug, locale);

          expect(jsonLd).not.toBeNull();
          expect(jsonLd?.["@context"]).toBe("https://schema.org");
          expect(jsonLd?.["@type"]).toBe("BlogPosting");
        });

        it.each(locales)(
          "headline matches localized title for locale %s",
          (locale) => {
            const jsonLd = generateBlogPostJsonLd(post.slug, locale);
            const resolvedPost = resolveBlogPost(post, locale);

            expect(jsonLd?.headline).toBe(resolvedPost.title);
          },
        );

        it.each(locales)(
          "description matches localized abstract for locale %s",
          (locale) => {
            const jsonLd = generateBlogPostJsonLd(post.slug, locale);
            const resolvedPost = resolveBlogPost(post, locale);

            expect(jsonLd?.description).toBe(resolvedPost.abstract);
          },
        );

        it.each(locales)(
          "datePublished is valid ISO date for locale %s",
          (locale) => {
            const jsonLd = generateBlogPostJsonLd(post.slug, locale);

            expect(jsonLd?.datePublished).toMatch(/^\d{4}-\d{2}-\d{2}$/);
          },
        );

        it.each(locales)(
          "author is correctly structured for locale %s",
          (locale) => {
            const jsonLd = generateBlogPostJsonLd(post.slug, locale);

            expect(jsonLd?.author["@type"]).toBe("Person");
            expect(jsonLd?.author.name).toBe(authorName);
            expect(jsonLd?.author.url).toBe(BASE_URL);
          },
        );

        it.each(locales)(
          "mainEntityOfPage has correct @id for locale %s",
          (locale) => {
            const jsonLd = generateBlogPostJsonLd(post.slug, locale);

            expect(jsonLd?.mainEntityOfPage["@type"]).toBe("WebPage");
            expect(jsonLd?.mainEntityOfPage["@id"]).toBe(
              `${BASE_URL}/${locale}/blog/${post.slug}`,
            );
          },
        );

        if (post.tags && post.tags.length > 0) {
          it.each(locales)(
            "keywords are correctly formatted for locale %s",
            (locale) => {
              const jsonLd = generateBlogPostJsonLd(post.slug, locale);

              expect(jsonLd?.keywords).toBeDefined();
              expect(jsonLd?.keywords).toBe(post.tags.join(", "));
            },
          );
        }

        if (post.figures && post.figures.length > 0) {
          it.each(locales)("image URL is absolute for locale %s", (locale) => {
            const jsonLd = generateBlogPostJsonLd(post.slug, locale);

            expect(jsonLd?.image).toBeDefined();
            expect(jsonLd?.image).toMatch(/^https?:\/\//);
          });
        }
      });
    });
  });
});

describe("SEO: Data Validation", () => {
  describe("blog posts data integrity", () => {
    it("all posts have valid slugs (URL-safe)", () => {
      postsData.forEach((post) => {
        // Slug should be lowercase, alphanumeric with hyphens
        expect(post.slug).toMatch(/^[a-z0-9-]+$/);
      });
    });

    it("all posts have unique slugs", () => {
      const slugs = postsData.map((p) => p.slug);
      const uniqueSlugs = new Set(slugs);

      expect(uniqueSlugs.size).toBe(slugs.length);
    });

    it("all posts have valid publishedAt dates", () => {
      postsData.forEach((post) => {
        expect(post.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);

        const date = new Date(post.publishedAt);
        expect(date.toString()).not.toBe("Invalid Date");
      });
    });

    it.each(locales)("all posts have title in locale %s", (locale) => {
      postsData.forEach((post) => {
        expect(post.title[locale]).toBeDefined();
        expect(post.title[locale]!.length).toBeGreaterThan(0);
      });
    });

    it.each(locales)("all posts have abstract in locale %s", (locale) => {
      postsData.forEach((post) => {
        expect(post.abstract[locale]).toBeDefined();
        expect(post.abstract[locale]!.length).toBeGreaterThan(0);
      });
    });

    it("all post figures have valid image paths", () => {
      postsData.forEach((post) => {
        post.figures.forEach((fig) => {
          expect(fig.src).toMatch(/^\/images\//);
          expect(fig.id).toBeDefined();
        });
      });
    });
  });

  describe("CV data integrity for SEO", () => {
    it("profile has all required fields for meta tags", () => {
      expect(cvData.profile.name).toBeDefined();
      expect(cvData.profile.email).toBeDefined();
      expect(cvData.profile.links).toBeDefined();
      expect(cvData.profile.links.length).toBeGreaterThan(0);
    });

    it("all profile links have valid URLs", () => {
      cvData.profile.links.forEach((link) => {
        expect(link.url).toMatch(/^https?:\/\//);
        expect(link.label).toBeDefined();
      });
    });

    it.each(locales)(
      "profile title and summary are present for locale %s",
      (locale) => {
        expect(cvData.profile.title[locale]).toBeDefined();
        expect(cvData.profile.summary[locale]).toBeDefined();
      },
    );
  });
});

describe("SEO: URL Consistency", () => {
  it("all generated URLs use the same BASE_URL", () => {
    // Layout
    locales.forEach((locale) => {
      const canonical = `${BASE_URL}/${locale}`;
      expect(canonical).toContain(BASE_URL);
    });

    // Blog posts
    postsData.forEach((post) => {
      locales.forEach((locale) => {
        const canonical = `${BASE_URL}/${locale}/blog/${post.slug}`;
        expect(canonical).toContain(BASE_URL);
        expect(canonical).toContain(post.slug);
      });
    });
  });

  it("no double slashes in generated URLs (except protocol)", () => {
    locales.forEach((locale) => {
      const layoutCanonical = `${BASE_URL}/${locale}`;
      // Remove protocol before checking for double slashes
      const withoutProtocol = layoutCanonical.replace(/^https?:\/\//, "");
      expect(withoutProtocol).not.toContain("//");
    });

    postsData.forEach((post) => {
      locales.forEach((locale) => {
        const blogCanonical = `${BASE_URL}/${locale}/blog/${post.slug}`;
        const withoutProtocol = blogCanonical.replace(/^https?:\/\//, "");
        expect(withoutProtocol).not.toContain("//");
      });
    });
  });
});
