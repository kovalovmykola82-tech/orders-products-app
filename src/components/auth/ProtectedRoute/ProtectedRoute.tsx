"use client";

import { PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAppSelector } from "@/store/hooks";

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const { isAuthenticated, isInitialized } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isInitialized, router]);

  if (!isInitialized) {
    return <main>Loading...</main>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};
