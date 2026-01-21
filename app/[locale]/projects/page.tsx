import { getTranslations } from "next-intl/server";
import { GitHubProjectsWithLoadMore } from "@/components/projects";
import BaseGrid, {
  LeftGridColumn,
  MainGridColumn,
  RightGridColumn,
} from "@/components/ui/base-grid";

export default async function ProjectsPage() {
  const t = await getTranslations("github");

  return (
    <BaseGrid>
      <LeftGridColumn />
      <MainGridColumn>
        <main className="w-full py-8">
          <GitHubProjectsWithLoadMore title={t("projects")} />
        </main>
      </MainGridColumn>
      <RightGridColumn />
    </BaseGrid>
  );
}
