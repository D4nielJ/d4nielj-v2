import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/theme-provider";
import { LocaleProvider } from "@/i18n/locale-provider";
import { RoleProvider } from "@/context/role-context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

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
  title: "Daniel J. | Software Engineer",
  description:
    "Personal site and interactive CV for Daniel J., a software engineer specializing in full-stack development, frontend, backend, and test automation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jetbrainsMono.variable} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <LocaleProvider>
            <RoleProvider>
              <div className="min-h-screen bg-background flex flex-col">
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </RoleProvider>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
