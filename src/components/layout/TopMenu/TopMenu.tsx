"use client";

import { useEffect, useState } from "react";

import { useActiveSessions } from "@/hooks/useActiveSessions";
import { Locale, localeLabels } from "@/i18n/dictionary";
import { useTranslation } from "@/i18n/I18nProvider";

import "./TopMenu.scss";

const formatDate = (date: Date, locale: string) => {
  return new Intl.DateTimeFormat(locale, {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
};

const formatTime = (date: Date, locale: string) => {
  return new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
};

export const TopMenu = () => {
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const activeSessions = useActiveSessions();
  const { locale, intlLocale, setLocale, t } = useTranslation();

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <header className="top-menu">
      <div className="top-menu__title">Orders & Products</div>

      <div className="top-menu__meta">
        <div className="top-menu__language-switcher">
          {(["ru", "uk"] as Locale[]).map((item) => (
            <button
              className={`top-menu__language-button ${
                locale === item ? "top-menu__language-button--active" : ""
              }`}
              key={item}
              type="button"
              onClick={() => setLocale(item)}
            >
              {localeLabels[item]}
            </button>
          ))}
        </div>

        <span className="top-menu__date">{formatDate(currentDate, intlLocale)}</span>
        <span className="top-menu__time">{formatTime(currentDate, intlLocale)}</span>
        <span className="top-menu__sessions">
          {t.topMenu.activeSessions}: {activeSessions}
        </span>
      </div>
    </header>
  );
};
