"use client";

import { ResolvedProject } from "@/lib/getCVByRole";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link01Icon, Github01Icon } from "@hugeicons/core-free-icons";

interface ProjectsSectionProps {
  projects: ResolvedProject[];
  title: string;
}

export function ProjectsSection({ projects, title }: ProjectsSectionProps) {
  if (projects.length === 0) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <Card key={project.id} size="sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {project.name}
                <div className="flex gap-1.5 ml-auto">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <HugeiconsIcon icon={Github01Icon} className="size-4" />
                    </a>
                  )}
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <HugeiconsIcon icon={Link01Icon} className="size-4" />
                    </a>
                  )}
                </div>
              </CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1.5">
                {project.keywords.map((keyword) => (
                  <Badge key={keyword} variant="outline">
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
