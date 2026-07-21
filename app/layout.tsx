import type { Metadata, Viewport } from "next";
import React from 'react';
import { Providers } from "./providers";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "KH Studio - 受発注管理",
  description: "KH Studio 受発注管理 PWA",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "KH Order PWA",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <meta name="theme-color" content="#000000" />
        <style>{`html,body{margin:0;padding:0;width:100%;height:100%;background:#1e1e1e;color:#fff}`}</style>
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
