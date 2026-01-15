"use client";

import { ResolvedReasoningCase } from "@/lib/getCVByRole";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ReasoningSectionProps {
  reasoning: ResolvedReasoningCase[];
  title: string;
}

export function ReasoningSection({ reasoning, title }: ReasoningSectionProps) {
  if (reasoning.length === 0) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      <div className="space-y-4">
        {reasoning.map((item) => (
          <Card key={item.id} size="sm">
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.scenario}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{item.approach}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
