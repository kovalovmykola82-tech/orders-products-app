"use client";

import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  dictionary,
  Dictionary,
  Locale,
  localeIntlMap,
  LOCALE_STORAGE_KEY,
} from "@/i18n/dictionary";

type I18nContextValue = {
  locale: Locale;
  intlLocale: string;
  t: Dictionary;
  setLocale: (locale: Locale) => void;
};

const I18nContext = createContext<I18nContextValue | null>(null);

const isLocale = (value: string | null): value is Locale => {
  return value === "ru" || value === "uk";
};

const getInitialLocale = (): Locale => {
  if (typeof window === "undefined") {
    return "ru";
  }

  const savedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);

  return isLocale(savedLocale) ? savedLocale : "ru";
};

export const I18nProvider = ({ children }: PropsWithChildren) => {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  }, [locale]);

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale);
  }, []);

  const value = useMemo<I18nContextValue>(() => {
    return {
      locale,
      intlLocale: localeIntlMap[locale],
      t: dictionary[locale],
      setLocale,
    };
  }, [locale, setLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useTranslation = () => {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useTranslation must be used inside I18nProvider");
  }

  return context;
};
