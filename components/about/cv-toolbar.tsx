"use client";

import { useLocale } from "@/i18n/locale-provider";
import { uiLabels } from "@/i18n/labels";
import { RoleSwitcher } from "@/components/role-switcher";
import { DownloadPdfButton } from "@/components/download-pdf-button";
import { Separator } from "@/components/ui/separator";

export function CVToolbar() {
  const { locale } = useLocale();
  const labels = uiLabels[locale];

  return (
    <div className="flex flex-wrap items-center gap-4 py-4 lg:flex-col lg:items-stretch lg:py-0">
      <div className="flex items-center lg:flex-col lg:items-stretch gap-2 lg:gap-1.5">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold lg:px-3 whitespace-nowrap">
          {labels.viewAs}
        </span>
        <RoleSwitcher />
      </div>
      <Separator
        orientation="vertical"
        className="h-6 hidden lg:hidden sm:block"
      />
      <Separator className="hidden my-2 lg:block" />
      <DownloadPdfButton className="lg:w-full" />
    </div>
  );
}
