"use client";

import { useEffect, useState } from "react";
import { GitHubRepo } from "@/storage/schema/github";
import { GitHubProjectCard } from "./github-project-card";
import { GitHubProjectsSkeleton } from "./github-projects-skeleton";
import { fetchGitHubRepos } from "@/lib/github";

interface GitHubProjectsClientProps {
  title: string;
}

export function GitHubProjectsClient({ title }: GitHubProjectsClientProps) {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadRepos() {
      try {
        const data = await fetchGitHubRepos({ count: 6 });
        setRepos(data);
      } catch (err) {
        console.error("Failed to fetch GitHub repos:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadRepos();
  }, []);

  if (loading) {
    return <GitHubProjectsSkeleton />;
  }

  if (error || repos.length === 0) {
    return null;
  }

  return (
    <section className="space-y-6">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {repos.map((repo) => (
          <GitHubProjectCard key={repo.id} repo={repo} />
        ))}
      </div>
    </section>
  );
}
