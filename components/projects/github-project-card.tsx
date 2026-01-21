"use client";

import { GitHubRepo } from "@/storage/schema/github";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HugeiconsIcon } from "@hugeicons/react";
import { StarIcon, GitForkIcon, Link01Icon } from "@hugeicons/core-free-icons";
import { CloneDropdown } from "./clone-dropdown";
import { useTranslations } from "next-intl";

interface GitHubProjectCardProps {
  repo: GitHubRepo;
}

export function GitHubProjectCard({ repo }: GitHubProjectCardProps) {
  const t = useTranslations("github");

  return (
    <Card size="default">
      <CardHeader>
        <div className="flex justify-between items-stretch gap-2">
          <div className="min-w-0 flex-1">
            <CardTitle className="flex flex-wrap items-center gap-2">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-2 hover:underline"
              >
                {repo.name}
              </a>
              {repo.language && (
                <Badge variant="secondary" className="text-[10px]">
                  {repo.language}
                </Badge>
              )}
            </CardTitle>
          </div>
          <div className="text-muted-foreground flex shrink-0 items-center gap-3 text-xs">
            <span className="flex items-center gap-1" title={t("stars")}>
              <HugeiconsIcon
                icon={StarIcon}
                className="size-3.5 relative -top-px"
              />
              {repo.stargazers_count}
            </span>
            <span className="flex items-center gap-1" title={t("forks")}>
              <HugeiconsIcon icon={GitForkIcon} className="size-4" />
              {repo.forks_count}
            </span>
          </div>
        </div>
        {repo.description && (
          <CardDescription className="mt-1 line-clamp-3">
            {repo.description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center gap-2 mt-2">
          <div className="flex flex-wrap gap-1.5">
            {repo.topics.slice(0, 4).map((topic) => (
              <Badge key={topic} variant="outline" className="text-[10px]">
                {topic}
              </Badge>
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {repo.homepage && (
              <a
                href={repo.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                title="Live demo"
              >
                <HugeiconsIcon icon={Link01Icon} className="size-4" />
              </a>
            )}
            <CloneDropdown
              cloneUrl={repo.clone_url}
              sshUrl={repo.ssh_url}
              fullName={repo.full_name}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
