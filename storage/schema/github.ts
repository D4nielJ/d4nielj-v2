/**
 * Represents a GitHub repository as returned by the GitHub API.
 * Only includes fields relevant for displaying project information.
 */
export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  clone_url: string;
  ssh_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  homepage: string | null;
}

/**
 * Represents a GitHub user profile as returned by the GitHub API.
 */
export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string;
  location: string | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

/**
 * Aggregated GitHub statistics for display.
 */
export interface GitHubStats {
  user: GitHubUser;
  totalStars: number;
  totalForks: number;
  topLanguages: { name: string; count: number }[];
  accountAge: number; // Years on GitHub
}
