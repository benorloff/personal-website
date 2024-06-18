"use client"

import { Settings2 } from "lucide-react";
import { useKBar } from "kbar";
import { Button } from "@/components/ui/button";

export const SettingsButton = () => {
    const { query } = useKBar();

    return (
        <div
            className="flex w-full h-full group overflow-hidden"
        >
            <Button
                variant="ghost"
                className="h-full w-full rounded-none rounded-bl-sm p-1"
                onClick={() => {
                    query.setCurrentRootAction("theme")
                    query.toggle()
                }}
            >
                <Settings2 className="w-6 h-6 group-hover:scale-125 transition-transform duration-300 ease-in-out"/>
            </Button>
        </div>
    )
}