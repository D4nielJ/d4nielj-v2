"use client";

import { useLocale, SUPPORTED_LOCALES, Locale } from "@/i18n/locale-provider";
import { Button } from "@/components/ui/button";

const localeLabels: Record<Locale, string> = {
  en: "EN",
  es: "ES",
};

export function LocaleSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="flex gap-1">
      {SUPPORTED_LOCALES.map((l) => (
        <Button
          className="cursor-pointer"
          key={l}
          variant={locale === l ? "default" : "outline"}
          size="xs"
          onClick={() => setLocale(l)}
        >
          {localeLabels[l]}
        </Button>
      ))}
    </div>
  );
}
