"use client";

import { cvData } from "@/cv/data/cv";
import { getCVByRole } from "@/lib/getCVByRole";
import { useLocale } from "@/i18n/locale-provider";
import { useRole } from "@/context/role-context";
import { uiLabels } from "@/i18n/labels";
import {
  ProfileSection,
  ExperienceSection,
  ProjectsSection,
  SkillsSection,
  EducationSection,
  ReasoningSection,
} from "@/components/cv";
import { RoleSwitcher } from "@/components/role-switcher";
import { SettingsMenu } from "@/components/settings-menu";
import { DownloadPdfButton } from "@/components/download-pdf-button";
import { Separator } from "@/components/ui/separator";

export function CVView() {
  const { locale } = useLocale();
  const { role } = useRole();

  const cv = getCVByRole(cvData, locale, role);
  const labels = uiLabels[locale];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto px-4 py-3 max-w-3xl flex justify-between items-center">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {labels.viewAs}
              </span>
              <RoleSwitcher />
            </div>
            <Separator orientation="vertical" className="h-6 hidden sm:block" />
            <DownloadPdfButton />
          </div>
          <SettingsMenu />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8 max-w-3xl">
        <ProfileSection profile={cv.profile} />
        <Separator />
        <ExperienceSection
          experience={cv.experience}
          title={labels.experience}
        />
        <ProjectsSection projects={cv.projects} title={labels.projects} />
        <SkillsSection skills={cv.skills} title={labels.skills} />
        <EducationSection education={cv.education} title={labels.education} />
        <ReasoningSection reasoning={cv.reasoning} title={labels.reasoning} />
      </main>
    </div>
  );
}
