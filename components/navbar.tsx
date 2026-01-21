"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/i18n/locale-provider";
import { uiLabels } from "@/i18n/labels";
import { SettingsMenu } from "@/components/settings-menu";
import { cn } from "@/lib/utils";
import {
  BaseGrid,
  LeftGridColumn,
  MainGridColumn,
  RightGridColumn,
} from "./ui/base-grid";

export function Navbar() {
  const pathname = usePathname();
  const { locale } = useLocale();
  const labels = uiLabels[locale];

  const navLinks = [
    { href: "/", label: labels.home },
    { href: "/projects", label: labels.projects },
    { href: "/blog", label: labels.blog },
    { href: "/about", label: labels.cv },
  ];

  return (
    <header className="bg-background/95 sticky top-0 z-50 border-b backdrop-blur supports-backdrop-filter:bg-background/60">
      <BaseGrid>
        <LeftGridColumn />
        <MainGridColumn>
          <nav className="mx-auto w-full flex justify-between items-center py-2">
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
            <SettingsMenu />
          </nav>
        </MainGridColumn>
        <RightGridColumn />
      </BaseGrid>
    </header>
  );
}
