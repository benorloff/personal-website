"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Weather } from "@/lib/weather"
import { useState } from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { CloudHail, CloudLightning, CloudRain, CloudSnow, CloudSun, Cloudy, Sun } from "lucide-react"

interface WeatherResult {
  label: string;
  icon: React.ReactNode;
}

export const weatherCodes = (
    weatherCode: Weather["weatherCode"]
  ): WeatherResult => {
  
    let label: WeatherResult['label'] = '';
    let icon: WeatherResult['icon'] = undefined;
  
    switch (true) {
      case weatherCode === 1000:
        label = 'Clear';
        icon = <Sun />;
        break;
      case weatherCode > 1000 && weatherCode < 2000:
        label = 'Cloudy';
        icon = <CloudSun />;
        break;
      case weatherCode >= 4000 && weatherCode < 5000:
        label = 'Rain';
        icon = <CloudRain />;
        break;
      case weatherCode >= 5000 && weatherCode < 6000:
        label = 'Snow';
        icon = <CloudSnow />;
        break;
      case weatherCode >= 6000 && weatherCode < 8000:
        label = 'Hail';
        icon = <CloudHail />;
        break;
      case weatherCode === 8000:
        label = 'Thunderstorm';
        icon = <CloudLightning />;
        break;
      default:
        label = 'Clear';
        icon = <Sun />;
        break;
    }
  
    return { label, icon }; 
  };

export const WeatherBar = ({
    temperature,
    weatherCode,
}: Weather) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const { theme } = useTheme();

    const { label, icon } = weatherCodes(weatherCode);

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
        <AnimatePresence mode="sync">
            <motion.button 
                className="flex h-full min-w-max items-center justify-start border-r border-muted-foreground/50 gap-4 px-3 overflow-hidden"
                onClick={() => setIsExpanded(!isExpanded)}
                style={{ 
                    width: isExpanded ? "100%" : 48,
                }}
            >
                <img src={theme === "light" ? "/spinning-globe-dark.gif" : "/spinning-globe-light.gif"} width={24} height={24} />
                {isExpanded && (
                    items.map((item, i) => (
                        <motion.div
                            key={item.key}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: (i * 0.2), ease: "easeInOut" }}
                            className="flex items-center gap-2 text-sm"
                            suppressHydrationWarning
                        >
                            {item.value}
                        </motion.div>
                    ))
                )}
            </motion.button>
        </AnimatePresence>
    )
}