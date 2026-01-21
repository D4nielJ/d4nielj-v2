"use client";

import { GitHubRepo } from "@/storage/schema/github";
import { GitHubProjectCard } from "./github-project-card";

interface GitHubProjectCardWrapperProps {
  repo: GitHubRepo;
}

export function GitHubProjectCardWrapper({
  repo,
}: GitHubProjectCardWrapperProps) {
  return <GitHubProjectCard repo={repo} />;
}
