"use client";

import { cvData } from "@/storage/data/cv";
import { getCVByRole } from "@/lib/getCVByRole";
import { useTranslations } from "next-intl";
import { useRole } from "@/context/role-context";
import {
  ProfileSection,
  ExperienceSection,
  ProjectsSection,
  SkillsSection,
  EducationSection,
  ReasoningSection,
} from "@/components/about";
import { Separator } from "@/components/ui/separator";
import { Locale } from "@/storage/schema/cv";

export function CVView({ locale }: { locale: Locale }) {
  const { role } = useRole();
  const t = useTranslations("cv");
  const cv = getCVByRole(cvData, locale, role);

  return (
    <div className="py-8 lg:flex lg:justify-center lg:gap-10">
      <main className="w-full space-y-8">
        <ProfileSection profile={cv.profile} />
        <Separator />
        <ExperienceSection experience={cv.experience} title={t("experience")} />
        <ProjectsSection projects={cv.projects} title={t("projects")} />
        <SkillsSection skills={cv.skills} title={t("skills")} />
        <EducationSection education={cv.education} title={t("education")} />
        <ReasoningSection reasoning={cv.reasoning} />
      </main>
    </div>
  );
}
