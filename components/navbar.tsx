"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("nav");

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/projects", label: t("projects") },
    { href: "/blog", label: t("blog") },
    { href: "/about", label: t("cv") },
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
