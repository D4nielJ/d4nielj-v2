import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "@/app/theme-provider";
import { RoleProvider } from "@/context/role-context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { NotFoundView } from "@/components/not-found-view";
import enMessages from "@/i18n/messages/en.json";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={jetbrainsMono.variable} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <NextIntlClientProvider locale="en" messages={enMessages}>
            <RoleProvider>
              <div className="bg-background min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-1">
                  <NotFoundView />
                </div>
                <Footer />
              </div>
            </RoleProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
