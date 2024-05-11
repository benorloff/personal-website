import { ModalProvider } from "@/components/providers/modal-provider";
import { Frame } from "@/components/frame";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Frame>
      <ModalProvider />
      {children}
    </Frame>
  )
}
