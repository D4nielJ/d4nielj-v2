"use client";

import { ResolvedSkillSet } from "@/lib/getCVByRole";
import { Badge } from "@/components/ui/badge";

interface SkillsSectionProps {
  skills: ResolvedSkillSet[];
  title: string;
}

export function SkillsSection({ skills, title }: SkillsSectionProps) {
  if (skills.length === 0) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      <div className="space-y-3">
        {skills.map((skillSet) => (
          <div key={skillSet.id} className="space-y-1.5">
            <h3 className="text-sm font-medium text-muted-foreground">
              {skillSet.category}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {skillSet.skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
