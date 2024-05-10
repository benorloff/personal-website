"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Weather } from "@/lib/weather"
import { useState } from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export const WeatherBar = ({
    temperature,
    label,
    icon,
}: Weather) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const { theme } = useTheme();

    const items = [
        {
            key: "location",
            value: "Coding with ❤️ in Tucson, Arizona",
        },
        {
            key: "icon",
            value: icon,
        },
        {
            key: "label",
            value: label,
        },
        {
            key: "temperature",
            value: `${temperature}°F`,
        },
        {
            key: "time",
            value: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }
    ]

    return (
        <AnimatePresence mode="wait">
            <motion.button 
                className="flex h-full min-w-max items-center justify-start border-r border-muted-foreground/50 gap-4 px-3 overflow-hidden"
                onClick={() => setIsExpanded(!isExpanded)}
                style={{ 
                    width: isExpanded ? "100%" : 48,
                    transition: "width 0.5s ease-in-out, background-color 0.5s ease-in-out",
                }}
            >
                <img src={theme === "light" ? "/spinning-globe-dark.gif" : "/spinning-globe-light.gif"} width={24} height={24} />
                {isExpanded && (
                    items.map((item, i) => (
                        <motion.div
                            key={item.key}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5+(i * 0.2), ease: "easeInOut" }}
                            className="flex items-center gap-2 text-sm"
                        >
                            {item.value}
                        </motion.div>
                    ))
                )}
            </motion.button>
        </AnimatePresence>
    )
}