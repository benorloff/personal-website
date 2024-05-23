"use client"

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { availableThemeColors, themeModeAndColor, Theme, ThemeMode, ThemeColor, ThemeColorProps } from "@/lib/themes";
import { AnimatePresence, motion } from "framer-motion";

export const ColorPicker = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { setTheme, theme } = useTheme();
    const [mode, setMode] = useState<ThemeMode>('dark');
    const [color, setColor] = useState<ThemeColor>('red');
    const [availableColors, setAvailableColors] = useState<ThemeColorProps[]>([]);

    useEffect(() => {
        const { mode, color } = themeModeAndColor(theme as Theme);
        const availableColors = availableThemeColors(theme as Theme);
        setMode(mode);
        setAvailableColors(availableColors);
    }, [theme])

    const container = {
        open: { 
            height: '200px',
            transition: { 
                duration: 0.5, 
                type: 'spring' 
            },
        },
        closed: { 
            height: '48px',
            transition: { 
                duration: 0.5, 
                type: 'spring', 
                delay: 0.2 
            },
        },
    };

    const items = (i: number) => ({
        open: { 
            opacity: 1, 
            scale: 1, 
            bottom: (i+1) * 48,
            transition: { 
                duration: 0.5, 
                type: 'spring', 
                delay: i * 0.1 
            },
        },
        closed: { 
            opacity: 0, 
            scale: 0, 
            bottom: 0,
            transition: { 
                duration: 0.5, 
                type: 'spring', 
                delay: i * 0.1 
            },
        },
    })

    return (
        <AnimatePresence mode="sync">
            <motion.div
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                className="flex min-h-[48px] shrink border-t custom-border-color overflow-hidden"
                variants={container}
                animate={isOpen ? 'open' : 'closed'}
            >
                {availableColors.map((c, i) => {
                    const backgroundColor = c.colors.default;
                    return (
                        <motion.div 
                            key={c.name}
                            className="absolute flex w-full aspect-square justify-center items-center cursor-pointer"
                            onClick={() => setTheme(`${mode}-${c.name}`)}
                            whileHover={{ scale: 1.5 }}
                            variants={items(i)}
                            animate={isOpen ? 'open' : 'closed'}
                        >
                            <motion.div 
                                className="w-4 h-4 rounded-full" 
                                style={{ backgroundColor }}
                            />
                        </motion.div>
                    );
                })}
                <div className="flex w-full self-end aspect-square justify-center items-center" >
                    <div className="w-4 h-4 rounded-full bg-accent ring ring-foreground" />
                </div>
            </motion.div>
        </AnimatePresence>
    )
}