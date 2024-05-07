import { ModalProvider } from "@/components/providers/modal-provider";

import { ContactButton } from "@/components/contact-button";
import { Frame } from "@/components/frame";
import { MenuButton } from "@/components/menu-button";
import { NameButton } from "@/components/name-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Cursor } from "@/components/cursor";


export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <main className="fixed h-[calc(100vh-20px)] w-[calc(100vw-20px)] border m-[10px]">
      <Cursor />
      <div className="fixed top-[10px] left-[10px] w-[48px] aspect-square flex justify-center items-center border-b border-r">
        <NameButton />
      </div>
      <div className="fixed top-[10px] right-[10px] w-[48px] aspect-square flex justify-center items-center border-b border-l">
        <MenuButton />
      </div>
      <div className="fixed bottom-[10px] left-[10px] w-[48px] aspect-square flex justify-center items-center border-t border-r">
        <ThemeToggle />
      </div>
      <div className="fixed bottom-[10px] right-[10px] w-[48px] aspect-square flex justify-center items-center border-t border-l">
        <ContactButton />
      </div>
      <div className="fixed top-[58px] left-[58px] right-[58px] bottom-[58px]">
        <ModalProvider />
        {children}
      </div>
    </main>
  );
}
