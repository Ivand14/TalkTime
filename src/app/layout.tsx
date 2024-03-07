import "./globals.css";

import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { NextProviders } from "@/lib/NextProvider";
import Providers from "@/lib/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TalkTime"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <NextProviders>
            {children}
          </NextProviders>
        </Providers>
      </body>
    </html>
  );
}
