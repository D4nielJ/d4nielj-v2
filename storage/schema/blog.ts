import { LocalizedString, Locale } from "./cv";

export interface BlogFigure {
  id: string;
  src: string;
  alt: LocalizedString;
  caption: LocalizedString;
}

export interface BlogSection {
  type: "paragraph" | "heading" | "figure" | "list" | "block-code";
  content?: LocalizedString;
  language?: string; // For block-code
  level?: 2 | 3; // For headings
  figureId?: string; // Reference to a figure
  items?: LocalizedString[]; // For lists
}

export interface BlogPost {
  slug: string;
  title: LocalizedString;
  abstract: LocalizedString;
  publishedAt: string; // ISO date string
  tags: string[];
  figures: BlogFigure[];
  sections: BlogSection[];
}

export interface ResolvedBlogFigure {
  id: string;
  src: string;
  alt: string;
  caption: string;
}

export interface ResolvedBlogSection {
  type: "paragraph" | "heading" | "figure" | "list" | "block-code";
  content?: string;
  language?: string; // For block-code
  level?: 2 | 3;
  figureId?: string;
  items?: string[];
}

export interface ResolvedBlogPost {
  slug: string;
  title: string;
  abstract: string;
  publishedAt: string;
  tags: string[];
  figures: ResolvedBlogFigure[];
  sections: ResolvedBlogSection[];
}

const DEFAULT_LOCALE: Locale = "en";

function resolveString(localized: LocalizedString, locale: Locale): string {
  return localized[locale] ?? localized[DEFAULT_LOCALE] ?? "";
}

export function resolveBlogPost(
  post: BlogPost,
  locale: Locale,
): ResolvedBlogPost {
  return {
    slug: post.slug,
    title: resolveString(post.title, locale),
    abstract: resolveString(post.abstract, locale),
    publishedAt: post.publishedAt,
    tags: post.tags,
    figures: post.figures.map((fig) => ({
      id: fig.id,
      src: fig.src,
      alt: resolveString(fig.alt, locale),
      caption: resolveString(fig.caption, locale),
    })),
    sections: post.sections.map((section) => ({
      type: section.type,
      content: section.content
        ? resolveString(section.content, locale)
        : undefined,
      language: section.language,
      level: section.level,
      figureId: section.figureId,
      items: section.items?.map((item) => resolveString(item, locale)),
    })),
  };
}
