import { BlogPost } from "../schema/blog";
import { post1 } from "./posts/post-1";
import { post2 } from "./posts/post-2";

export const postsData: BlogPost[] = [post2, post1];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return postsData.find((post) => post.slug === slug);
}
