import { Card, CardContent, CardHeader } from "@/components/ui/card";

function SkeletonCard() {
  return (
    <Card size="sm" className="animate-pulse">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-4 w-32 bg-muted rounded" />
              <div className="h-4 w-16 bg-muted rounded" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-4 w-8 bg-muted rounded" />
            <div className="h-4 w-8 bg-muted rounded" />
          </div>
        </div>
        <div className="mt-2 space-y-1.5">
          <div className="h-3 w-full bg-muted rounded" />
          <div className="h-3 w-3/4 bg-muted rounded" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-1.5">
            <div className="h-5 w-12 bg-muted rounded" />
            <div className="h-5 w-14 bg-muted rounded" />
            <div className="h-5 w-10 bg-muted rounded" />
          </div>
          <div className="h-6 w-20 bg-muted rounded" />
        </div>
      </CardContent>
    </Card>
  );
}

export function GitHubProjectsSkeleton() {
  return (
    <section className="space-y-6">
      <div className="h-6 w-40 bg-muted rounded animate-pulse" />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </section>
  );
}
