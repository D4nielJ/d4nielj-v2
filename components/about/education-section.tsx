"use client";

import { ResolvedEducation } from "@/lib/getCVByRole";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface EducationSectionProps {
  education: ResolvedEducation[];
  title: string;
}

function formatDateRange(startDate: string, endDate: string): string {
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

  return `${formatDate(startDate)} — ${formatDate(endDate)}`;
}

export function EducationSection({ education, title }: EducationSectionProps) {
  if (education.length === 0) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      <div className="space-y-4">
        {education.map((edu) => (
          <Card key={edu.id} size="sm">
            <CardHeader>
              <CardTitle>{edu.degree}</CardTitle>
              <CardDescription>
                {edu.institution} ·{" "}
                {formatDateRange(edu.startDate, edu.endDate)}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
