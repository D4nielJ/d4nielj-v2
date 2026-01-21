import { CVView } from "@/components/cv-view";
import { CVToolbar } from "@/components/cv/cv-toolbar";
import BaseGrid, {
  LeftGridColumn,
  MainGridColumn,
  RightGridColumn,
} from "@/components/ui/base-grid";

export default function CVPage() {
  return (
    <BaseGrid>
      <LeftGridColumn>
        <CVToolbar />
      </LeftGridColumn>
      <MainGridColumn>
        <CVView />
      </MainGridColumn>
      <RightGridColumn />
    </BaseGrid>
  );
}
