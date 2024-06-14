import { Suspense } from "react";

import { getRecentGithubEvents } from "@/lib/github";
import { getWeather } from "@/lib/weather";

import { ModalProvider } from "@/components/providers/modal-provider";
import { SettingsButton } from "@/components/settings-button";
import { CommandButton } from "@/components/command-button";
import { FrameBorder } from "@/components/frame-border";
import { MenuButton } from "@/components/menu-button";
import { NameButton } from "@/components/name-button";

export const Frame = async ({
    children,
}: {
    children: React.ReactNode;
}) => {

    const gutter: number = 10;
    const size: number = 48;
    const offset: number = 58;
    const border: number = 1;

    /* Fetch weather data */
    const weather = await getWeather();
  
    /* Fetch recent Github events to pass to bottom frame border */
    const events = await getRecentGithubEvents({ per_page: 5, page: 1 });

    return (
        <Suspense fallback={null}>
            <main className="h-full w-full">
                <div 
                    className="fixed h-[calc(100vh-20px)] w-[calc(100vw-20px)] border custom-border-color rounded-sm m-[10px]"
                >
                    {/* Top Left Corner */}
                    <div 
                        className="fixed top-[10px] left-[10px] w-[48px] aspect-square flex justify-center items-center border-b border-r custom-border-color"
                    >
                        <NameButton />
                    </div>
                    {/* Top Side */}
                    <div 
                        className="fixed top-[10px] left-[58px] right-[58px] h-[48px]" 
                    >
                        <FrameBorder side="top"/>
                    </div>
                    {/* Top Right Corner */}
                    <div 
                        className="fixed top-[10px] right-[10px] w-[48px] aspect-square flex justify-center items-center border-b border-l custom-border-color"
                    >
                        <MenuButton {...weather} />
                    </div>
                    {/* Right Side */}
                    <div 
                        className="fixed right-[10px] top-[58px] bottom-[58px] w-[48px]" 
                    >
                        <FrameBorder side="right"/>
                    </div>
                    {/* Bottom Right Corner */}
                    <div 
                        className="fixed bottom-[10px] right-[10px] w-[48px] aspect-square flex justify-center items-center border-t border-l custom-border-color"
                    >
                        <CommandButton />
                    </div>
                    {/* Bottom Side */}
                    <div 
                        className="fixed bottom-[10px] left-[58px] right-[58px] h-[48px]"
                    >
                        <FrameBorder side="bottom" events={events} />
                    </div>
                    {/* Bottom Left Corner */}
                    <div 
                        className="fixed bottom-[10px] left-[10px] w-[48px] aspect-square flex justify-center items-center border-t border-r custom-border-color"
                    >
                        <SettingsButton />
                    </div>
                    {/* Left Side */}
                    <div 
                        className="fixed left-[10px] top-[58px] bottom-[58px] w-[48px]" 
                    >
                        <FrameBorder side="left" />
                    </div>
                    {/* Container */}
                    <div 
                        id="frameInner" 
                        className="fixed top-[57px] left-[57px] right-[57px] bottom-[57px] bg-background/75 border custom-border-color"
                    >
                        <ModalProvider />
                        <div className="h-full w-full">
                            {children}
                        </div>
                    </div>
                </div>
            </main>
        </Suspense>
    )
}