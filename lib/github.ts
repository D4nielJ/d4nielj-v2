import { GitHubRepo, GitHubUser, GitHubStats } from "@/storage/schema/github";

const GITHUB_USERNAME = "d4nielj";
const GITHUB_API_BASE = "https://api.github.com";
const GITHUB_REPOS_URL = `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos`;
const GITHUB_USER_URL = `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`;

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
    `${GITHUB_REPOS_URL}?per_page=100&sort=updated`,
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

  const res = await fetch(`${GITHUB_REPOS_URL}?per_page=100&sort=updated`, {
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

/**
 * Fetches GitHub user profile information.
 */
export async function fetchGitHubUser(): Promise<GitHubUser | null> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const res = await fetch(GITHUB_USER_URL, { headers });

  if (!res.ok) {
    console.error("Failed to fetch GitHub user:", res.statusText);
    return null;
  }

  return res.json();
}

/**
 * Fetches aggregated GitHub statistics including user profile and repo stats.
 */
export async function fetchGitHubStats(): Promise<GitHubStats | null> {
  const [user, repos] = await Promise.all([
    fetchGitHubUser(),
    fetchAllGitHubRepos(),
  ]);

  if (!user) {
    return null;
  }

  // Calculate total stars and forks
  const totalStars = repos.reduce(
    (sum, repo) => sum + repo.stargazers_count,
    0,
  );
  const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);

  // Calculate top languages
  const languageCounts: Record<string, number> = {};
  repos.forEach((repo) => {
    if (
      repo.language &&
      !["html", "javascript", "scss"].includes(
        repo.language.trim().toLowerCase(),
      )
    ) {
      languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
    }
  });

  const topLanguages = Object.entries(languageCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Calculate account age in years
  const createdDate = new Date(user.created_at);
  const now = new Date();
  const accountAge = Math.floor(
    (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24 * 365),
  );

  return {
    user,
    totalStars,
    totalForks,
    topLanguages,
    accountAge,
  };
}
