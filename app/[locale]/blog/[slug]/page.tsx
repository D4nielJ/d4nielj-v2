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

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
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
