import { ModalProvider } from "@/components/providers/modal-provider";

import { ContactButton } from "@/components/contact-button";
import { MenuButton } from "@/components/menu-button";
import { NameButton } from "@/components/name-button";
import { ThemeToggle } from "@/components/theme-toggle";

import { GithubActivityBar } from "@/components/github-activity-bar";
import { WeatherBar } from "@/components/weather";
import { getRecentGithubEvents } from "@/lib/github";
import { getWeather } from "@/lib/weather";
import { ColorPicker } from "./color-picker";
import { Nav } from "./nav";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

export const Frame = async ({
    children,
}: {
    children: React.ReactNode;
}) => {

    const gutter: number = 10;
    const size: number = 48;
    const offset: number = 58;
    const border: number = 1;

    const { temperature, weatherCode } = await getWeather();
  
    const events = await getRecentGithubEvents({ per_page: 5, page: 1 });

    return (
        <main className="h-full w-full">
            <div className="fixed h-[calc(100vh-20px)] w-[calc(100vw-20px)] border custom-border-color rounded-sm m-[10px]">
                <div className="fixed top-[10px] left-[10px] w-[48px] aspect-square flex justify-center items-center border-b border-r custom-border-color">
                    <NameButton />
                </div>
                <div className="fixed top-[10px] left-[58px] right-[58px] h-[48px]" />
                <div className="fixed top-[10px] right-[10px] w-[48px] aspect-square flex justify-center items-center border-b border-l custom-border-color">
                    <MenuButton />
                </div>
                <div className="fixed right-[10px] top-[58px] bottom-[58px] w-[48px]" />
                <div className="fixed bottom-[10px] right-[10px] w-[48px] aspect-square flex justify-center items-center border-t border-l custom-border-color">
                    <ContactButton />
                </div>
                <div className="fixed bottom-[10px] left-[58px] right-[58px] h-[48px]">
                    <div className="flex flex-row w-full h-full overflow-hidden">
                        <WeatherBar temperature={temperature} weatherCode={weatherCode} />
                        <GithubActivityBar events={events} />
                    </div>
                </div>
                <div className="fixed bottom-[10px] left-[10px] w-[48px] aspect-square flex justify-center items-center border-t border-r custom-border-color">
                    <ThemeToggle />
                </div>
                <div className="fixed left-[10px] top-[58px] bottom-[58px] w-[48px]">
                    <div className="flex flex-col h-full w-full justify-between">
                        <Nav />
                        <ColorPicker />
                    </div>
                </div>
                <div id="frameInner" className="fixed top-[57px] left-[57px] right-[57px] bottom-[57px] border custom-border-color overflow-auto">
                    <ModalProvider />
                    {children}
                </div>
            </div>
        </main>
    )
}