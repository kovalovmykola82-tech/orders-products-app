"use client";

import { PropsWithChildren } from "react";

import { NavigationMenu } from "@/components/layout/NavigationMenu/NavigationMenu";
import { TopMenu } from "@/components/layout/TopMenu/TopMenu";

import "./AppLayout.scss";

export const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="app-layout">
      <NavigationMenu />

      <div className="app-layout__main">
        <TopMenu />

        <main className="app-layout__content">{children}</main>
      </div>
    </div>
  );
};
