"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export const useActiveSessions = () => {
  const [activeSessions, setActiveSessions] = useState(0);

  useEffect(() => {
    const socket = io({
      path: "/socket.io",
    });

    socket.on("active-sessions:update", (count: number) => {
      setActiveSessions(count);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return activeSessions;
};
