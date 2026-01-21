"use client";

import { notFound } from "next/navigation";
import { use } from "react";
import { useLocale } from "@/i18n/locale-provider";
import { getPostBySlug } from "@/storage/data/posts";
import { resolveBlogPost } from "@/storage/schema/blog";
import { PostView } from "@/components/blog";
import BaseGrid, {
  LeftGridColumn,
  MainGridColumn,
  RightGridColumn,
} from "@/components/ui/base-grid";

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

  return (
    <BaseGrid>
      <LeftGridColumn />
      <MainGridColumn>
        <PostView post={resolvedPost} />
      </MainGridColumn>
      <RightGridColumn />
    </BaseGrid>
  );
}
