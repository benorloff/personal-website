import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Cursor } from "@/components/cursor";
import { ParticlesProvider } from "@/components/providers/particles-provider";
import { KbarProvider } from "@/components/providers/kbar-provider";

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
        <body id="body" className={cn("min-h-screen overflow-hidden", workSans.className)}>
          <ThemeProvider
            defaultTheme="dark-red"
            enableSystem={false}
            enableColorScheme
            themes={["dark-red", "light-red", "dark-green", "light-green", "dark-blue", "light-blue"]}
          >
            <KbarProvider>
              <Cursor />
              <ParticlesProvider />
              {children}
            </KbarProvider>
          </ThemeProvider>
        </body>
    </html>
  );
}
