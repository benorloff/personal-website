"use client"

import { Command } from "lucide-react";
import { useKBar } from "kbar";
import { Button } from "@/components/ui/button";

export const CommandButton = () => {
    const { query } = useKBar();

    return (
        <div
            className="flex w-full h-full group overflow-hidden"
        >
            <Button
                variant="ghost"
                className="h-full w-full rounded-none rounded-br-sm p-1"
                onClick={() => query.toggle()}
            >
                <Command className="w-6 h-6"/>
            </Button>
        </div>
    )
}