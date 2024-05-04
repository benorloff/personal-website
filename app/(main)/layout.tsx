import { ModalProvider } from '@/components/providers/modal-provider'

import { ThemeToggle } from "@/components/theme-toggle";
import { NameButton } from "@/components/name-button";
import { MenuButton } from "@/components/menu-button";
import { ContactButton } from "@/components/contact-button";

export default function MainLayout({ 
    children
 }: Readonly<{ 
    children: React.ReactNode 
}>) {
    return (
        <main className="h-screen">
            <div className="h-full w-full grid grid-cols-[max-content,auto,max-content] grid-rows-[max-content,auto,max-content]">
            {/* Top row */}
            <div className="border">
              <div className="w-[calc(100vw/20)] min-w-12 max-w-20 aspect-square flex justify-center items-center">
                <NameButton />
              </div>
            </div>
            <div className="border-y">
              <div className="h-full w-full" />
            </div>
            <div className="border">
              <div className="w-[calc(100vw/20)] min-w-12 max-w-20 aspect-square flex justify-center items-center">
                <MenuButton />
              </div>
            </div>
            {/* Middle row */}
            <div className="border-x">
              <div className="w-full" />
            </div>
            <div>
              <div className="relative w-full h-full">
                <ModalProvider />
                {children}
              </div>
            </div>
            <div className="border-x">
              <div className="w-full" />
            </div>
            {/* Bottom row */}
            <div className="border">
              <div className="w-[calc(100vw/20)] min-w-12 max-w-20 aspect-square flex justify-center items-center">
                <ThemeToggle />
              </div>
            </div>
            <div className="border-y">
              <div className="h-full w-full" />
            </div>
            <div className="border">
              <div className="w-[calc(100vw/20)] min-w-12 max-w-20 aspect-square flex justify-center items-center">
                <ContactButton />
              </div>
            </div>
            </div>
          </main>
    )
}