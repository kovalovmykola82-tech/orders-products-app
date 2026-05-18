import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.scss";

import { I18nProvider } from "@/i18n/I18nProvider";
import { StoreProvider } from "@/store/Provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Orders & Products",
  description: "SPA application for managing orders and products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <I18nProvider>
          <StoreProvider>{children}</StoreProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
