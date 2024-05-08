import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Script from "next/script";
import { Cursor } from "@/components/cursor";
import { ParticlesProvider } from "@/components/providers/particles-provider";


const inter = Inter({ subsets: ["latin"] });

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
      <body id="body" className={cn("min-h-screen", inter.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <Cursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
