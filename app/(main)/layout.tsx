import { ModalProvider } from "@/components/providers/modal-provider";

import { ContactButton } from "@/components/contact-button";
import { Frame } from "@/components/frame";
import { MenuButton } from "@/components/menu-button";
import { NameButton } from "@/components/name-button";
import { ThemeToggle } from "@/components/theme-toggle";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
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
      <div className="fixed top-12 left-12 right-12 bottom-12 lg:top-16 lg:left-16 lg:right-16 lg:bottom-16">
        <ModalProvider />
        {children}
      </div>
    </main>
  );
}
