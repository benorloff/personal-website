import { Frame } from "@/components/frame";

export default function MainLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <Frame>
          {children}
      </Frame>
    );
  }
  