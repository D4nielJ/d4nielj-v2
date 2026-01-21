import { CVView } from "@/components/cv-view";
import { CVToolbar } from "@/components/about/cv-toolbar";
import BaseGrid, {
  LeftGridColumn,
  MainGridColumn,
  RightGridColumn,
} from "@/components/ui/base-grid";
import { getLocale } from "next-intl/server";
import { Locale } from "@/storage/schema/cv";

export default async function CVPage() {
  const locale = await getLocale();
  const validLocale = locale as Locale;

  return (
    <BaseGrid>
      <LeftGridColumn>
        <CVToolbar />
      </LeftGridColumn>
      <MainGridColumn>
        <CVView locale={validLocale} />
      </MainGridColumn>
      <RightGridColumn />
    </BaseGrid>
  );
}
