"use client";

import Link from "next/link";
import { useLocale } from "@/i18n/locale-provider";
import { uiLabels } from "@/i18n/labels";
import { postsData } from "@/cv/data/posts";
import { resolveBlogPost } from "@/cv/schema/blog";
import { cvData } from "@/cv/data/cv";
import { getCVByRole } from "@/lib/getCVByRole";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function HomePage() {
  const { locale } = useLocale();
  const labels = uiLabels[locale];

  // Resolve profile for general intro
  const profile = getCVByRole(cvData, locale, "fullstack").profile;

  // Resolve posts
  const posts = postsData.map((post) => resolveBlogPost(post, locale));

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(locale === "es" ? "es-ES" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <main className="container mx-auto max-w-3xl px-4 py-8 space-y-12">
      {/* Hero / Introduction */}
      <section className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{profile.name}</h1>
          <p className="text-muted-foreground text-lg">{profile.title}</p>
        </div>
        <p className="leading-relaxed">{profile.summary}</p>
        <div className="flex gap-4 pt-2">
          <Link
            href="/cv"
            className="text-primary text-sm underline-offset-4 hover:underline"
          >
            {labels.cv} →
          </Link>
          <Link
            href="/blog"
            className="text-primary text-sm underline-offset-4 hover:underline"
          >
            {labels.blog} →
          </Link>
        </div>
      </section>

      <Separator />

      {/* Recent Posts */}
      <section className="space-y-6">
        <h2 className="text-lg font-semibold tracking-tight">
          {labels.recentPosts}
        </h2>
        <div className="space-y-4">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="transition-colors cursor-pointer hover:bg-muted/50">
                <CardHeader className="pb-2">
                  <div className="text-muted-foreground flex items-center gap-2 mb-1 text-xs">
                    <time dateTime={post.publishedAt}>
                      {formatDate(post.publishedAt)}
                    </time>
                  </div>
                  <CardTitle className="text-base">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {post.abstract}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
