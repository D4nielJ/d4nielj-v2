import { HugeiconsIcon } from "@hugeicons/react";
import {
  StarIcon,
  GitForkIcon,
  UserMultiple02Icon,
  FolderLibraryIcon,
  Calendar03Icon,
  CodeIcon,
} from "@hugeicons/core-free-icons";
import { GitHubStats } from "@/storage/schema/github";
import { fetchGitHubStats } from "@/lib/github";
import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";

function StatItem({
  icon,
  value,
  label,
}: {
  icon: typeof StarIcon;
  value: string | number;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <HugeiconsIcon
        icon={icon}
        className="text-muted-foreground size-4 shrink-0"
      />
      <span className="font-semibold tabular-nums">{value}</span>
      <span className="text-muted-foreground text-xs">{label}</span>
    </div>
  );
}

export function StatsSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="flex flex-wrap gap-x-6 gap-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="bg-muted size-4 rounded" />
            <div className="bg-muted w-8 h-4 rounded" />
            <div className="bg-muted w-16 h-3 rounded" />
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-muted w-16 h-5 rounded" />
        ))}
      </div>
    </div>
  );
}

export async function GitHubStatsDisplay() {
  const t = await getTranslations("stats");
  const tGithub = await getTranslations("github");

  let stats: GitHubStats | null = null;
  try {
    stats = await fetchGitHubStats();
  } catch (err) {
    console.error("Failed to fetch GitHub stats:", err);
    return null;
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
        <StatItem
          icon={FolderLibraryIcon}
          value={stats.user.public_repos}
          label={t("publicRepos")}
        />
        <StatItem
          icon={StarIcon}
          value={stats.totalStars}
          label={tGithub("stars")}
        />
        <StatItem
          icon={GitForkIcon}
          value={stats.totalForks}
          label={tGithub("forks")}
        />
        <StatItem
          icon={Calendar03Icon}
          value={stats.accountAge + 1}
          label={t("yearsOnGitHub")}
        />
      </div>

      {stats.topLanguages.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <HugeiconsIcon icon={CodeIcon} className="size-3.5" />
            <span>{t("topLanguages")}:</span>
          </div>
          {stats.topLanguages.map((lang) => (
            <Badge key={lang.name} variant="secondary" className="text-xs">
              {lang.name}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
