import React from "react";
import { postsData } from "../../storage/data/posts";
import { resolveBlogPost } from "../../storage/schema/blog";
import type { Locale } from "../../storage/schema/cv";

export default function RecentPosts({ locale = "en" as Locale }: { locale?: Locale }) {
  const recent = postsData
    .slice()
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .slice(0, 3)
    .map((p) => resolveBlogPost(p, locale));

  return (
    <aside>
      <h3>Recent posts</h3>
      <ul>
        {recent.map((p) => (
          <li key={p.slug}>
            <a href={`/blog/${p.slug}`}>{p.title}</a>
            <div className="text-xs text-muted">{new Date(p.publishedAt).toLocaleDateString()}</div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
