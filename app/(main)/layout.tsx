
import { Suspense } from "react";
import { Frame } from "@/components/frame";

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
  