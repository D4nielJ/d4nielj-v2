import { GitHubRepo } from "@/storage/schema/github";

const GITHUB_USERNAME = "d4nielj";
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

export interface FetchGitHubReposOptions {
  /** Number of repos to return (default: 6) */
  count?: number;
  /** Whether to use server-side caching (only works in Server Components) */
  revalidate?: number;
}

/**
 * Fetches GitHub repositories for the configured user.
 * Returns repos sorted by stars in descending order.
 */
export async function fetchGitHubRepos(
  options: FetchGitHubReposOptions = {},
): Promise<GitHubRepo[]> {
  const { count = 6, revalidate = 3600 } = options;

  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };

  // Use token if available to avoid rate limiting
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const fetchOptions: RequestInit = {
    headers,
  };

  // Add Next.js caching options for server-side fetching
  if (typeof window === "undefined") {
    (fetchOptions as RequestInit & { next?: { revalidate: number } }).next = {
      revalidate,
    };
  }

  const res = await fetch(
    `${GITHUB_API_URL}?per_page=100&sort=updated`,
    fetchOptions,
  );

  if (!res.ok) {
    console.error("Failed to fetch GitHub repos:", res.statusText);
    return [];
  }

  const repos: GitHubRepo[] = await res.json();

  // Sort by stars (descending), exclude dotfiles, and limit
  return repos
    .filter((repo) => !repo.name.startsWith("."))
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, count);
}

/**
 * Fetches all GitHub repositories (for load more functionality).
 * Returns all repos sorted by stars in descending order.
 */
export async function fetchAllGitHubRepos(): Promise<GitHubRepo[]> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const res = await fetch(`${GITHUB_API_URL}?per_page=100&sort=updated`, {
    headers,
  });

  if (!res.ok) {
    console.error("Failed to fetch GitHub repos:", res.statusText);
    return [];
  }

  const repos: GitHubRepo[] = await res.json();

  return repos
    .filter((repo) => !repo.name.startsWith("."))
    .sort((a, b) => b.stargazers_count - a.stargazers_count);
}
