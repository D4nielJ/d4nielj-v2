"use client";

import { notFound } from "next/navigation";
import { use } from "react";
import { useLocale } from "@/i18n/locale-provider";
import { getPostBySlug } from "@/cv/data/posts";
import { resolveBlogPost } from "@/cv/schema/blog";
import { PostView } from "@/components/blog";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = use(params);
  const { locale } = useLocale();

  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const resolvedPost = resolveBlogPost(post, locale);

  return <PostView post={resolvedPost} />;
}
