"use client"

import { AnimatePresence, motion, LayoutGroup } from "framer-motion"
import { Weather } from "@/lib/weather"
import { useEffect, useState } from "react"

export const WeatherBar = ({
    temperature,
    label,
    icon,
}: Weather) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const items = [
        {
            key: "location",
            value: "Tucson, Arizona",
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
        }
    ]

    return (
        <div 
            className="flex h-full w-full justify-start items-center"
        >
                <div 
                    className="flex h-full items-center justify-center border-r gap-4 p-4"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div>
                        <img src="/spinning-globe.gif" width={24} height={24} />
                    </div>
                    <AnimatePresence mode="wait">
                        {isHovered && (
                            items.map((item, i) => (
                                <motion.div
                                    key={item.key}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ delay: i * 0.2, ease: "easeInOut" }}
                                    className="flex items-center gap-2"
                                >
                                    {item.value}
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>
        </div>
    )
}