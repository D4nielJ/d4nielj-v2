"use client";

import { useEffect, useState } from "react";
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
import { useLocale } from "@/i18n/locale-provider";
import { uiLabels } from "@/i18n/labels";
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

function StatsSkeleton() {
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

export function GitHubStatsDisplay() {
  const { locale } = useLocale();
  const labels = uiLabels[locale];
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await fetchGitHubStats();
        setStats(data);
      } catch (err) {
        console.error("Failed to fetch GitHub stats:", err);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  if (loading) {
    return <StatsSkeleton />;
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
        <StatItem
          icon={FolderLibraryIcon}
          value={stats.user.public_repos}
          label={labels.publicRepos}
        />
        <StatItem
          icon={StarIcon}
          value={stats.totalStars}
          label={labels.stars}
        />
        <StatItem
          icon={GitForkIcon}
          value={stats.totalForks}
          label={labels.forks}
        />
        <StatItem
          icon={UserMultiple02Icon}
          value={stats.user.followers}
          label={labels.followers}
        />
        <StatItem
          icon={Calendar03Icon}
          value={stats.accountAge + 1}
          label={labels.yearsOnGitHub}
        />
      </div>

      {stats.topLanguages.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <HugeiconsIcon icon={CodeIcon} className="size-3.5" />
            <span>{labels.topLanguages}:</span>
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
