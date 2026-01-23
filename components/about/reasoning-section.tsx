"use client";

import { ResolvedReasoningCase } from "@/lib/getCVByRole";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ReasoningSectionProps {
  reasoning: ResolvedReasoningCase[];
}

export function ReasoningSection({ reasoning }: ReasoningSectionProps) {
  if (reasoning.length === 0) return null;

  return (
    <section className="space-y-4">
      {reasoning.map((item) => (
        <div key={item.id}>
          <h2 className="text-lg font-semibold tracking-tight mb-2">
            {item.title}
          </h2>
          <div className="space-y-4">
            <Card size="sm">
              <CardHeader>
                <CardTitle className="text-muted-foreground">
                  {item.scenario}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{item.approach}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      ))}
    </section>
  );
}
