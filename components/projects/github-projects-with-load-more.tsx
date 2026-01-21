"use client";

import { useState } from "react";
import { GitHubRepo } from "@/storage/schema/github";
import { GitHubProjectCard } from "./github-project-card";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

const INITIAL_COUNT = 8;
const LOAD_MORE_COUNT = 6;

interface GitHubProjectsWithLoadMoreProps {
  title: string;
  allRepos?: GitHubRepo[];
}

export function GitHubProjectsWithLoadMore({
  title,
  allRepos,
}: GitHubProjectsWithLoadMoreProps) {
  const t = useTranslations("github");
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + LOAD_MORE_COUNT);
  };

  if (allRepos?.length === 0) {
    return null;
  }

  const visibleRepos = allRepos?.slice(0, visibleCount) ?? [];
  const hasMore = visibleCount < (allRepos?.length ?? 0);

  return (
    <section className="space-y-8">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
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
            {t("loadMore")}
          </Button>
        </div>
      )}
    </section>
  );
}
