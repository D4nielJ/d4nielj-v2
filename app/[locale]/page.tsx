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
import { StatsSkeleton } from "@/components/home/github-stats";
import { Suspense } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://d4nielj.me";

export default async function HomePage() {
  const locale = await getLocale();
  const validLocale = locale as Locale;
  const t = await getTranslations("nav");

  // Resolve profile for general intro
  const profile = getCVByRole(cvData, validLocale, "fullstack").profile;

  // Person JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: cvData.profile.name,
    jobTitle:
      typeof cvData.profile.title === "string"
        ? cvData.profile.title
        : cvData.profile.title[validLocale],
    description: profile.summary,
    url: BASE_URL,
    email: cvData.profile.email,
    telephone: cvData.profile.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality:
        typeof cvData.profile.location === "string"
          ? cvData.profile.location
          : cvData.profile.location[validLocale],
    },
    sameAs: cvData.profile.links.map((link) => link.url),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
                  href="/about"
                  className="text-primary text-sm underline-offset-4 hover:underline"
                >
                  {t("explore")} →
                </Link>
              </div>
            </section>

            <Separator />

            {/* GitHub Stats */}
            <section>
              <Suspense fallback={<StatsSkeleton />}>
                <GitHubStatsDisplay />
              </Suspense>
            </section>
          </main>
        </MainGridColumn>
        <RightGridColumn />
      </BaseGrid>
    </>
  );
}
