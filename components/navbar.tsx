"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/i18n/locale-provider";
import { uiLabels } from "@/i18n/labels";
import { SettingsMenu } from "@/components/settings-menu";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const { locale } = useLocale();
  const labels = uiLabels[locale];

  const navLinks = [
    { href: "/", label: labels.home },
    { href: "/blog", label: labels.blog },
    { href: "/cv", label: labels.cv },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 py-3 max-w-3xl flex justify-between items-center">
        <nav className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm transition-colors hover:text-foreground",
                  pathname === link.href
                    ? "text-foreground font-medium"
                    : "text-muted-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
        <SettingsMenu />
      </div>
    </header>
  );
}
