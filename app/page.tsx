"use client";

import Link from "next/link";
import { useLocale } from "@/i18n/locale-provider";
import { uiLabels } from "@/i18n/labels";
import { cvData } from "@/storage/data/cv";
import { getCVByRole } from "@/lib/getCVByRole";
import BaseGrid, {
  LeftGridColumn,
  MainGridColumn,
  RightGridColumn,
} from "@/components/ui/base-grid";
import { GitHubStatsDisplay } from "@/components/home";
import { Separator } from "@/components/ui/separator";

export default function HomePage() {
  const { locale } = useLocale();
  const labels = uiLabels[locale];

  // Resolve profile for general intro
  const profile = getCVByRole(cvData, locale, "fullstack").profile;

  return (
    <BaseGrid>
      <LeftGridColumn />
      <MainGridColumn>
        <main className="w-full py-8 space-y-8">
          {/* Hero / Introduction */}
          <section className="space-y-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                {profile.name}
              </h1>
              <p className="text-muted-foreground text-lg">{profile.title}</p>
            </div>
            <p className="leading-relaxed">{profile.summary}</p>
            <div className="flex gap-4 pt-2">
              <Link
                href="/projects"
                className="text-primary text-sm underline-offset-4 hover:underline"
              >
                {labels.projects} →
              </Link>
              <Link
                href="/blog"
                className="text-primary text-sm underline-offset-4 hover:underline"
              >
                {labels.blog} →
              </Link>
              <Link
                href="/about"
                className="text-primary text-sm underline-offset-4 hover:underline"
              >
                {labels.cv} →
              </Link>
            </div>
          </section>

          <Separator />

          {/* GitHub Stats */}
          <section>
            <GitHubStatsDisplay />
          </section>
        </main>
      </MainGridColumn>
      <RightGridColumn />
    </BaseGrid>
  );
}
