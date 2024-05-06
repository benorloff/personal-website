import { ModalProvider } from "@/components/providers/modal-provider";

import { ThemeToggle } from "@/components/theme-toggle";
import { NameButton } from "@/components/name-button";
import { MenuButton } from "@/components/menu-button";
import { ContactButton } from "@/components/contact-button";
import { Frame } from "@/components/frame";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      {/* <div className="h-screen w-full">{children}</div> */}
      <div className="fixed top-0 left-0 w-12 lg:w-16 aspect-square flex justify-center items-center border-b border-r">
        <NameButton />
      </div>
      <div className="fixed top-0 right-0 w-12 lg:w-16 aspect-square flex justify-center items-center border-b border-l">
        <MenuButton />
      </div>
      <div className="fixed bottom-0 left-0 w-12 lg:w-16 aspect-square flex justify-center items-center border-t border-r">
        <ThemeToggle />
      </div>
      <div className="fixed bottom-0 right-0 w-12 lg:w-16 aspect-square flex justify-center items-center border-t border-l">
        <ContactButton />
      </div>
      <Frame position="center">
        <ModalProvider />
        {children}
      </Frame>
    </main>
  );
}
