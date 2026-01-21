import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { cvData } from "@/storage/data/cv";
import { getCVByRole } from "@/lib/getCVByRole";
import BaseGrid, {
  LeftGridColumn,
  MainGridColumn,
  RightGridColumn,
} from "@/components/ui/base-grid";
import { GitHubStatsDisplay } from "@/components/home";
import { Separator } from "@/components/ui/separator";
import { Locale } from "@/storage/schema/cv";

export default async function HomePage() {
  const locale = await getLocale();
  const validLocale = locale as Locale;
  const t = await getTranslations("nav");

  // Resolve profile for general intro
  const profile = getCVByRole(cvData, validLocale, "fullstack").profile;

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
                {t("projects")} →
              </Link>
              <Link
                href="/blog"
                className="text-primary text-sm underline-offset-4 hover:underline"
              >
                {t("blog")} →
              </Link>
              <Link
                href="/about"
                className="text-primary text-sm underline-offset-4 hover:underline"
              >
                {t("cv")} →
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
