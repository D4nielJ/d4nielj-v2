import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { getPostBySlug } from "@/storage/data/posts";
import { resolveBlogPost } from "@/storage/schema/blog";
import { PostView } from "@/components/blog";
import BaseGrid, {
  LeftGridColumn,
  MainGridColumn,
  RightGridColumn,
} from "@/components/ui/base-grid";
import { Locale } from "@/storage/schema/cv";
import { cvData } from "@/storage/data/cv";
import type { Metadata } from "next";
import siteOptions from "@/lib/siteOptions";

interface BlogPostPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

const BASE_URL = siteOptions.BASE_URL;
const authorName = cvData.profile.name;

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const validLocale = locale as Locale;
  const resolvedPost = resolveBlogPost(post, validLocale);

  return {
    title: resolvedPost.title,
    description: resolvedPost.abstract,
    authors: [{ name: authorName }],
    alternates: {
      canonical: `${BASE_URL}/${locale}/blog/${slug}`,
      languages: {
        en: `${BASE_URL}/en/blog/${slug}`,
        es: `${BASE_URL}/es/blog/${slug}`,
      },
    },
    openGraph: {
      title: resolvedPost.title,
      description: resolvedPost.abstract,
      type: "article",
      publishedTime: resolvedPost.publishedAt,
      authors: [authorName],
      locale: locale === "es" ? "es_ES" : "en_US",
      url: `${BASE_URL}/${locale}/blog/${slug}`,
      images: resolvedPost.figures?.[0]?.src
        ? [
            {
              url: `${BASE_URL}${resolvedPost.figures[0].src}`,
              alt: resolvedPost.figures[0].alt,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedPost.title,
      description: resolvedPost.abstract,
      images: resolvedPost.figures?.[0]?.src
        ? [`${BASE_URL}${resolvedPost.figures[0].src}`]
        : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const locale = await getLocale();
  const validLocale = locale as Locale;

  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const resolvedPost = resolveBlogPost(post, validLocale);

  // BlogPosting JSON-LD structured data
  const jsonLd = {
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BaseGrid>
        <LeftGridColumn />
        <MainGridColumn>
          <PostView post={resolvedPost} />
        </MainGridColumn>
        <RightGridColumn />
      </BaseGrid>
    </>
  );
}
