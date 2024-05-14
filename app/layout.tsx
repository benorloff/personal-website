import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { DM_Sans } from "next/font/google";
import { Work_Sans } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Cursor } from "@/components/cursor";
import { ParticlesProvider } from "@/components/providers/particles-provider";


const inter = Inter({ subsets: ["latin"] });
const dmSans = DM_Sans({ subsets: ["latin"] });
const workSans = Work_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ben Orloff",
  description: "Software engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body id="body" className={cn("min-h-screen", workSans.className)}>
        <ThemeProvider
          attribute='data-theme'
          defaultTheme="dark-red"
          enableSystem={false}
          themes={["dark-red", "light-red", "dark-green", "light-green", "dark-blue", "light-blue"]}
        >
          <Cursor />
          <ParticlesProvider />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
