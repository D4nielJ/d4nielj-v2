import { Suspense } from "react";
import { notFound } from "next/navigation";
import { setRequestLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "@/app/theme-provider";
import { RoleProvider } from "@/context/role-context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { routing } from "@/i18n/routing";
import Loading from "./loading";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

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
