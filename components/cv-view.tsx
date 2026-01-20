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
  CVToolbar,
} from "@/components/cv";
import { Separator } from "@/components/ui/separator";

export function CVView() {
  const { locale } = useLocale();
  const { role } = useRole();

  const cv = getCVByRole(cvData, locale, role);
  const labels = uiLabels[locale];

  return (
    <div className="animate-in fade-in container mx-auto px-4 py-8 duration-500 lg:max-w-7xl lg:flex lg:justify-center lg:gap-10">
      <aside className="h-fit lg:w-52 lg:sticky lg:top-24 lg:shrink-0">
        <CVToolbar />
      </aside>
      <main className="w-full max-w-3xl flex-1 space-y-8">
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
      <div className="hidden lg:w-52 lg:block lg:shrink-0" aria-hidden="true" />
    </div>
  );
}
