"use client";

import { useEffect, useState } from "react";

import "./TopMenu.scss";
import { useActiveSessions } from "@/hooks/useActiveSessions";

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("ru-RU", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
};

const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
};

export const TopMenu = () => {
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const activeSessions = useActiveSessions();

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
        <span className="top-menu__date">{formatDate(currentDate)}</span>
        <span className="top-menu__time">{formatTime(currentDate)}</span>
        <span className="top-menu__sessions">Active sessions: {activeSessions}</span>
      </div>
    </header>
  );
};
