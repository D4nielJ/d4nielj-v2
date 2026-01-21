"use client";

import { useEffect, useState } from "react";
import { GitHubRepo } from "@/storage/schema/github";
import { GitHubProjectCard } from "./github-project-card";
import { GitHubProjectsSkeleton } from "./github-projects-skeleton";
import { fetchAllGitHubRepos } from "@/lib/github";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/i18n/locale-provider";
import { uiLabels } from "@/i18n/labels";

const INITIAL_COUNT = 10;
const LOAD_MORE_COUNT = 6;

interface GitHubProjectsWithLoadMoreProps {
  title: string;
}

export function GitHubProjectsWithLoadMore({
  title,
}: GitHubProjectsWithLoadMoreProps) {
  const { locale } = useLocale();
  const labels = uiLabels[locale];
  const [allRepos, setAllRepos] = useState<GitHubRepo[]>([]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadRepos() {
      try {
        const data = await fetchAllGitHubRepos();
        setAllRepos(data);
      } catch (err) {
        console.error("Failed to fetch GitHub repos:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadRepos();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + LOAD_MORE_COUNT);
  };

  if (loading) {
    return <GitHubProjectsSkeleton />;
  }

  if (error || allRepos.length === 0) {
    return null;
  }

  const visibleRepos = allRepos.slice(0, visibleCount);
  const hasMore = visibleCount < allRepos.length;

  return (
    <section className="space-y-6">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {visibleRepos.map((repo) => (
          <GitHubProjectCard key={repo.id} repo={repo} />
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center pt-4">
          <Button
            variant="outline"
            onClick={handleLoadMore}
            className="cursor-pointer"
          >
            {labels.loadMore}
          </Button>
        </div>
      )}
    </section>
  );
}
