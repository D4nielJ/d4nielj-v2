"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { Locale } from "@/storage/schema/cv";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (translations: Record<Locale, string>) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

const SUPPORTED_LOCALES: Locale[] = ["en", "es"];
const DEFAULT_LOCALE: Locale = "en";

interface LocaleProviderProps {
  children: ReactNode;
  defaultLocale?: Locale;
}

export function LocaleProvider({
  children,
  defaultLocale = DEFAULT_LOCALE,
}: LocaleProviderProps) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  const t = useCallback(
    (translations: Record<Locale, string>): string => {
      return translations[locale] ?? translations[DEFAULT_LOCALE] ?? "";
    },
    [locale],
  );

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}

export { SUPPORTED_LOCALES, DEFAULT_LOCALE };
export type { Locale };
