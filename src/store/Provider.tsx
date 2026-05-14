"use client";

import { PropsWithChildren, useEffect } from "react";
import { Provider } from "react-redux";

import { store } from "@/store";
import { useAppDispatch } from "@/store/hooks";
import { initializeAuth } from "@/store/slices/authSlice";

const AuthInitializer = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const userRaw = localStorage.getItem("user");

    if (!token || !userRaw) {
      dispatch(initializeAuth(null));
      return;
    }

    try {
      const user = JSON.parse(userRaw);

      dispatch(
        initializeAuth({
          token,
          user,
        }),
      );
    } catch {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      dispatch(initializeAuth(null));
    }
  }, [dispatch]);

  return <>{children}</>;
};

export const StoreProvider = ({ children }: PropsWithChildren) => {
  return (
    <Provider store={store}>
      <AuthInitializer>{children}</AuthInitializer>
    </Provider>
  );
};
