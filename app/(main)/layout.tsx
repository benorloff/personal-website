import { Frame } from "@/components/frame";
import { Suspense } from "react";

export default function MainLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <Frame>
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </Frame>
    );
  }
  