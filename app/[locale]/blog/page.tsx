import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { postsData } from "@/storage/data/posts";
import { resolveBlogPost } from "@/storage/schema/blog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BaseGrid, {
  LeftGridColumn,
  MainGridColumn,
  RightGridColumn,
} from "@/components/ui/base-grid";
import { Locale } from "@/storage/schema/cv";

export default async function BlogPage() {
  const locale = await getLocale();
  const validLocale = locale as Locale;
  const t = await getTranslations("nav");

  const posts = postsData.map((post) => resolveBlogPost(post, validLocale));

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(locale === "es" ? "es-ES" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <BaseGrid>
      <LeftGridColumn />
      <MainGridColumn>
        <main className="w-full py-8 space-y-8">
          <header>
            <h1 className="text-2xl font-bold tracking-tight">{t("blog")}</h1>
          </header>

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
                    <p className="text-muted-foreground text-sm line-clamp-3">
                      {post.abstract}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {post.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </main>
      </MainGridColumn>
      <RightGridColumn />
    </BaseGrid>
  );
}
