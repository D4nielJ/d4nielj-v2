"use client";

import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Download01Icon } from "@hugeicons/core-free-icons";
import { useLocale } from "@/i18n/locale-provider";
import { useRole } from "@/context/role-context";
import { uiLabels } from "@/i18n/labels";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function DownloadPdfButton({ className }: { className?: string }) {
  const { locale } = useLocale();
  const { role } = useRole();
  const labels = uiLabels[locale];
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/cv/pdf?locale=${locale}&role=${role}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `cv-${role}-${locale}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Failed to download PDF:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={isLoading}
      size="sm"
      className={cn("cursor-pointer", className)}
    >
      <HugeiconsIcon icon={Download01Icon} data-icon="inline-start" />
      {isLoading ? "..." : labels.downloadPdf}
    </Button>
  );
}
