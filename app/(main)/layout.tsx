import { ContactButton } from "@/components/contact-button";
import { MenuButton } from "@/components/menu-button";
import { NameButton } from "@/components/name-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { ModalProvider } from "@/components/providers/modal-provider";
import { ParticlesProvider } from "@/components/providers/particles-provider";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <ParticlesProvider />
    <main className="fixed h-full w-full bg-background/25">
      <div className="fixed h-[calc(100vh-20px)] w-[calc(100vw-20px)] border custom-border-color rounded-sm m-[10px]">
          <div className="fixed top-[10px] left-[10px] w-[48px] aspect-square flex justify-center items-center border-b border-r custom-border-color">
              <NameButton />
          </div>
          <div className="fixed top-[10px] right-[10px] w-[48px] aspect-square flex justify-center items-center border-b border-l custom-border-color">
              <MenuButton />
          </div>
          <div className="fixed bottom-[10px] left-[10px] w-[48px] aspect-square flex justify-center items-center border-t border-r custom-border-color">
              <ThemeToggle />
          </div>
          <div className="fixed bottom-[10px] right-[10px] w-[48px] aspect-square flex justify-center items-center border-t border-l custom-border-color">
              <ContactButton />
          </div>
          <div className="fixed top-[57px] left-[57px] right-[57px] bottom-[57px] border custom-border-color">
              <ModalProvider />
              {children}
          </div>
      </div>
    </main>
    </>
  );
}
