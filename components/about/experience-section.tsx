"use client";

import { ResolvedExperience } from "@/lib/getCVByRole";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ExperienceSectionProps {
  experience: ResolvedExperience[];
  title: string;
}

function formatDateRange(startDate: string, endDate?: string): string {
  const formatDate = (date: string) => {
    const [year, month] = date.split("-");
    return new Date(Number(year), Number(month) - 1).toLocaleDateString(
      "en-US",
      {
        month: "short",
        year: "numeric",
      },
    );
  };

  return `${formatDate(startDate)} — ${
    endDate ? formatDate(endDate) : "Present"
  }`;
}

export function ExperienceSection({
  experience,
  title,
}: ExperienceSectionProps) {
  if (experience.length === 0) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      <div className="space-y-4">
        {experience.map((exp) => (
          <Card key={exp.id} size="sm">
            <CardHeader>
              <CardTitle>{exp.role}</CardTitle>
              <CardDescription>
                {exp.company} · {formatDateRange(exp.startDate, exp.endDate)}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{exp.description}</p>
              {exp.highlights.length > 0 && (
                <ul className="list-disc list-inside text-sm space-y-1">
                  {exp.highlights.map((highlight, i) => (
                    <li key={i}>{highlight}</li>
                  ))}
                </ul>
              )}
              <div className="flex flex-wrap gap-1.5">
                {exp.keywords.map((keyword) => (
                  <Badge key={keyword} variant="secondary">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
