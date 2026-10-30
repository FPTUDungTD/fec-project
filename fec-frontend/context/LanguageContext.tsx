"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { vi } from "@/locales/vi";
import { en } from "@/locales/en";

export type Locale = "vi" | "en";
export type Translations = typeof vi;

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: Translations;
}

const translationsMap: Record<Locale, Translations> = {
  vi,
  en,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("fec_locale") as Locale | null;
      if (saved === "vi" || saved === "en") {
        return saved;
      }
    }
    return "vi";
  });

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== "undefined") {
      localStorage.setItem("fec_locale", newLocale);
    }
  };

  const toggleLocale = () => {
    const next = locale === "vi" ? "en" : "vi";
    setLocale(next);
  };

  const t = translationsMap[locale];

  return (
    <LanguageContext.Provider value={{ locale, setLocale, toggleLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
