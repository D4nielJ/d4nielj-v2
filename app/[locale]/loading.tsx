import BaseGrid, {
  MainGridColumn,
  LeftGridColumn,
  RightGridColumn,
} from "@/components/ui/base-grid";

export default function Loading() {
  return (
    <BaseGrid>
      <LeftGridColumn />
      <MainGridColumn>
        <div className="animate-in fade-in pt-12 space-y-4 opacity-20 duration-300">
          <div className="bg-foreground rounded-xs w-1/4 h-4" />
          <div className="space-y-2">
            <div className="bg-muted-foreground rounded-xs w-full h-2" />
            <div className="bg-muted-foreground rounded-xs w-2/3 h-2" />
          </div>
        </div>
      </MainGridColumn>
      <RightGridColumn />
    </BaseGrid>
  );
}
