import { cookies } from "next/headers";
import { GitHubProjectsWithLoadMore } from "@/components/projects";
import { uiLabels } from "@/i18n/labels";
import { Locale } from "@/storage/schema/cv";
import BaseGrid, {
  LeftGridColumn,
  MainGridColumn,
  RightGridColumn,
} from "@/components/ui/base-grid";

export default async function ProjectsPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("locale")?.value as Locale) || "en";
  const labels = uiLabels[locale];

  return (
    <BaseGrid>
      <LeftGridColumn />
      <MainGridColumn>
        <main className="w-full py-8">
          <GitHubProjectsWithLoadMore title={labels.githubProjects} />
        </main>
      </MainGridColumn>
      <RightGridColumn />
    </BaseGrid>
  );
}
