import { Suspense } from "react";
import { notFound } from "next/navigation";
import { setRequestLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "@/app/theme-provider";
import { RoleProvider } from "@/context/role-context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { routing } from "@/i18n/routing";
import { cvData } from "@/storage/data/cv";
import Loading from "./loading";
import type { Metadata } from "next";
import siteOptions from "@/lib/siteOptions";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const BASE_URL = siteOptions.BASE_URL;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: "en" | "es" };
  const profile = cvData.profile;

  const title =
    locale === "es"
      ? `${profile.name} | Ingeniero de Software`
      : `${profile.name} | Software Engineer`;

  const description =
    typeof profile.shortSummary === "string"
      ? profile.shortSummary
      : profile.shortSummary[locale];

  return {
    title: {
      template: `%s | ${profile.name}`,
      default: title,
    },
    description,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        en: `${BASE_URL}/en`,
        es: `${BASE_URL}/es`,
      },
    },
    openGraph: {
      title,
      description,
      url: BASE_URL,
      siteName: `${profile.name} Portfolio`,
      locale: locale === "es" ? "es_ES" : "en_US",
      alternateLocale: locale === "es" ? "en_US" : "es_ES",
      type: "website",
      images: [`${BASE_URL}/card.png`],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${BASE_URL}/card.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as "en" | "es")) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <ThemeProvider>
      <NextIntlClientProvider messages={messages}>
        <RoleProvider>
          <div className="bg-background min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-1">
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </div>
            <Footer />
          </div>
        </RoleProvider>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
