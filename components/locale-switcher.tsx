"use client";

import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";

type Locale = "en" | "es";

const SUPPORTED_LOCALES: Locale[] = ["en", "es"];

const localeLabels: Record<Locale, string> = {
  en: "EN",
  es: "ES",
};

function setLocaleCookie(locale: Locale) {
  document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax`;
  window.location.reload();
}

export function LocaleSwitcher() {
  const currentLocale = useLocale() as Locale;

  return (
    <div className="flex gap-1">
      {SUPPORTED_LOCALES.map((l) => (
        <Button
          className="cursor-pointer"
          key={l}
          variant={currentLocale === l ? "default" : "outline"}
          size="xs"
          onClick={() => setLocaleCookie(l)}
        >
          {localeLabels[l]}
        </Button>
      ))}
    </div>
  );
}
