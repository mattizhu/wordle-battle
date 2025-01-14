import React from "react";
import type {Metadata} from "next";
import {DM_Sans} from "next/font/google";
import "./globals.css";

import {GameProvider} from "@/contexts/gameContext";
import {Toaster} from "@/components/ui/Sonner";

const dmSans = DM_Sans({
  weight: ["300", "600", "900"],
  variable: "--font-dm-sans",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Wordle.dev",
  description: "A Next.js Wordle Project",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} font-sans dark antialiased bg-neutral-950`}>
        <GameProvider>{children}</GameProvider>
        <Toaster position="top-center" expand={true} richColors={false} duration={2000} className="![--width:250px] ![--offset:64px]" toastOptions={{unstyled: true, classNames: {toast: "flex items-center justify-center w-full px-5 py-3 text-sm rounded-lg shadow-lg bg-foreground text-background"}}}  />
      </body>
    </html>
  );
};
