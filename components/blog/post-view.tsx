"use client";

import { ResolvedBlogPost } from "@/cv/schema/blog";
import { Figure } from "./figure";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface PostViewProps {
  post: ResolvedBlogPost;
}

export function PostView({ post }: PostViewProps) {
  // Build a map of figureId to figure number for cross-referencing
  const figureNumberMap = new Map<string, number>();
  post.figures.forEach((fig, idx) => {
    figureNumberMap.set(fig.id, idx + 1);
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <article className="container mx-auto px-4 py-8 max-w-3xl">
      {/* Header */}
      <header className="space-y-4 mb-8">
        <h1 className="text-2xl font-bold tracking-tight leading-tight">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <time dateTime={post.publishedAt}>
            {formatDate(post.publishedAt)}
          </time>
          <Separator orientation="vertical" className="h-4" />
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </header>

      {/* Abstract */}
      <p className="text-muted-foreground italic border-l-2 pl-4 mb-8">
        {post.abstract}
      </p>

      <Separator className="mb-8" />

      {/* Content */}
      <div className="space-y-6">
        {post.sections.map((section, idx) => {
          switch (section.type) {
            case "paragraph":
              return (
                <p key={idx} className="leading-relaxed">
                  {section.content}
                </p>
              );
            case "heading":
              if (section.level === 2) {
                return (
                  <h2
                    key={idx}
                    className="text-lg font-semibold mt-8 mb-4 tracking-tight"
                  >
                    {section.content}
                  </h2>
                );
              }
              return (
                <h3
                  key={idx}
                  className="text-base font-semibold mt-6 mb-3 tracking-tight"
                >
                  {section.content}
                </h3>
              );
            case "figure":
              const figure = post.figures.find(
                (f) => f.id === section.figureId,
              );
              if (!figure) return null;
              const figureNumber = figureNumberMap.get(figure.id) ?? 0;
              return <Figure key={idx} figure={figure} number={figureNumber} />;
            case "list":
              return (
                <ul key={idx} className="list-disc list-inside space-y-2 pl-4">
                  {section.items?.map((item, i) => (
                    <li key={i} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              );
            default:
              return null;
          }
        })}
      </div>
    </article>
  );
}
