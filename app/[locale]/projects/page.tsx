import { getTranslations } from "next-intl/server";
import {
  GitHubProjectsSkeleton,
  GitHubProjectsWithLoadMore,
} from "@/components/projects";
import BaseGrid, {
  LeftGridColumn,
  MainGridColumn,
  RightGridColumn,
} from "@/components/ui/base-grid";
import { fetchAllGitHubRepos } from "@/lib/github";
import { Suspense } from "react";

export default async function ProjectsPage() {
  const t = await getTranslations("github");
  const repos = await fetchAllGitHubRepos();

  return (
    <BaseGrid>
      <LeftGridColumn />
      <MainGridColumn>
        <main className="w-full py-8">
          <Suspense fallback={<GitHubProjectsSkeleton />}>
            <GitHubProjectsWithLoadMore
              title={t("projects")}
              allRepos={repos}
            />
          </Suspense>
        </main>
      </MainGridColumn>
      <RightGridColumn />
    </BaseGrid>
  );
}
